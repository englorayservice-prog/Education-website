package com.school.lms.dto;

import lombok.Data;

/**
 * Request body for POST /api/v1/auth/google
 *
 * idToken      — Firebase ID token obtained from the frontend after signInWithPopup
 * selectedRole — Role the user selected on the login page: "mentor", "student", or "parent"
 */
@Data
public class GoogleAuthRequest {
    private String idToken;
    private String selectedRole; // "mentor" | "student" | "parent"
}
