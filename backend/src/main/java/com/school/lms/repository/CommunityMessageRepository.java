package com.school.lms.repository;

import com.school.lms.entity.CommunityMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityMessageRepository extends JpaRepository<CommunityMessage, Long> {
    List<CommunityMessage> findByChannelIdOrderByCreatedAtAsc(String channelId);
}
