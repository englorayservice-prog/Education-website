/**
 * Engloray Learning - Community Section Engine (WhatsApp Style)
 * Handles container-scoped rendering for both Student & Mentor Portals with Live Cross-Tab & Backend REST API Sync.
 */

(function () {
  'use strict';

  const API_BASE = (window.API_BASE_URL || 'http://localhost:8080/api/v1').replace(/\/$/, '');

  // Live Broadcast Channel for 0ms cross-tab messaging
  const liveChannel = window.BroadcastChannel ? new BroadcastChannel('engloray_community_live_channel') : null;

  // Global Community State
  const CommunityState = {
    activeContainerId: 'studentCommunityView',
    activeContainer: null,
    activeChannelId: 'general',
    pollTimer: null,
    currentUser: {
      name: 'SRIRAM Mayan',
      role: 'Student'
    },
    channels: [
      {
        id: 'announcements',
        name: '📢 Announcements',
        type: 'announcement',
        desc: 'Official updates and notices from Mentors',
        icon: 'fa-bullhorn',
        unread: 1,
        time: '10:15 AM',
        lastMsg: 'Welcome to Engloray Community!'
      },
      {
        id: 'general',
        name: '💬 General Lounge',
        type: 'chat',
        desc: 'Open discussion space for all students & mentors',
        icon: 'fa-comments',
        unread: 0,
        time: '10:30 AM',
        lastMsg: 'Has everyone checked the new chapter?'
      },
      {
        id: 'grade5',
        name: '📚 Class 5th Community',
        type: 'chat',
        desc: 'Grade 5 Computer Skills discussion group',
        icon: 'fa-graduation-cap',
        unread: 2,
        time: 'Yesterday',
        lastMsg: 'Attached lesson notes PDF'
      },
      {
        id: 'homework',
        name: '❓ Homework & Doubt Help',
        type: 'homework',
        desc: 'Share photos of your work and get help',
        icon: 'fa-file-lines',
        unread: 0,
        time: 'Yesterday',
        lastMsg: 'Here is the completed exercise photo'
      }
    ],
    pendingAttachment: null,
    messages: {
      announcements: [
        {
          id: 1,
          senderName: 'Sri',
          senderRole: 'Mentor',
          text: '🎉 Welcome to the Engloray Learning Community! You can share questions, homework photos, and study documents here.',
          time: '10:15 AM',
          attachment: null
        }
      ],
      general: [
        {
          id: 2,
          senderName: 'Gowtham D',
          senderRole: 'Student',
          text: 'Hello everyone! Excited to learn computer skills today.',
          time: '10:20 AM',
          attachment: null
        },
        {
          id: 3,
          senderName: 'Sri',
          senderRole: 'Mentor',
          text: 'Welcome Gowtham! Feel free to ask any questions if you get stuck on Chapter 1.',
          time: '10:25 AM',
          attachment: null
        },
        {
          id: 4,
          senderName: 'SRIRAM Mayan',
          senderRole: 'Student',
          text: 'I uploaded my activity submission photo for review!',
          time: '10:30 AM',
          attachment: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
            name: 'computer_skills_activity.jpg'
          }
        }
      ],
      grade5: [
        {
          id: 5,
          senderName: 'Sri',
          senderRole: 'Mentor',
          text: 'Here is the reference guide for Grade 5 Computer Hardware:',
          time: 'Yesterday',
          attachment: {
            type: 'file',
            url: '#',
            name: 'Grade5_Computer_Hardware_Guide.pdf',
            size: '2.4 MB'
          }
        }
      ],
      homework: [
        {
          id: 6,
          senderName: 'Englorayman JD',
          senderRole: 'Student',
          text: 'Can someone check if my answer for question 3 is correct?',
          time: 'Yesterday',
          attachment: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
            name: 'homework_q3_solution.png'
          }
        }
      ]
    }
  };

  // Helper to query element inside current active container
  function q(selector) {
    if (CommunityState.activeContainer) {
      const el = CommunityState.activeContainer.querySelector(selector);
      if (el) return el;
    }
    return document.querySelector(selector);
  }

  // Initialize Community Logic
  window.initCommunitySection = function (role) {
    const containerId = role === 'mentor' ? 'mentorCommunityView' : 'studentCommunityView';
    CommunityState.activeContainerId = containerId;
    CommunityState.activeContainer = document.getElementById(containerId);

    if (!CommunityState.activeContainer) {
      console.warn('Community container not found:', containerId);
      return;
    }

    if (role) {
      const nameEl = document.getElementById(role === 'mentor' ? 'mentorUserName' : 'studentUserName');
      const name = nameEl ? nameEl.textContent.trim() : (role === 'mentor' ? 'Sri (Mentor)' : 'SRIRAM Mayan');
      CommunityState.currentUser.role = role === 'mentor' ? 'Mentor' : 'Student';
      CommunityState.currentUser.name = name;
    }

    renderChannels();
    selectChannel(CommunityState.activeChannelId);
    setupEventListeners();
    fetchBackendMessages(CommunityState.activeChannelId);

    // Setup Live Real-Time Auto Polling (2.5 seconds interval for live backend sync)
    if (CommunityState.pollTimer) {
      clearInterval(CommunityState.pollTimer);
    }
    CommunityState.pollTimer = setInterval(() => {
      if (CommunityState.activeContainer && !CommunityState.activeContainer.classList.contains('hidden')) {
        fetchBackendMessages(CommunityState.activeChannelId, true);
      }
    }, 2500);
  };

  // Listen for Live Cross-Tab Messages via BroadcastChannel
  if (liveChannel) {
    liveChannel.onmessage = function (event) {
      if (event.data && event.data.channelId && event.data.message) {
        handleIncomingLiveMessage(event.data.channelId, event.data.message);
      }
    };
  }

  // Listen for Live Storage Sync across windows/tabs
  window.addEventListener('storage', function (e) {
    if (e.key === 'lms_community_sync_data' && e.newValue) {
      try {
        const payload = JSON.parse(e.newValue);
        if (payload.channelId && payload.message) {
          handleIncomingLiveMessage(payload.channelId, payload.message);
        }
      } catch (err) {}
    }
  });

  function handleIncomingLiveMessage(channelId, msg) {
    if (!CommunityState.messages[channelId]) {
      CommunityState.messages[channelId] = [];
    }

    const existing = CommunityState.messages[channelId].find(m => m.id === msg.id);
    if (!existing) {
      CommunityState.messages[channelId].push(msg);

      const ch = CommunityState.channels.find(c => c.id === channelId);
      if (ch) {
        ch.lastMsg = msg.text || 'Shared an attachment';
        ch.time = msg.time || 'Just now';
        if (channelId !== CommunityState.activeChannelId) {
          ch.unread = (ch.unread || 0) + 1;
        }
      }

      renderChannels();
      if (channelId === CommunityState.activeChannelId) {
        renderMessages(channelId);
        renderMediaGallery(channelId);
      }
    }
  }

  // Fetch messages from Spring Boot backend
  async function fetchBackendMessages(channelId, isSilentPoll = false) {
    try {
      const response = await fetch(`${API_BASE}/community/messages/${channelId}`);
      if (response.ok) {
        const dbMessages = await response.json();
        if (Array.isArray(dbMessages)) {
          const formatted = dbMessages.map(m => ({
            id: m.id,
            senderName: m.senderName,
            senderRole: m.senderRole,
            text: m.textContent,
            time: m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
            attachment: m.attachmentUrl ? {
              type: m.attachmentType || 'image',
              url: m.attachmentUrl,
              name: m.attachmentName || 'Attachment',
              size: m.attachmentSize || ''
            } : null
          }));

          const localMsgs = CommunityState.messages[channelId] || [];
          const existingIds = new Set(localMsgs.map(x => x.id));
          let hasNew = false;

          formatted.forEach(f => {
            if (!existingIds.has(f.id)) {
              localMsgs.push(f);
              existingIds.add(f.id);
              hasNew = true;
            }
          });

          if (hasNew || !isSilentPoll) {
            CommunityState.messages[channelId] = localMsgs;
            renderMessages(channelId);
            renderMediaGallery(channelId);
          }
        }
      }
    } catch (e) {
      if (!isSilentPoll) {
        console.log('Backend API offline or unreachable, using active community state.');
      }
    }
  }

  // Render Left Channels List
  function renderChannels(filterText = '') {
    const listContainer = q('.channels-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    const filtered = CommunityState.channels.filter(ch =>
      ch.name.toLowerCase().includes(filterText.toLowerCase()) ||
      ch.desc.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach(ch => {
      const item = document.createElement('div');
      item.className = `channel-item ${ch.id === CommunityState.activeChannelId ? 'active' : ''}`;
      item.onclick = () => selectChannel(ch.id);

      item.innerHTML = `
        <div class="channel-avatar ${ch.type || ''}">
          <i class="fa-solid ${ch.icon || 'fa-comments'}"></i>
        </div>
        <div class="channel-details">
          <div class="channel-top-row">
            <span class="channel-name">${escapeHtml(ch.name)}</span>
            <span class="channel-time">${ch.time}</span>
          </div>
          <div class="channel-bottom-row">
            <span class="channel-last-msg">${escapeHtml(ch.lastMsg)}</span>
            ${ch.unread > 0 ? `<span class="unread-badge">${ch.unread}</span>` : ''}
          </div>
        </div>
      `;
      listContainer.appendChild(item);
    });
  }

  // Switch Active Channel
  function selectChannel(channelId) {
    CommunityState.activeChannelId = channelId;

    const ch = CommunityState.channels.find(c => c.id === channelId);
    if (ch) ch.unread = 0;

    renderChannels();

    const titleEl = q('.chat-header-title-text');
    const subtitleEl = q('.chat-header-subtitle');
    const avatarEl = q('.chat-header-avatar');
    const infoTitle = q('.info-panel-title');
    const infoDesc = q('.info-panel-desc');

    if (ch) {
      if (titleEl) titleEl.textContent = ch.name;
      if (subtitleEl) subtitleEl.textContent = ch.desc;
      if (avatarEl) avatarEl.innerHTML = `<i class="fa-solid ${ch.icon || 'fa-comments'}"></i>`;
      if (infoTitle) infoTitle.textContent = ch.name;
      if (infoDesc) infoDesc.textContent = ch.desc;
    }

    renderMessages(channelId);
    renderMediaGallery(channelId);
    fetchBackendMessages(channelId);
  }

  // Render Active Messages Stream
  function renderMessages(channelId) {
    const stream = q('.chat-messages-container');
    if (!stream) return;

    stream.innerHTML = '';

    const list = CommunityState.messages[channelId] || [];

    const dateDiv = document.createElement('div');
    dateDiv.className = 'chat-date-divider';
    dateDiv.innerHTML = `<span>Today</span>`;
    stream.appendChild(dateDiv);

    list.forEach(msg => {
      const isSent = msg.senderRole === CommunityState.currentUser.role || msg.senderName.includes(CommunityState.currentUser.name);

      const wrapper = document.createElement('div');
      wrapper.className = `message-bubble-wrapper ${isSent ? 'sent' : 'received'}`;

      let attachmentHtml = '';
      if (msg.attachment) {
        if (msg.attachment.type === 'image') {
          attachmentHtml = `
            <div class="message-image-attachment" onclick="window.openCommunityLightbox('${msg.attachment.url}')">
              <img src="${msg.attachment.url}" alt="${escapeHtml(msg.attachment.name || 'Photo')}">
            </div>
          `;
        } else {
          attachmentHtml = `
            <div class="message-file-card">
              <div class="file-icon-box">
                <i class="fa-solid fa-file-pdf"></i>
              </div>
              <div class="file-info-text">
                <div class="file-name">${escapeHtml(msg.attachment.name)}</div>
                <div class="file-size">${msg.attachment.size || 'Document'}</div>
              </div>
              <a href="${msg.attachment.url}" class="btn-file-download" download title="Download file">
                <i class="fa-solid fa-download"></i>
              </a>
            </div>
          `;
        }
      }

      wrapper.innerHTML = `
        <div class="message-bubble">
          <div class="message-sender-row">
            <span class="message-sender-name">${escapeHtml(msg.senderName)}</span>
            <span class="role-badge ${(msg.senderRole || 'student').toLowerCase()}">${msg.senderRole || 'Student'}</span>
          </div>
          <div class="message-text">${escapeHtml(msg.text)}</div>
          ${attachmentHtml}
          <div class="message-meta">
            <span>${msg.time}</span>
            ${isSent ? `<i class="fa-solid fa-check-double"></i>` : ''}
          </div>
        </div>
      `;

      stream.appendChild(wrapper);
    });

    stream.scrollTop = stream.scrollHeight;
    setTimeout(() => {
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 50);
  }

  // Render Right Panel Media Gallery
  function renderMediaGallery(channelId) {
    const thumbsGrid = q('.media-thumbs-grid');
    if (!thumbsGrid) return;

    thumbsGrid.innerHTML = '';
    const list = CommunityState.messages[channelId] || [];
    const images = list.filter(m => m.attachment && m.attachment.type === 'image');

    if (images.length === 0) {
      thumbsGrid.innerHTML = `<p style="font-size:0.75rem; color:#94a3b8; grid-column:span 3;">No media shared yet</p>`;
      return;
    }

    images.forEach(m => {
      const thumb = document.createElement('div');
      thumb.className = 'media-thumb-item';
      thumb.onclick = () => window.openCommunityLightbox(m.attachment.url);
      thumb.innerHTML = `<img src="${m.attachment.url}" alt="Shared photo">`;
      thumbsGrid.appendChild(thumb);
    });
  }

  // Send New Message with Instant Live Sync
  async function sendMessage() {
    const input = q('.chat-text-input');
    if (!input) return;

    const text = input.value.trim();
    if (!text && !CommunityState.pendingAttachment) return;

    const channelId = CommunityState.activeChannelId;
    if (!CommunityState.messages[channelId]) {
      CommunityState.messages[channelId] = [];
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: Date.now(),
      senderName: CommunityState.currentUser.name,
      senderRole: CommunityState.currentUser.role,
      text: text || (CommunityState.pendingAttachment ? 'Attached file' : ''),
      time: timeStr,
      attachment: CommunityState.pendingAttachment ? { ...CommunityState.pendingAttachment } : null
    };

    CommunityState.messages[channelId].push(newMsg);

    const ch = CommunityState.channels.find(c => c.id === channelId);
    if (ch) {
      ch.lastMsg = text || 'Shared an attachment';
      ch.time = timeStr;
    }

    const att = CommunityState.pendingAttachment;
    input.value = '';
    clearAttachmentPreview();

    renderMessages(channelId);
    renderChannels();
    renderMediaGallery(channelId);

    // 1. Broadcast Live Instant Event to all other open tabs/windows
    if (liveChannel) {
      try {
        liveChannel.postMessage({ channelId: channelId, message: newMsg });
      } catch (err) {}
    }
    try {
      localStorage.setItem('lms_community_sync_data', JSON.stringify({
        channelId: channelId,
        message: newMsg,
        ts: Date.now()
      }));
    } catch (err) {}

    // 2. Send POST to Spring Boot Backend
    try {
      await fetch(`${API_BASE}/community/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: channelId,
          senderName: CommunityState.currentUser.name,
          senderRole: CommunityState.currentUser.role,
          textContent: text,
          attachmentType: att ? att.type : null,
          attachmentUrl: att ? att.url : null,
          attachmentName: att ? att.name : null,
          attachmentSize: att ? att.size : null
        })
      });
    } catch (e) {
      console.log('Saved message locally in state.');
    }
  }

  // Handle Photo & File Selection
  function handleFileSelect(event, fileType) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    if (fileType === 'image' || file.type.startsWith('image/')) {
      reader.onload = function (e) {
        CommunityState.pendingAttachment = {
          type: 'image',
          url: e.target.result,
          name: file.name
        };
        showAttachmentPreview(file.name, 'Photo');
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = function (e) {
        CommunityState.pendingAttachment = {
          type: 'file',
          url: e.target.result,
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(1) + ' MB'
        };
        showAttachmentPreview(file.name, 'Document');
      };
      reader.readAsDataURL(file);
    }

    const popup = q('.attachment-menu-popup');
    if (popup) popup.style.display = 'none';
  }

  function showAttachmentPreview(fileName, typeLabel) {
    let previewBar = q('.attachment-preview-bar');
    if (!previewBar) {
      previewBar = document.createElement('div');
      previewBar.className = 'attachment-preview-bar';
      const inputBar = q('.chat-input-bar');
      if (inputBar && inputBar.parentNode) {
        inputBar.parentNode.insertBefore(previewBar, inputBar);
      }
    }

    previewBar.innerHTML = `
      <div class="preview-file-chip">
        <i class="fa-solid ${typeLabel === 'Photo' ? 'fa-image' : 'fa-file-pdf'}"></i>
        <span>Ready to send ${typeLabel}: <strong>${escapeHtml(fileName)}</strong></span>
      </div>
      <button type="button" class="btn-remove-preview" onclick="window.clearCommunityAttachment()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    previewBar.style.display = 'flex';
  }

  function clearAttachmentPreview() {
    CommunityState.pendingAttachment = null;
    const previewBar = q('.attachment-preview-bar');
    if (previewBar) previewBar.style.display = 'none';
  }
  window.clearCommunityAttachment = clearAttachmentPreview;

  // Lightbox Modal
  window.openCommunityLightbox = function (imgUrl) {
    let modal = document.querySelector('.community-lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'community-lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-content">
          <button class="btn-close-lightbox" onclick="window.closeCommunityLightbox()">&times;</button>
          <img id="lightboxImg" src="" alt="Enlarged photo">
        </div>
      `;
      document.body.appendChild(modal);
    }
    const img = modal.querySelector('#lightboxImg');
    if (img) img.src = imgUrl;
    modal.style.display = 'flex';
  };

  window.closeCommunityLightbox = function () {
    const modal = document.querySelector('.community-lightbox-modal');
    if (modal) modal.style.display = 'none';
  };

  // Event Listeners Setup (Container Scoped)
  function setupEventListeners() {
    const searchInput = q('.channels-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => renderChannels(e.target.value);
    }

    const attachBtn = q('.btn-attachment-toggle');
    const popupMenu = q('.attachment-menu-popup');
    if (attachBtn && popupMenu) {
      attachBtn.onclick = (e) => {
        e.stopPropagation();
        popupMenu.style.display = popupMenu.style.display === 'flex' ? 'none' : 'flex';
      };
      document.onclick = (e) => {
        if (!attachBtn.contains(e.target) && !popupMenu.contains(e.target)) {
          popupMenu.style.display = 'none';
        }
      };
    }

    // Photo input triggers for both Student & Mentor containers
    const btnAttachPhoto = q('#btnAttachPhoto') || q('#btnAttachPhotoStudent');
    const fileInputPhoto = q('#fileInputPhoto') || q('#fileInputPhotoStudent');
    if (btnAttachPhoto && fileInputPhoto) {
      btnAttachPhoto.onclick = () => fileInputPhoto.click();
      fileInputPhoto.onchange = (e) => handleFileSelect(e, 'image');
    }

    // Document input triggers
    const btnAttachDoc = q('#btnAttachDoc') || q('#btnAttachDocStudent');
    const fileInputDoc = q('#fileInputDoc') || q('#fileInputDocStudent');
    if (btnAttachDoc && fileInputDoc) {
      btnAttachDoc.onclick = () => fileInputDoc.click();
      fileInputDoc.onchange = (e) => handleFileSelect(e, 'file');
    }

    // Send button & Enter key
    const sendBtn = q('.btn-send-message');
    const textInput = q('.chat-text-input');
    if (sendBtn) {
      sendBtn.onclick = sendMessage;
    }
    if (textInput) {
      textInput.onkeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      };
    }

    // New Channel Creation
    const newChannelBtn = q('.btn-new-channel');
    if (newChannelBtn) {
      newChannelBtn.onclick = () => {
        const name = prompt('Enter new channel / group name:');
        if (name) {
          const id = 'ch_' + Date.now();
          CommunityState.channels.push({
            id: id,
            name: '💬 ' + name,
            type: 'chat',
            desc: 'Custom group created in Community',
            icon: 'fa-comments',
            unread: 0,
            time: 'Just now',
            lastMsg: 'Channel created'
          });
          selectChannel(id);
        }
      };
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
