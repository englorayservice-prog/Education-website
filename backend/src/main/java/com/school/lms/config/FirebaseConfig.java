package com.school.lms.config;

import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;

/**
 * Initializes the Firebase Admin SDK on application startup.
 *
 * Supports three credential initialization modes:
 * 1. FIREBASE_SERVICE_ACCOUNT_JSON env var (raw JSON string content)
 * 2. FIREBASE_SERVICE_ACCOUNT_PATH env var (file path to JSON key file)
 * 3. Fallback: Application Default Credentials or Project ID mode (verifies Firebase ID Token signatures)
 */
@Configuration
public class FirebaseConfig {

    @Value("${firebase.project-id:education-website-17c4b-a2dcb}")
    private String projectId;

    @Value("${firebase.service-account-json:}")
    private String serviceAccountJson;

    @Value("${firebase.service-account-path:}")
    private String serviceAccountPath;

    @PostConstruct
    public void initialize() {
        if (!FirebaseApp.getApps().isEmpty()) {
            return;
        }

        try {
            FirebaseOptions.Builder optionsBuilder = FirebaseOptions.builder();
            boolean hasCredentials = false;

            // Mode 1: Raw JSON content string from environment variable
            if (serviceAccountJson != null && !serviceAccountJson.isBlank()) {
                try {
                    InputStream stream = new ByteArrayInputStream(serviceAccountJson.getBytes(StandardCharsets.UTF_8));
                    optionsBuilder.setCredentials(GoogleCredentials.fromStream(stream));
                    hasCredentials = true;
                    System.out.println("[Firebase] Initialized Admin SDK with service account JSON env variable.");
                } catch (Exception e) {
                    System.err.println("[Firebase] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON: " + e.getMessage());
                }
            }

            // Mode 2: File path from environment variable or local key file
            if (!hasCredentials && serviceAccountPath != null && !serviceAccountPath.isBlank()) {
                if (Files.exists(Paths.get(serviceAccountPath))) {
                    try {
                        InputStream stream = new FileInputStream(serviceAccountPath);
                        optionsBuilder.setCredentials(GoogleCredentials.fromStream(stream));
                        hasCredentials = true;
                        System.out.println("[Firebase] Initialized Admin SDK with service account file: " + serviceAccountPath);
                    } catch (Exception e) {
                        System.err.println("[Firebase] Failed to read service account file at " + serviceAccountPath + ": " + e.getMessage());
                    }
                }
            }

            // Mode 3: Application Default Credentials or Public Token Verification Mode
            if (!hasCredentials) {
                try {
                    optionsBuilder.setCredentials(GoogleCredentials.getApplicationDefault());
                    hasCredentials = true;
                    System.out.println("[Firebase] Initialized Admin SDK with Google Application Default Credentials.");
                } catch (Exception e) {
                    // Fallback credentials for public token verification mode
                    AccessToken mockToken = new AccessToken("public_verification_token", new Date(System.currentTimeMillis() + 864000000L));
                    optionsBuilder.setCredentials(GoogleCredentials.create(mockToken));
                    optionsBuilder.setProjectId(projectId);
                    System.out.println("[Firebase] Initialized Admin SDK with Project ID: " + projectId + " (Public token verification mode).");
                }
            }

            FirebaseApp.initializeApp(optionsBuilder.build());
            System.out.println("[Firebase] Admin SDK initialization completed successfully.");

        } catch (Exception e) {
            System.err.println("[Firebase] Critical error initializing Firebase Admin SDK: " + e.getMessage());
        }
    }
}
