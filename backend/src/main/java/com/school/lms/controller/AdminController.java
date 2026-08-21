package com.school.lms.controller;

import com.school.lms.dto.*;
import com.school.lms.entity.User;
import com.school.lms.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardStatsDto> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/submissions")
    public ResponseEntity<List<AdminSubmissionDto>> getAllSubmissions() {
        return ResponseEntity.ok(adminService.getAllSubmissions());
    }

    @GetMapping("/submissions/{id}")
    public ResponseEntity<AdminSubmissionDto> getSubmissionById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getSubmissionById(id));
    }

    @PostMapping("/submissions/{id}/approve")
    public ResponseEntity<AdminSubmissionDto> approveSubmission(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "100") Integer score,
            @RequestParam(required = false) String feedback) {
        return ResponseEntity.ok(adminService.approveSubmission(id, score, feedback));
    }

    @PostMapping("/submissions/{id}/reject")
    public ResponseEntity<AdminSubmissionDto> rejectSubmission(
            @PathVariable Long id,
            @RequestParam(required = false) String feedback) {
        return ResponseEntity.ok(adminService.rejectSubmission(id, feedback));
    }

    @PutMapping("/chapters/{chapterId}/lock")
    public ResponseEntity<ChapterDto> toggleChapterLock(
            @PathVariable Long chapterId,
            @RequestParam boolean isLocked) {
        return ResponseEntity.ok(adminService.toggleChapterLock(chapterId, isLocked));
    }

    @GetMapping("/students")
    public ResponseEntity<List<AdminStudentDto>> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }

    @GetMapping("/parents")
    public ResponseEntity<List<AdminStudentDto>> getAllParents() {
        return ResponseEntity.ok(adminService.getAllParents());
    }

    @PutMapping("/users/{userId}/status")
    public ResponseEntity<AdminStudentDto> updateUserStatus(
            @PathVariable Long userId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer gradeNumber,
            @RequestParam(required = false) String section) {
        return ResponseEntity.ok(adminService.updateUserStatus(userId, status, gradeNumber, section));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/courses")
    public ResponseEntity<List<AdminCourseDto>> getAllCourses() {
        return ResponseEntity.ok(adminService.getAllCourses());
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createAdminUser(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(adminService.createAdminUser(request));
    }
}
