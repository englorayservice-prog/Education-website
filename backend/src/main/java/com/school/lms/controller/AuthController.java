package com.school.lms.controller;

import com.school.lms.dto.AuthRequest;
import com.school.lms.dto.AuthResponse;
import com.school.lms.dto.GoogleAuthRequest;
import com.school.lms.dto.SignupRequest;
import com.school.lms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest signupRequest) {
        return ResponseEntity.ok(authService.signup(signupRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.login(authRequest));
    }

    /**
     * Google OAuth Sign-In endpoint.
     * Accepts a Firebase ID token (obtained from the frontend after signInWithPopup)
     * and the role the user selected on the login page.
     * Returns the application JWT + user info on success.
     */
    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest googleAuthRequest) {
        return ResponseEntity.ok(authService.googleLogin(googleAuthRequest));
    }
}

