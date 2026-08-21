package com.school.lms.service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.school.lms.dto.AuthRequest;
import com.school.lms.dto.AuthResponse;
import com.school.lms.dto.GoogleAuthRequest;
import com.school.lms.dto.SignupRequest;
import com.school.lms.entity.Grade;
import com.school.lms.entity.Role;
import com.school.lms.entity.User;
import com.school.lms.repository.GradeRepository;
import com.school.lms.repository.UserRepository;
import com.school.lms.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final GradeRepository gradeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Transactional
    public AuthResponse signup(SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already registered!");
        }

        Role userRole = signupRequest.getRole() != null ? signupRequest.getRole() : Role.ROLE_STUDENT;

        Grade userGrade = null;
        if (userRole == Role.ROLE_STUDENT && signupRequest.getGradeNumber() != null) {
            userGrade = gradeRepository.findByGradeNumber(signupRequest.getGradeNumber())
                    .orElseThrow(() -> new RuntimeException("Grade not found: " + signupRequest.getGradeNumber()));
        }

        User user = User.builder()
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .fullName(signupRequest.getFullName())
                .role(userRole)
                .grade(userGrade)
                .build();

        userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signupRequest.getEmail(), signupRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return AuthResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .gradeNumber(user.getGrade() != null ? user.getGrade().getGradeNumber() : null)
                .build();
    }

    public AuthResponse login(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found: " + authRequest.getEmail()));

        return AuthResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .gradeNumber(user.getGrade() != null ? user.getGrade().getGradeNumber() : null)
                .build();
    }

    /**
     * Google OAuth login flow:
     * 1. Verify the Firebase ID token from the frontend.
     * 2. Look up the user by googleUid (stable) or email (first-time Google login).
     * 3. Existing user: validate selected role matches DB role, return JWT.
     * 4. New user: only STUDENT and PARENT roles can self-register;
     *    Mentor (ROLE_TEACHER) requires an existing pre-created account.
     */
    @Transactional
    public AuthResponse googleLogin(GoogleAuthRequest request) {
        // ── Step 1: Verify Firebase ID token ──────────────────────────────────
        if (FirebaseApp.getApps().isEmpty()) {
            try {
                com.google.auth.oauth2.AccessToken mockToken = new com.google.auth.oauth2.AccessToken("public_verification_token", new java.util.Date(System.currentTimeMillis() + 864000000L));
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(com.google.auth.oauth2.GoogleCredentials.create(mockToken))
                        .setProjectId("education-website-17c4b-a2dcb")
                        .build();
                FirebaseApp.initializeApp(options);
            } catch (Exception e) {
                System.err.println("[Firebase] Safeguard initialization failed: " + e.getMessage());
            }
        }

        FirebaseToken firebaseToken;
        try {
            firebaseToken = FirebaseAuth.getInstance().verifyIdToken(request.getIdToken());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Invalid or expired Google token. Please sign in again.");
        }

        String googleUid = firebaseToken.getUid();
        String email     = firebaseToken.getEmail();
        String name      = firebaseToken.getName() != null ? firebaseToken.getName() : email;

        // ── Step 2: Map selectedRole string → Role enum ───────────────────────
        Role expectedRole = mapSelectedRole(request.getSelectedRole());

        // ── Step 3: Look up existing user (by googleUid first, then by email) ─
        User user = userRepository.findByGoogleUid(googleUid)
                .or(() -> userRepository.findByEmail(email))
                .orElse(null);

        // Safe server-side diagnostic logging (no tokens or credentials exposed)
        System.out.println("Google Auth Debug: " +
                "requestedRole=" + request.getSelectedRole() +
                ", expectedRole=" + expectedRole +
                ", existingUserFound=" + (user != null) +
                ", existingUserRole=" + (user != null ? user.getRole() : "null") +
                ", emailPresent=" + (email != null && !email.isBlank()) +
                ", googleUidPresent=" + (googleUid != null && !googleUid.isBlank()) +
                ", newUser=" + (user == null));

        if (user != null) {
            // ── Step 4a: Existing user — validate role match ───────────────────
            if (user.getGoogleUid() == null) {
                // First time this user is logging in via Google — link the Google UID
                user.setGoogleUid(googleUid);
                userRepository.save(user);
            }

            if (!user.getRole().equals(expectedRole)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Role mismatch: Your account is registered as " +
                        friendlyRole(user.getRole()) +
                        " but you selected " + friendlyRole(expectedRole) +
                        ". Please go back and select the correct role.");
            }

            if ("Pending".equalsIgnoreCase(user.getStatus())) {
                // Account exists but not yet approved
                String jwt = jwtUtils.generateJwtTokenForUser(user.getEmail());
                return AuthResponse.builder()
                        .token(jwt)
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .role(user.getRole())
                        .status("Pending")
                        .gradeNumber(user.getGrade() != null ? user.getGrade().getGradeNumber() : null)
                        .build();
            }

            // Approved user — generate JWT and return
            String jwt = jwtUtils.generateJwtTokenForUser(user.getEmail());
            return AuthResponse.builder()
                    .token(jwt)
                    .id(user.getId())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .role(user.getRole())
                    .status(user.getStatus() != null ? user.getStatus() : "Approved")
                    .gradeNumber(user.getGrade() != null ? user.getGrade().getGradeNumber() : null)
                    .build();

        } else {
            // ── Step 4b: New user ──────────────────────────────────────────────
            // Create a new Pending account for the selected role (Student, Parent, or Mentor)
            User newUser = User.builder()
                    .email(email)
                    .googleUid(googleUid)
                    .fullName(name)
                    .role(expectedRole)
                    .password("") // Empty string satisfies MySQL NOT NULL column constraint for Google-only users
                    .status("Pending") // All new accounts require approval
                    .build();

            userRepository.save(newUser);

            String jwt = jwtUtils.generateJwtTokenForUser(email);
            return AuthResponse.builder()
                    .token(jwt)
                    .id(newUser.getId())
                    .email(newUser.getEmail())
                    .fullName(newUser.getFullName())
                    .role(newUser.getRole())
                    .status("Pending")
                    .build();
        }
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private Role mapSelectedRole(String selectedRole) {
        if (selectedRole == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "selectedRole is required.");
        }
        return switch (selectedRole.toLowerCase()) {
            case "mentor", "teacher" -> Role.ROLE_TEACHER;
            case "student"           -> Role.ROLE_STUDENT;
            case "parent"            -> Role.ROLE_PARENT;
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Unknown role: " + selectedRole);
        };
    }

    private String friendlyRole(Role role) {
        return switch (role) {
            case ROLE_TEACHER -> "Mentor";
            case ROLE_STUDENT -> "Student";
            case ROLE_PARENT  -> "Parent";
            case ROLE_ADMIN   -> "Admin";
        };
    }
}

