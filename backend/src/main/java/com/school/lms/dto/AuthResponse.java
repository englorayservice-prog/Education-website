package com.school.lms.dto;

import com.school.lms.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    @Builder.Default
    private String type = "Bearer";
    private Long id;
    private String email;
    private String fullName;
    private Role role;
    private Integer gradeNumber;
    // "Approved" or "Pending" — used by Google login to tell the frontend the account state
    @Builder.Default
    private String status = "Approved";
}

