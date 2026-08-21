package com.school.lms.repository;

import com.school.lms.entity.Role;
import com.school.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    List<User> findByGradeId(Long gradeId);

    // Used by Google OAuth login to look up users by their stable Google UID
    Optional<User> findByGoogleUid(String googleUid);
}

