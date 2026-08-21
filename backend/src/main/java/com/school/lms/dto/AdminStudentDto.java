package com.school.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStudentDto {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private Integer gradeNumber;
    private Integer currentClassNumber;
    private String parentName;
    private Integer progressPercentage;
    private String lastActive;
    private Integer submissionsCount;
    private String section;
    private String status;
}
