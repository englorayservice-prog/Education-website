package com.school.lms.controller;

import com.school.lms.entity.CommunityMessage;
import com.school.lms.repository.CommunityMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/community")
@CrossOrigin(origins = "*")
public class CommunityController {

    @Autowired
    private CommunityMessageRepository messageRepository;

    @GetMapping("/messages/{channelId}")
    public ResponseEntity<List<CommunityMessage>> getMessages(@PathVariable String channelId) {
        List<CommunityMessage> messages = messageRepository.findByChannelIdOrderByCreatedAtAsc(channelId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/messages")
    public ResponseEntity<CommunityMessage> postMessage(@RequestBody CommunityMessage message) {
        if (message.getCreatedAt() == null) {
            message.setCreatedAt(LocalDateTime.now());
        }
        CommunityMessage saved = messageRepository.save(message);
        return ResponseEntity.ok(saved);
    }
}
