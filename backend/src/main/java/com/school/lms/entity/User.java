package com.school.lms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    // Nullable: Google-authenticated users do not have a local password
    @Column(nullable = true)
    private String password;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    // Stable Google UID (sub claim). Null for email/password-only accounts.
    @Column(name = "google_uid", unique = true, nullable = true)
    private String googleUid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grade_id")
    private Grade grade; // Associated standard/class for student (e.g. Class 3)

    @Column(name = "section")
    private String section;

    @Column(name = "status")
    @Builder.Default
    private String status = "Approved";
}

