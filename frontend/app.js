/* ==========================================================================
   ENGLORAY LEARNING - DYNAMIC JSON NAVIGATION ENGINE & URL ROUTER
   Loads class data from COURSES_DATA JSON object dynamically
   Supports clean URL routing: /grade-3/chapter-1/class-1, /grade-5/chapter-1/overview, etc.
   ========================================================================== */

// Load YouTube IFrame API
(function() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

document.addEventListener('DOMContentLoaded', () => {
  // LMS Application State
  const state = {
    currentClassId: 6, // Default Class ID
    currentView: 'learning', // 'learning' or 'overview'
    completedStepsPerClass: {},
    prerequisitesPerClass: {}, // Track videoWatched, docOpened, websiteOpened per classId
    unlockedClassIds: [6, 7, 301, 401, 601, 701, 801, 901, 1001], // Class 1 unlocked across all grades
    selectedQuizOptionId: null,
    selectedFile: null,
    websiteCountdownTimer: null, // Active website 20-sec countdown
    youtubePlayer: null          // YouTube IFrame API player instance
  };

  // Helper to ensure prerequisite state object exists per class
  function getPrerequisites(classId) {
    if (!state.prerequisitesPerClass[classId]) {
      const isDone = state.completedStepsPerClass[classId] || {};
      state.prerequisitesPerClass[classId] = {
        videoWatched: !!isDone.step1Video,
        docOpened: !!isDone.step2TopicPdf,
        websiteOpened: !!isDone.step3Website
      };
    }
    return state.prerequisitesPerClass[classId];
  }

  // DOM Element Selectors
  const elements = {
    // Views
    courseOverviewPage: document.getElementById('courseOverviewPage'),
    classLearningPage: document.getElementById('classLearningPage'),
    courseClassesGrid: document.getElementById('courseClassesGrid'),
    logoHeaderHome: document.getElementById('logoHeaderHome'),
    gradeDisplayBadge: document.getElementById('gradeDisplayBadge'),

    // Hero Header
    activeDayBadge: document.getElementById('activeDayBadge'),
    overallCompletionBadge: document.getElementById('overallCompletionBadge'),
    classTopicTitle: document.getElementById('classTopicTitle'),
    classTopicDescription: document.getElementById('classTopicDescription'),

    // Step 1 Video
    step1Title: document.getElementById('step1Title'),
    step1Desc: document.getElementById('step1Desc'),
    youtubeIframe: document.getElementById('youtubeIframe'),
    videoContainer: document.getElementById('videoContainer'),
    btnCompleteStep1: document.getElementById('btnCompleteStep1'),
    step1StatusBadge: document.getElementById('step1StatusBadge'),

    // Step 2 PDF
    step2Title: document.getElementById('step2Title'),
    step2Desc: document.getElementById('step2Desc'),
    topicPdfTitle: document.getElementById('topicPdfTitle'),
    linkTopicPdf: document.getElementById('linkTopicPdf'),
    keyConceptsList: document.getElementById('keyConceptsList'),
    btnCompleteStep2: document.getElementById('btnCompleteStep2'),
    step2StatusBadge: document.getElementById('step2StatusBadge'),

    // Step 3 Website
    step3Title: document.getElementById('step3Title'),
    step3Desc: document.getElementById('step3Desc'),
    portalNameText: document.getElementById('portalNameText'),
    websiteUrlText: document.getElementById('websiteUrlText'),
    linkWebsite: document.getElementById('linkWebsite'),
    btnCompleteStep3: document.getElementById('btnCompleteStep3'),
    step3StatusBadge: document.getElementById('step3StatusBadge'),

    // Step 4 Quiz
    step4Title: document.getElementById('step4Title'),
    step4Desc: document.getElementById('step4Desc'),
    quizQuestionsContainer: document.getElementById('quizQuestionsContainer'),
    studentEmailInput: document.getElementById('studentEmailInput'),
    btnSubmitQuiz: document.getElementById('btnSubmitQuiz'),
    quizResultBox: document.getElementById('quizResultBox'),
    resultTitle: document.getElementById('resultTitle'),
    resultSubtitle: document.getElementById('resultSubtitle'),
    step4StatusBadge: document.getElementById('step4StatusBadge'),

    // Step 5 Task Upload
    step5Title: document.getElementById('step5Title'),
    step5Desc: document.getElementById('step5Desc'),
    taskInstructionsText: document.getElementById('taskInstructionsText'),
    linkPracticalPdf: document.getElementById('linkPracticalPdf'),
    fileInput: document.getElementById('fileInput'),
    btnBrowseFile: document.getElementById('btnBrowseFile'),
    btnClearFile: document.getElementById('btnClearFile'),
    selectedFileInfo: document.getElementById('selectedFileInfo'),
    fileNameDisplay: document.getElementById('fileNameDisplay'),
    dropzone: document.getElementById('dropzone'),
    submissionStatusBox: document.getElementById('submissionStatusBox'),
    submissionMetaText: document.getElementById('submissionMetaText'),
    btnSubmitTask: document.getElementById('btnSubmitTask'),
    step5StatusBadge: document.getElementById('step5StatusBadge'),

    // Sidebar Elements
    progressPercentageText: document.getElementById('progressPercentageText'),
    progressRingFill: document.getElementById('progressRingFill'),
    progressionStatusTitle: document.getElementById('progressionStatusTitle'),
    progressionSubtitleText: document.getElementById('progressionSubtitleText'),
    sidebarClassNavList: document.getElementById('sidebarClassNavList'),
    sidebarAssetsList: document.getElementById('sidebarAssetsList'),
    toastContainer: document.getElementById('toastContainer')
  };

  // Ensure Class 1 is Unlocked for ALL Grades by Default
  function ensureClass1UnlockedForAllGrades() {
    if (!COURSES_DATA || !COURSES_DATA.grades) return;
    COURSES_DATA.grades.forEach(grade => {
      if (grade.chapters && grade.chapters[0] && grade.chapters[0].classes) {
        grade.chapters[0].classes.forEach(c => {
          if (!state.completedStepsPerClass[c.id]) {
            state.completedStepsPerClass[c.id] = { step1Video: false, step2TopicPdf: false, step3Website: false, step4Quiz: false, step5Task: false };
          }
          if (c.dayNumber === 1 || c.isUnlockedByAdmin) {
            if (!state.unlockedClassIds.includes(c.id)) {
              state.unlockedClassIds.push(c.id);
            }
          }
        });
      }
    });
  }

  // URL Route Management (pushState / replaceState / popstate)
  function getRouteInfo() {
    let path = window.location.pathname;
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      path = window.location.hash.replace('#', '');
    }

    const routeRegex = /^\/grade-(\d+)(?:\/chapter-(\d+))?(?:\/(class-(\d+)|overview))?/i;
    const match = path.match(routeRegex);

    if (match) {
      return {
        gradeNum: parseInt(match[1]),
        chapterNum: match[2] ? parseInt(match[2]) : 1,
        isOverview: match[3] === 'overview',
        classDayNum: match[4] ? parseInt(match[4]) : 1
      };
    }
    return null;
  }

  function updateURLRoute(gradeNum, chapterNum, classDayNum, isOverview, replace = false) {
    const chapNum = chapterNum || 1;
    let path = `/grade-${gradeNum}/chapter-${chapNum}`;
    if (isOverview) {
      path += `/overview`;
    } else {
      path += `/class-${classDayNum || 1}`;
    }

    if (window.location.pathname !== path) {
      const stateObj = { gradeNum, chapterNum: chapNum, classDayNum, isOverview };
      if (replace) {
        window.history.replaceState(stateObj, '', path);
      } else {
        window.history.pushState(stateObj, '', path);
      }
    }
  }

  // ── Backend API Auto-Connect Integration Helper ────────────────────────────
  const API_BASE = window.API_BASE_URL || 'http://localhost:8080/api/v1';

  // Shared HTML escape utility (also defined in community.js; safe to re-declare here)
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── Student Grade Data Store (from backend) ───────────────────────────────
  // Populated after login via GET /api/v1/courses/my-grade
  // Shape: { id, gradeNumber, name, terms: [{ id, termNumber, title, chapters: [{ id, chapterNumber, title, description, isLocked, dayClasses: [...] }] }] }
  window.currentStudentGradeData = null;

  // Fetch and cache student's grade hierarchy from the backend
  async function loadStudentGradeFromBackend() {
    const token = localStorage.getItem('lms_token');
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/courses/my-grade`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const gradeData = await res.json();
        window.currentStudentGradeData = gradeData;
        // Also store gradeNumber for easy access
        if (gradeData && gradeData.gradeNumber) {
          localStorage.setItem('lms_student_grade_number', String(gradeData.gradeNumber));
        }
        return gradeData;
      }
    } catch (e) {
      console.warn('[LMS] Backend offline or no grade assigned. Falling back to local data.', e);
    }
    return null;
  }

  // Helper: get the student's current grade number (from backend data or localStorage)
  function getStudentGradeNumber() {
    if (window.currentStudentGradeData && window.currentStudentGradeData.gradeNumber) {
      return window.currentStudentGradeData.gradeNumber;
    }
    const stored = localStorage.getItem('lms_student_grade_number');
    if (stored) return parseInt(stored);
    // Fallback: check lms_user for gradeNumber from login response
    try {
      const user = JSON.parse(localStorage.getItem('lms_user') || '{}');
      if (user.gradeNumber) return user.gradeNumber;
    } catch (e) {}
    return 3; // default
  }

  async function loginWithBackend(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('lms_token', data.token);
          localStorage.setItem('lms_user', JSON.stringify(data));
        }
        return data;
      }
    } catch (e) {
      console.warn('Backend API offline or unreachable. Using client auth fallback.', e);
    }
    return null;
  }

  async function signupWithBackend(signupData) {
    // Sync registered user immediately to local storage pool
    try {
      const localUsers = JSON.parse(localStorage.getItem('lms_registered_users') || '[]');
      const userRole = signupData.role || 'ROLE_STUDENT';
      const existingIdx = localUsers.findIndex(u => u.email && signupData.email && u.email.toLowerCase() === signupData.email.toLowerCase());
      const newUserObj = {
        id: Date.now(),
        fullName: signupData.fullName,
        email: signupData.email,
        role: userRole,
        gradeNumber: signupData.gradeNumber || 3,
        section: '',
        status: 'Approved'
      };
      if (existingIdx >= 0) {
        localUsers[existingIdx] = { ...localUsers[existingIdx], ...newUserObj };
      } else {
        localUsers.unshift(newUserObj);
      }
      localStorage.setItem('lms_registered_users', JSON.stringify(localUsers));
    } catch (e) {}

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend signup offline. Simulating local registration.', e);
    }
    return { success: true };
  }

  async function sendCompleteStepAPI(dayClassId, stepName) {
    const token = localStorage.getItem('lms_token');
    if (!token) return;
    try {
      await fetch(`${API_BASE}/student/progress/complete-step`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ dayClassId, step: stepName })
      });
    } catch (e) {}
  }

  // ── Portal View Routing Functions ──────────────────────────────────────────
  function showAuthPage(pageId, path = '/login') {
    document.getElementById('loginRoleSelectPage')?.classList.add('hidden');
    document.getElementById('studentSignInPage')?.classList.add('hidden');
    document.getElementById('mentorSignInPage')?.classList.add('hidden');
    document.getElementById('registerPage')?.classList.add('hidden');
    document.getElementById('mentorDashboardPage')?.classList.add('hidden');
    document.getElementById('studentPortalLayout')?.classList.add('hidden');
    document.getElementById('studentClassModal')?.classList.add('hidden');

    const target = document.getElementById(pageId);
    if (target) target.classList.remove('hidden');

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }

  function showMentorPortal(subViewId = 'mentorDashboardView', path = '/mentor/dashboard') {
    document.getElementById('loginRoleSelectPage')?.classList.add('hidden');
    document.getElementById('studentSignInPage')?.classList.add('hidden');
    document.getElementById('mentorSignInPage')?.classList.add('hidden');
    document.getElementById('registerPage')?.classList.add('hidden');
    document.getElementById('studentPortalLayout')?.classList.add('hidden');
    document.getElementById('studentClassModal')?.classList.add('hidden');

    const mentorDashboard = document.getElementById('mentorDashboardPage');
    if (mentorDashboard) mentorDashboard.classList.remove('hidden');

    // Hide all mentor subviews
    document.querySelectorAll('#mentorDashboardPage .mentor-subview').forEach(v => v.classList.add('hidden'));

    const targetView = document.getElementById(subViewId);
    if (targetView) targetView.classList.remove('hidden');

    if (subViewId === 'mentorCommunityView' && typeof window.initCommunitySection === 'function') {
      window.initCommunitySection('mentor');
    }

    if (subViewId === 'mentorStudentsView' && typeof window.renderMentorStudentsView === 'function') {
      window.renderMentorStudentsView();
    }

    if (subViewId === 'mentorCurriculumView') {
      if (typeof window.renderMentorCurriculumGrid === 'function') {
        window.renderMentorCurriculumGrid();
      }
      if (typeof window.renderMentorGradeCurriculum === 'function') {
        window.renderMentorGradeCurriculum();
      }
    }

    if (subViewId === 'mentorApprovalsView' && typeof renderMentorApprovalsQueue === 'function') {
      renderMentorApprovalsQueue();
    }

    if (subViewId === 'mentorAssignmentsView' && typeof window.renderMentorAssignmentsView === 'function') {
      window.renderMentorAssignmentsView();
    }

    if (subViewId === 'mentorActivitiesView' && typeof window.renderMentorActivitiesView === 'function') {
      window.renderMentorActivitiesView();
    }

    if (subViewId === 'mentorResourcesView' && typeof window.renderMentorResourcesView === 'function') {
      window.renderMentorResourcesView();
    }

    if (subViewId === 'mentorAttendanceView' && typeof window.renderMentorAttendanceView === 'function') {
      window.renderMentorAttendanceView();
    }

    if (subViewId === 'mentorCertificatesView' && typeof window.renderMentorCertificatesView === 'function') {
      window.renderMentorCertificatesView();
    }

    if (subViewId === 'mentorAnalyticsView' && typeof window.renderMentorAnalyticsView === 'function') {
      window.renderMentorAnalyticsView();
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }

  function showStudentPortal(subViewId, path = '/student/dashboard') {
    document.getElementById('loginRoleSelectPage')?.classList.add('hidden');
    document.getElementById('studentSignInPage')?.classList.add('hidden');
    document.getElementById('mentorSignInPage')?.classList.add('hidden');
    document.getElementById('registerPage')?.classList.add('hidden');
    document.getElementById('mentorDashboardPage')?.classList.add('hidden');

    const studentPortal = document.getElementById('studentPortalLayout');
    if (studentPortal) studentPortal.classList.remove('hidden');

    // Hide all subviews dynamically
    document.querySelectorAll('#studentPortalLayout .student-subview').forEach(v => v.classList.add('hidden'));

    const targetSubView = document.getElementById(subViewId);
    if (targetSubView) targetSubView.classList.remove('hidden');

    // Update active sidebar nav item & breadcrumb
    const navLinks = document.querySelectorAll('#studentPortalLayout .sidebar-nav .nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const breadcrumbActive = document.getElementById('studentBreadcrumbActive');
    const tabMap = {
      'studentDashboardView': { tab: 'dashboard', label: 'Dashboard' },
      'studentCurriculumView': { tab: 'curriculum', label: 'Curriculum Builder' },
      'studentSubjectsView': { tab: 'subjects', label: 'Subjects & Lessons' },
      'studentLearningPageWrapper': { tab: 'subjects', label: 'Subjects & Lessons / Lesson 2' },
      'studentAssignmentsView': { tab: 'assignments', label: 'Assignments' },
      'studentActivitiesView': { tab: 'activities', label: 'Practical Activities' },
      'studentResourcesView': { tab: 'resources', label: 'Learning Resources' },
      'studentAttendanceView': { tab: 'attendance', label: 'Attendance' },
      'studentProgressView': { tab: 'progress', label: 'Progress & Awards' },
      'studentAnnouncementsView': { tab: 'announcements', label: 'Announcements' },
      'studentCommunityView': { tab: 'community', label: 'Engloray Community' },
      'studentProfileView': { tab: 'profile', label: 'Profile' }
    };

    const currentTabInfo = tabMap[subViewId] || { tab: 'dashboard', label: 'Dashboard' };
    const activeLink = document.querySelector(`#studentPortalLayout .sidebar-nav [data-student-tab="${currentTabInfo.tab}"]`);
    if (activeLink) activeLink.classList.add('active');
    if (breadcrumbActive) breadcrumbActive.textContent = currentTabInfo.label;

    if (subViewId === 'studentCommunityView' && typeof window.initCommunitySection === 'function') {
      window.initCommunitySection('student');
    }

    if ((subViewId === 'studentSubjectsView' || subViewId === 'studentCurriculumView') && typeof window.renderStudentSubjectsView === 'function') {
      window.renderStudentSubjectsView(getStudentGradeNumber(), 'lessons');
    }

    if (subViewId === 'studentAssignmentsView' && typeof window.renderStudentAssignmentsView === 'function') {
      window.renderStudentAssignmentsView();
    }

    if (subViewId === 'studentActivitiesView' && typeof window.renderStudentActivitiesView === 'function') {
      window.renderStudentActivitiesView();
    }

    if (subViewId === 'studentResourcesView' && typeof window.renderStudentResourcesView === 'function') {
      window.renderStudentResourcesView();
    }

    if (subViewId === 'studentAttendanceView' && typeof window.renderStudentAttendanceView === 'function') {
      window.renderStudentAttendanceView();
    }

    if (subViewId === 'studentProgressView' && typeof window.renderStudentProgressView === 'function') {
      window.renderStudentProgressView();
    }

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }

  function handleCurrentRoute() {
    ensureClass1UnlockedForAllGrades();
    let path = window.location.pathname;
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      path = window.location.hash.replace('#', '');
    }

    if (path === '/login/student') {
      showAuthPage('studentSignInPage', '/login/student');
      return;
    }
    if (path === '/login/mentor') {
      showAuthPage('mentorSignInPage', '/login/mentor');
      return;
    }
    if (path === '/register') {
      showAuthPage('registerPage', '/register');
      return;
    }
    if (path.startsWith('/mentor/')) {
      const tab = path.replace('/mentor/', '') || 'dashboard';
      const viewMap = {
        'dashboard': 'mentorDashboardView',
        'curriculum': 'mentorCurriculumView',
        'approvals': 'mentorApprovalsView',
        'students': 'mentorStudentsView',
        'community': 'mentorCommunityView'
      };
      const targetView = viewMap[tab] || 'mentorDashboardView';
      const targetPath = viewMap[tab] ? path : '/mentor/dashboard';
      showMentorPortal(targetView, targetPath);
      return;
    }
    if (path === '/student/dashboard') {
      showStudentPortal('studentDashboardView', '/student/dashboard');
      return;
    }
    if (path === '/student/curriculum') {
      showStudentPortal('studentCurriculumView', '/student/curriculum');
      return;
    }
    if (path === '/student/subjects') {
      showStudentPortal('studentSubjectsView', '/student/subjects');
      return;
    }
    if (path === '/student/assignments') {
      showStudentPortal('studentAssignmentsView', '/student/assignments');
      return;
    }
    if (path === '/student/activities') {
      showStudentPortal('studentActivitiesView', '/student/activities');
      return;
    }
    if (path === '/student/resources') {
      showStudentPortal('studentResourcesView', '/student/resources');
      return;
    }
    if (path === '/student/attendance') {
      showStudentPortal('studentAttendanceView', '/student/attendance');
      return;
    }
    if (path === '/student/progress') {
      showStudentPortal('studentProgressView', '/student/progress');
      return;
    }
    if (path === '/student/ai') {
      showStudentPortal('studentDashboardView', '/student/dashboard');
      return;
    }
    if (path === '/student/announcements') {
      showStudentPortal('studentAnnouncementsView', '/student/announcements');
      return;
    }
    if (path === '/student/profile') {
      showStudentPortal('studentProfileView', '/student/profile');
      return;
    }
    if (path === '/student/learning' || path.startsWith('/grade-')) {
      showStudentPortal('studentLearningPageWrapper', path);
      const route = getRouteInfo();
      let targetGradeNum = route ? route.gradeNum : 3;
      let targetDayNum = route ? route.classDayNum : 1;
      let targetGrade = COURSES_DATA.grades ? COURSES_DATA.grades.find(g => g.gradeNumber === targetGradeNum) : null;
      if (!targetGrade && COURSES_DATA.grades && COURSES_DATA.grades.length > 0) {
        targetGrade = COURSES_DATA.grades[0];
      }
      if (targetGrade && targetGrade.chapters && targetGrade.chapters.length > 0) {
        const firstChapter = targetGrade.chapters[0];
        COURSES_DATA.classes = firstChapter.classes;
        COURSES_DATA.currentGradeNumber = targetGradeNum;
        const targetClass = firstChapter.classes.find(c => c.dayNumber === targetDayNum) || firstChapter.classes[0];
        loadClassView(targetClass.id, false);
      }
      return;
    }

    // Default route: Base44 Login Page
    showAuthPage('loginRoleSelectPage', '/login');
  }

  // 1. App Initialization & Real-Time Admin Sync
  function init() {
    setupViewSwitching();
    setupStepActions();
    setupFileUpload();

    // Listen for browser Back / Forward & Hash navigation
    window.addEventListener('popstate', () => {
      handleCurrentRoute();
    });
    window.addEventListener('hashchange', () => {
      handleCurrentRoute();
    });

    // Handle initial route parsing
    handleCurrentRoute();

    if (typeof window.renderMentorCurriculumGrid === 'function') {
      window.renderMentorCurriculumGrid();
    }

    // Initial Sync & Real-Time Polling Engine (3s interval + storage events)
    syncWithBackend();
    setInterval(syncWithBackend, 3000);
    window.addEventListener('storage', syncWithBackend);
  }

  // Real-Time Sync Engine with Backend Database & Admin Portal
  async function syncWithBackend() {
    const apiBase = window.API_BASE_URL || 'http://localhost:8080/api/v1';
    try {
      const res = await fetch(`${apiBase}/admin/courses`);
      if (res.ok) {
        const adminCourses = await res.json();
        if (Array.isArray(adminCourses)) {
          adminCourses.forEach(course => {
            if (course.chapters && COURSES_DATA.grades) {
              const targetGrade = COURSES_DATA.grades.find(g => g.gradeNumber === course.gradeNumber);
              if (targetGrade && targetGrade.chapters) {
                course.chapters.forEach(adminChap => {
                  const localChap = targetGrade.chapters.find(c => c.chapterNumber === adminChap.chapterNumber);
                  if (localChap) {
                    localChap.isLockedByAdmin = adminChap.isLocked;
                  }
                });
              }
            }
          });
        }
      }
    } catch (e) {
      // Fallback local storage check
    }

    try {
      const subsData = localStorage.getItem('lms_admin_submissions');
      if (subsData) {
        const submissions = JSON.parse(subsData);
        if (Array.isArray(submissions) && submissions.length > 0) {
          const currentClassObj = COURSES_DATA.classes ? COURSES_DATA.classes.find(c => c.id === state.currentClassId) : null;
          const matchedSub = submissions.find(s => 
            s.gradeNumber === COURSES_DATA.currentGradeNumber ||
            (currentClassObj && s.topicTitle && s.topicTitle.includes(currentClassObj.title))
          );

          if (matchedSub && elements.submissionStatusBox && !elements.submissionStatusBox.classList.contains('hidden')) {
            if (matchedSub.status === 'GRADED' || matchedSub.status === 'REVIEWED') {
              elements.submissionStatusBox.className = 'badge badge-success';
              elements.submissionMetaText.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>GRADED & APPROVED BY ADMIN</strong> (Score: ${matchedSub.score || 100}%) — <em>${matchedSub.feedback || 'Excellent submission!'}</em>`;
            } else if (matchedSub.status === 'REJECTED') {
              elements.submissionStatusBox.className = 'badge badge-rejected';
              elements.submissionMetaText.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <strong>REJECTED BY ADMIN</strong> — <em>${matchedSub.feedback || 'Please resubmit your worksheet.'}</em>`;
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 2. Load Class View Dynamically from COURSES_DATA JSON
  function loadClassView(classId, updateHistory = true) {
    const classData = COURSES_DATA.classes.find(c => c.id === classId);
    if (!classData) return;

    state.currentClassId = classId;
    state.currentView = 'learning';

    // Update Hero Header
    elements.activeDayBadge.textContent = `Class ${classData.dayNumber} of ${COURSES_DATA.classes.length}`;
    elements.classTopicTitle.textContent = classData.title;
    elements.classTopicDescription.textContent = classData.description;

    // Step 1: Video — ensure enablejsapi=1 & origin are always present for YT IFrame API
    elements.step1Title.textContent = classData.steps.step1Video.title;
    elements.step1Desc.textContent = classData.steps.step1Video.description;
    let videoUrl = classData.steps.step1Video.videoUrl || '';
    if (videoUrl) {
      const sep = videoUrl.includes('?') ? '&' : '?';
      if (!videoUrl.includes('enablejsapi')) videoUrl += sep + 'enablejsapi=1';
      if (!videoUrl.includes('origin')) videoUrl += '&origin=' + encodeURIComponent(window.location.origin);
    }
    elements.youtubeIframe.src = videoUrl;

    // Step 2: Topics PDF
    elements.step2Title.textContent = classData.steps.step2TopicPdf.title;
    elements.step2Desc.textContent = classData.steps.step2TopicPdf.description;
    elements.topicPdfTitle.textContent = classData.steps.step2TopicPdf.fileName;
    elements.linkTopicPdf.href = classData.steps.step2TopicPdf.pdfUrl;

    elements.keyConceptsList.innerHTML = classData.steps.step2TopicPdf.keyConcepts
      .map(concept => `<li><i class="fa-solid fa-check text-blue"></i> ${concept}</li>`)
      .join('');

    // Step 3: Website Activity
    elements.step3Title.textContent = classData.steps.step3Website.title;
    elements.step3Desc.textContent = classData.steps.step3Website.description;
    elements.portalNameText.textContent = classData.steps.step3Website.portalName;
    elements.websiteUrlText.textContent = classData.steps.step3Website.websiteUrl;
    elements.linkWebsite.href = classData.steps.step3Website.websiteUrl;

    // Step 4: Quiz
    elements.step4Title.textContent = classData.steps.step4Quiz.title;
    elements.step4Desc.innerHTML = `Test your knowledge. Passing score is <strong>${classData.steps.step4Quiz.passingScorePercent}%</strong>.`;
    const quizList = (classData.steps.step4Quiz.questions && classData.steps.step4Quiz.questions.length > 0)
      ? classData.steps.step4Quiz.questions
      : (classData.steps.step4Quiz.question ? [{ id: 1, question: classData.steps.step4Quiz.question, options: classData.steps.step4Quiz.options }] : []);
    renderQuizQuestions(quizList);

    // Step 5: Practical Task
    elements.step5Title.textContent = classData.steps.step5Task.title;
    elements.step5Desc.textContent = classData.steps.step5Task.description;
    elements.taskInstructionsText.textContent = classData.steps.step5Task.instructions;
    elements.linkPracticalPdf.href = classData.steps.step5Task.pdfUrl;

    // Reset / Restore Step UI Statuses for this Class
    // Also clear any active website countdown from a previous class
    if (state.websiteCountdownTimer) {
      clearInterval(state.websiteCountdownTimer);
      state.websiteCountdownTimer = null;
    }
    restoreClassStepUIState(classId);

    // Render Sidebar Navigation & Assets
    renderSidebarClassList();
    renderSidebarAssets();
    updateProgressUI();

    // Show Learning Page View
    elements.courseOverviewPage.classList.add('hidden');
    elements.classLearningPage.classList.remove('hidden');

    // Update URL Route
    if (updateHistory) {
      updateURLRoute(COURSES_DATA.currentGradeNumber, 1, classData.dayNumber, false);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 3. Render 5 Quiz Questions Dynamically per Class
  function renderQuizQuestions(questions) {
    state.selectedQuizAnswers = {};
    if (!elements.quizQuestionsContainer) return;

    if (!Array.isArray(questions) || questions.length === 0) {
      elements.quizQuestionsContainer.innerHTML = `<p class="text-muted">No quiz questions available for this class.</p>`;
      return;
    }

    elements.quizQuestionsContainer.innerHTML = questions.map((q, qIdx) => `
      <div class="quiz-question-card" id="quizQuestionCard_${qIdx}">
        <span class="question-num"><i class="fa-solid fa-circle-question"></i> Question ${qIdx + 1} of ${questions.length}</span>
        <h4 class="question-text">${q.question}</h4>
        <div class="quiz-options-group">
          ${q.options.map(opt => `
            <label class="option-pill" data-q-index="${qIdx}" data-option-id="${opt.id}">
              <input type="radio" name="quiz_q_${qIdx}" value="${opt.id}">
              <span class="radio-custom"></span>
              <span class="option-label">${opt.text}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Attach option pill selection listeners per question
    const cards = elements.quizQuestionsContainer.querySelectorAll('.quiz-question-card');
    cards.forEach((card, qIdx) => {
      const pills = card.querySelectorAll('.option-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          const radio = pill.querySelector('input[type="radio"]');
          if (radio) {
            radio.checked = true;
            state.selectedQuizAnswers[qIdx] = parseInt(radio.value);
            card.classList.remove('unanswered-warning');
            updatePrerequisiteButtons();
          }
        });
      });
    });
  }

  // 4. Render Course Overview Page (Grid of All Classes)
  function showCourseOverviewPage(updateHistory = true) {
    state.currentView = 'overview';
    elements.classLearningPage.classList.add('hidden');
    elements.courseOverviewPage.classList.remove('hidden');

    elements.courseClassesGrid.innerHTML = COURSES_DATA.classes.map(c => {
      const isUnlocked = state.unlockedClassIds.includes(c.id);
      const isCompleted = isClass100PercentCompleted(c.id);

      let statusBadge = '<span class="status-pill status-locked"><i class="fa-solid fa-lock"></i> Locked by Admin</span>';
      if (isCompleted) {
        statusBadge = '<span class="status-pill status-completed"><i class="fa-solid fa-circle-check"></i> Completed</span>';
      } else if (isUnlocked) {
        statusBadge = '<span class="status-pill status-unlocked"><i class="fa-solid fa-lock-open"></i> Unlocked</span>';
      }

      let btnActionHtml = `<button class="btn btn-sm btn-outline" disabled><i class="fa-solid fa-lock"></i> Locked</button>`;
      if (isUnlocked) {
        btnActionHtml = `<button class="btn btn-sm btn-primary btn-open-class" data-class-id="${c.id}"><i class="fa-solid fa-arrow-right"></i> Open Class Page</button>`;
      }

      return `
        <div class="class-overview-card ${isUnlocked ? '' : 'locked'}">
          <div class="class-card-header">
            <span class="class-card-number">Class ${c.dayNumber} of ${COURSES_DATA.classes.length}</span>
            ${statusBadge}
          </div>
          <div class="class-card-body">
            <h3>${c.title}</h3>
            <p>${c.description}</p>
          </div>
          <div class="class-card-footer">
            <span class="badge badge-neutral"><i class="fa-solid fa-list-check"></i> 5 Steps</span>
            ${btnActionHtml}
          </div>
        </div>
      `;
    }).join('');

    const openBtns = elements.courseClassesGrid.querySelectorAll('.btn-open-class');
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const classId = parseInt(e.currentTarget.getAttribute('data-class-id'));
        loadClassView(classId);
      });
    });

    if (updateHistory) {
      updateURLRoute(COURSES_DATA.currentGradeNumber, 1, 1, true);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 5. Sidebar Class List Rendering
  function renderSidebarClassList() {
    elements.sidebarClassNavList.innerHTML = COURSES_DATA.classes.map(c => {
      const isUnlocked = state.unlockedClassIds.includes(c.id);
      const isActive = c.id === state.currentClassId;
      const isCompleted = isClass100PercentCompleted(c.id);

      let statusPill = `<span class="status-pill status-locked"><i class="fa-solid fa-lock"></i> Locked</span>`;
      if (isCompleted) {
        statusPill = `<span class="status-pill status-completed"><i class="fa-solid fa-circle-check"></i> Finished</span>`;
      } else if (isActive) {
        statusPill = `<span class="status-pill status-unlocked"><i class="fa-solid fa-lock-open"></i> Active Now</span>`;
      } else if (isUnlocked) {
        statusPill = `<span class="status-pill status-unlocked"><i class="fa-solid fa-unlock"></i> Ready</span>`;
      }

      return `
        <div class="class-nav-item ${isActive ? 'active' : ''} ${isUnlocked ? '' : 'locked'}" data-class-id="${c.id}">
          <div class="nav-item-status">
            <span class="nav-day-num">${c.dayNumber}</span>
          </div>
          <div class="nav-item-info">
            <h4>Class ${c.dayNumber}: ${c.title.split(':')[1] ? c.title.split(':')[1].trim() : c.title}</h4>
            ${statusPill}
          </div>
          <i class="fa-solid ${isUnlocked ? 'fa-chevron-right nav-arrow' : 'fa-lock nav-lock-icon'}"></i>
        </div>
      `;
    }).join('');

    const navItems = elements.sidebarClassNavList.querySelectorAll('.class-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const classId = parseInt(item.getAttribute('data-class-id'));
        const isUnlocked = state.unlockedClassIds.includes(classId);

        if (!isUnlocked) {
          showToast(`ACCESS_DENIED: Class is locked by Admin / Teacher!`, 'error');
        } else {
          loadClassView(classId);
        }
      });
    });
  }

  // 6. Sidebar Quick Assets
  function renderSidebarAssets() {
    const classData = COURSES_DATA.classes.find(c => c.id === state.currentClassId);
    if (!classData) return;

    elements.sidebarAssetsList.innerHTML = `
      <a href="${classData.steps.step2TopicPdf.pdfUrl}" target="_blank" class="asset-link">
        <i class="fa-solid fa-file-pdf text-red"></i>
        <span>Class ${classData.dayNumber} Topics Covered (PDF)</span>
      </a>
      <a href="${classData.steps.step5Task.pdfUrl}" target="_blank" class="asset-link">
        <i class="fa-solid fa-file-pdf text-blue"></i>
        <span>Class ${classData.dayNumber} Practical Worksheet (PDF)</span>
      </a>
      <a href="/asset/5th class/chapter 1/CLASSES COVERED.pdf" target="_blank" class="asset-link">
        <i class="fa-solid fa-file-pdf text-green"></i>
        <span>Chapter Syllabus & Overview</span>
      </a>
    `;
  }

  // 7. Setup View Switch Events & Grade Switching
  function setupViewSwitching() {
    // 1. Role Selection Clicks
    document.getElementById('cardStudentRole')?.addEventListener('click', () => {
      showAuthPage('studentSignInPage', '/login/student');
    });

    document.getElementById('cardMentorRole')?.addEventListener('click', () => {
      showAuthPage('mentorSignInPage', '/login/mentor');
    });

    document.getElementById('btnBackFromStudentSignIn')?.addEventListener('click', () => {
      showAuthPage('loginRoleSelectPage', '/login');
    });

    document.getElementById('btnBackToRoleSelect')?.addEventListener('click', () => {
      showAuthPage('loginRoleSelectPage', '/login');
    });

    // 2. Auth Links (Sign-In <-> Register)
    document.getElementById('btnLinkGoToRegister')?.addEventListener('click', (e) => {
      e.preventDefault();
      showAuthPage('registerPage', '/register');
    });

    document.getElementById('btnLinkGoToSignIn')?.addEventListener('click', (e) => {
      e.preventDefault();
      showAuthPage('studentSignInPage', '/login/student');
    });

    document.getElementById('btnLinkGoToSignInParent')?.addEventListener('click', (e) => {
      e.preventDefault();
      showAuthPage('studentSignInPage', '/login/student');
    });

    // 3. Registration Role Toggle Tabs (I am a student / I am a parent)
    const tabStudent = document.getElementById('tabStudentRole');
    const tabParent = document.getElementById('tabParentRole');
    const formStudent = document.getElementById('studentRegisterForm');
    const formParent = document.getElementById('parentRegisterForm');

    tabStudent?.addEventListener('click', () => {
      tabStudent.classList.add('active');
      tabParent?.classList.remove('active');
      formStudent?.classList.remove('hidden');
      formParent?.classList.add('hidden');
    });

    tabParent?.addEventListener('click', () => {
      tabParent.classList.add('active');
      tabStudent?.classList.remove('active');
      formParent?.classList.remove('hidden');
      formStudent?.classList.add('hidden');
    });

    // Student Registration Submission
    document.getElementById('studentRegisterForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('studentFullName')?.value.trim() || 'New Student';
      const email = document.getElementById('studentRegEmail')?.value.trim() || `student_${Date.now()}@school.com`;
      const grade = document.getElementById('studentGradeSelect')?.value || 'Grade 4';

      const queue = getApprovalQueue();
      const newAcc = {
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        role: 'Student',
        grade: grade,
        registeredAt: 'Just now',
        status: 'PENDING'
      };

      queue.unshift(newAcc);
      saveApprovalQueue(queue);

      localStorage.setItem('lms_current_user_email', email);
      showToast('Registration submitted! Awaiting mentor approval.', 'info');
      checkStudentApprovalStatus(email);
    });

    // Parent Registration Submission
    document.getElementById('parentRegisterForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('parentFullName')?.value.trim() || 'New Parent';
      const email = document.getElementById('parentRegEmail')?.value.trim() || `parent_${Date.now()}@school.com`;

      const queue = getApprovalQueue();
      const newAcc = {
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        role: 'Parent',
        grade: 'Grade 3',
        registeredAt: 'Just now',
        status: 'PENDING'
      };

      queue.unshift(newAcc);
      saveApprovalQueue(queue);

      localStorage.setItem('lms_current_user_email', email);
      showToast('Registration submitted! Awaiting mentor approval.', 'info');
      checkStudentApprovalStatus(email);
    });

    // 4. Student & Parent Sign-In Submission (Auto-Connect Backend API)
    document.getElementById('studentLoginForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('studentSignInEmail')?.value.trim();
      const password = document.getElementById('studentSignInPassword')?.value.trim();

      if (email) {
        localStorage.setItem('lms_current_user_email', email);
        const isApproved = checkStudentApprovalStatus(email);
        if (!isApproved) {
          return; // Blocked at Pending Modal Dialog (Image 2)
        }
      }

      showToast('Connecting to backend API...', 'info');
      const authData = await loginWithBackend(email, password);

      if (authData && authData.fullName) {
        const nameDisplay = document.getElementById('studentUserName');
        const nameBanner = document.getElementById('bannerStudentName');
        if (nameDisplay) nameDisplay.textContent = authData.fullName;
        if (nameBanner) nameBanner.textContent = authData.fullName;
      }

      // Load real grade data from backend after login
      loadStudentGradeFromBackend().then(gradeData => {
        if (gradeData) {
          console.log('[LMS] Loaded student grade from backend:', gradeData.name, 'Grade', gradeData.gradeNumber);
        }
      });

      showStudentPortal('studentDashboardView', '/student/dashboard');
      showToast(`Welcome back${authData && authData.fullName ? ', ' + authData.fullName : ''}!`, 'success');
    });


    // Pending Approval Modal Refresh & Logout Handlers (Image 2 UI)
    document.getElementById('btnRefreshPendingStatus')?.addEventListener('click', () => {
      const activeEmail = localStorage.getItem('lms_current_user_email') || 'student_new@school.com';
      const isApproved = checkStudentApprovalStatus(activeEmail);

      if (isApproved) {
        showStudentPortal('studentDashboardView', '/student/dashboard');
        showToast('🎉 Account Approved! Welcome to Engloray Learning.', 'success');
      } else {
        showToast('⏳ Account is still pending Mentor approval.', 'info');
      }
    });

    document.getElementById('btnLogoutPendingAccount')?.addEventListener('click', () => {
      const modal = document.getElementById('modalPendingApproval');
      if (modal) modal.classList.add('hidden');
      showAuthPage('studentSignInPage', '/login/student');
    });

    document.getElementById('btnStudentGoogleSignIn')?.addEventListener('click', () => {
      showStudentPortal('studentDashboardView', '/student/dashboard');
      showToast('Signed in with Google!', 'success');
    });

    // 5. Mentor Sign-In Submission
    document.getElementById('mentorLoginForm')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('mentorEmailInput')?.value.trim();
      const password = document.getElementById('mentorPasswordInput')?.value.trim();

      await loginWithBackend(email, password);
      showMentorPortal('mentorDashboardView', '/mentor/dashboard');
      showToast('Welcome back, Sri (Mentor)!', 'success');
    });

    document.getElementById('btnGoogleSignIn')?.addEventListener('click', () => {
      showMentorPortal('mentorDashboardView', '/mentor/dashboard');
      showToast('Signed in with Google as Mentor!', 'success');
    });

    // Mentor Sidebar Nav Items
    const mentorNavLinks = document.querySelectorAll('#mentorDashboardPage .sidebar-nav .nav-link');
    mentorNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        mentorNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const tab = link.getAttribute('data-mentor-tab');
        const viewMap = {
          'dashboard': 'mentorDashboardView',
          'curriculum': 'mentorCurriculumView',
          'approvals': 'mentorApprovalsView',
          'students': 'mentorStudentsView',
          'classes': 'mentorClassesView',
          'assignments': 'mentorAssignmentsView',
          'activities': 'mentorActivitiesView',
          'resources': 'mentorResourcesView',
          'attendance': 'mentorAttendanceView',
          'certificates': 'mentorCertificatesView',
          'community': 'mentorCommunityView',
          'analytics': 'mentorAnalyticsView'
        };

        const targetView = viewMap[tab] || 'mentorGenericView';
        showMentorPortal(targetView, `/mentor/${tab}`);
      });
    });

    // Open Approval Queue link on Dashboard
    document.getElementById('linkOpenApprovalQueue')?.addEventListener('click', (e) => {
      e.preventDefault();
      showMentorPortal('mentorApprovalsView', '/mentor/approvals');
    });

    // Curriculum Flow Builder Modal Handler for Mentor Portal (Class -> Course -> Term -> Chapter -> Lessons)
    const btnNewClassMentor = document.getElementById('btnNewClassMentor');
    const modalCurriculumBuilder = document.getElementById('modalCurriculumBuilder');
    const btnCloseCurriculumModal = document.getElementById('btnCloseCurriculumBuilderModal');
    const btnCancelCurriculumModal = document.getElementById('btnCancelCurriculumModal');
    const formCurriculumBuilder = document.getElementById('formCurriculumBuilder');

    window.openCurriculumBuilderModal = function (defaultData = null) {
      if (!modalCurriculumBuilder) return;
      modalCurriculumBuilder.classList.remove('hidden');

      if (defaultData) {
        document.getElementById('curriculumInputClassName').value = defaultData.className || 'CLASS 4th';
        document.getElementById('curriculumInputGradeNum').value = defaultData.gradeNum || '4';
        document.getElementById('curriculumInputCourseName').value = defaultData.courseName || 'Computer Hardware & Applications';
        document.getElementById('curriculumInputCourseDesc').value = defaultData.courseDesc || 'Hardware devices, internal components & computer maintenance';
        document.getElementById('curriculumInputTermNum').value = defaultData.termNum || '1';
        document.getElementById('curriculumInputTermName').value = defaultData.termName || 'Term 1: Hardware & System Basics';
        document.getElementById('curriculumInputChapTitle').value = defaultData.chapTitle || 'Chapter 1: Computer Fundamentals & Hardware';
        document.getElementById('curriculumInputChapDesc').value = defaultData.chapDesc || 'Understanding input, output, CPU and storage devices';
        document.getElementById('curriculumInputLessonTitle').value = defaultData.lessonTitle || 'Class 1: Hardware Devices & System';
        document.getElementById('curriculumInputLessonDesc').value = defaultData.lessonDesc || 'Introduction to internal and external computer hardware';
        document.getElementById('curriculumInputVideoUrl').value = defaultData.videoUrl || 'https://www.youtube.com/embed/Iv8X7aLikLE';
        document.getElementById('curriculumInputPdfUrl').value = defaultData.pdfUrl || 'TOPIC COVERED.pdf';
        document.getElementById('curriculumInputActivityUrl').value = defaultData.activityUrl || 'https://www.geeksforgeeks.org/computer-science-fundamentals/computer-fundamentals-tutorial/';
        document.getElementById('curriculumInputQuizQ').value = defaultData.quizQ || 'Which component is considered internal hardware?';
        document.getElementById('curriculumInputTaskTitle').value = defaultData.taskTitle || 'Class 1: Hardware Identification Worksheet';
      }
    };

    window.closeCurriculumBuilderModal = function () {
      if (modalCurriculumBuilder) modalCurriculumBuilder.classList.add('hidden');
    };

    if (btnNewClassMentor) {
      btnNewClassMentor.onclick = () => window.openCurriculumBuilderModal();
    }
    if (btnCloseCurriculumModal) {
      btnCloseCurriculumModal.onclick = () => window.closeCurriculumBuilderModal();
    }
    if (btnCancelCurriculumModal) {
      btnCancelCurriculumModal.onclick = () => window.closeCurriculumBuilderModal();
    }

    if (formCurriculumBuilder) {
      formCurriculumBuilder.onsubmit = function (e) {
        e.preventDefault();

        const className = document.getElementById('curriculumInputClassName').value.trim();
        const gradeNum = parseInt(document.getElementById('curriculumInputGradeNum').value);
        const courseName = document.getElementById('curriculumInputCourseName').value.trim();
        const courseDesc = document.getElementById('curriculumInputCourseDesc').value.trim();
        const termNum = parseInt(document.getElementById('curriculumInputTermNum').value);
        const termName = document.getElementById('curriculumInputTermName').value.trim();
        const chapTitle = document.getElementById('curriculumInputChapTitle').value.trim();
        const chapDesc = document.getElementById('curriculumInputChapDesc').value.trim();
        const lessonTitle = document.getElementById('curriculumInputLessonTitle').value.trim();
        const lessonDesc = document.getElementById('curriculumInputLessonDesc').value.trim();
        const videoUrl = document.getElementById('curriculumInputVideoUrl').value.trim();
        const pdfUrl = document.getElementById('curriculumInputPdfUrl').value.trim();
        const activityUrl = document.getElementById('curriculumInputActivityUrl').value.trim();
        const quizQ = document.getElementById('curriculumInputQuizQ').value.trim();
        const taskTitle = document.getElementById('curriculumInputTaskTitle').value.trim();

        // 1. Update / Create Grade in COURSES_DATA.grades
        let gradeObj = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades) ? COURSES_DATA.grades.find(g => g.gradeNumber === gradeNum) : null;
        if (!gradeObj) {
          gradeObj = {
            gradeNumber: gradeNum,
            gradeName: `Grade ${gradeNum}`,
            chapters: []
          };
          if (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades) COURSES_DATA.grades.push(gradeObj);
        }

        let chapterObj = gradeObj ? gradeObj.chapters.find(c => c.chapterNumber === 1) : null;
        if (!chapterObj && gradeObj) {
          chapterObj = {
            chapterNumber: 1,
            chapterTitle: chapTitle || `Chapter 1: ${courseName}`,
            description: chapDesc || 'Topics and activities scheduled by mentor.',
            classes: []
          };
          gradeObj.chapters.push(chapterObj);
        } else if (chapterObj) {
          chapterObj.chapterTitle = chapTitle;
          chapterObj.description = chapDesc;
        }

        // Add Daily Class Lesson
        const newClassObj = {
          id: Date.now(),
          dayNumber: (chapterObj && chapterObj.classes ? chapterObj.classes.length + 1 : 1),
          title: lessonTitle,
          description: lessonDesc,
          isUnlockedByAdmin: true,
          steps: {
            step1Video: {
              title: "Step 1: Watch Class Video",
              description: "Watch lesson video assigned by mentor.",
              videoUrl: videoUrl || "https://www.youtube.com/embed/Iv8X7aLikLE"
            },
            step2TopicPdf: {
              title: "Step 2: Review Topics Covered",
              description: "Read detailed topic documentation.",
              pdfUrl: pdfUrl || "TOPIC COVERED.pdf",
              fileName: "TOPIC COVERED.pdf",
              keyConcepts: [lessonDesc || "Master core concepts."]
            },
            step3Website: {
              title: "Step 3: Interactive Learning Activity",
              description: "Explore interactive portal for hands-on practice.",
              websiteUrl: activityUrl || "https://www.geeksforgeeks.org/",
              portalName: "Interactive Educational Portal"
            },
            step4Quiz: {
              title: "Step 4: Concept Check Quiz",
              description: "Test your understanding of the topic.",
              passingScorePercent: 80,
              question: quizQ || "1. Concept quiz question",
              options: [
                { id: 1, text: "Correct Answer", isCorrect: true },
                { id: 2, text: "Option B", isCorrect: false },
                { id: 3, text: "Option C", isCorrect: false }
              ],
              questions: [
                {
                  id: 1,
                  question: quizQ || "1. Concept quiz question",
                  options: [
                    { id: 1, text: "Correct Answer", isCorrect: true },
                    { id: 2, text: "Option B", isCorrect: false },
                    { id: 3, text: "Option C", isCorrect: false }
                  ]
                }
              ]
            },
            step5Task: {
              title: "Step 5: Practical Activity & Task Submission",
              description: "Complete practical worksheet and submit your work.",
              instructions: taskTitle || "Class Practical Activity Worksheet",
              pdfUrl: pdfUrl || "practical activities.pdf",
              fileName: "practical activities.pdf"
            }
          }
        };

        if (chapterObj) {
          if (!chapterObj.classes) chapterObj.classes = [];
          chapterObj.classes.push(newClassObj);
        }

        // Save to publishedClasses state
        const publishedList = getPublishedClasses();
        const existingIdx = publishedList.findIndex(c => c.gradeNum === gradeNum);
        const classRecord = {
          id: 'class_' + gradeNum,
          className: className || `CLASS ${gradeNum}rd`,
          gradeNum: gradeNum,
          courseName: courseName || 'Computer Skills',
          courseDesc: courseDesc,
          termNum: termNum || 1,
          termName: termName || 'Term 1',
          chapTitle: chapTitle || 'Chapter 1',
          chapDesc: chapDesc,
          lessonTitle: lessonTitle,
          isUnlocked: true,
          publishedAt: Date.now()
        };

        if (existingIdx >= 0) {
          publishedList[existingIdx] = classRecord;
        } else {
          publishedList.push(classRecord);
        }
        savePublishedClasses(publishedList);

        // Render Mentor Grid
        if (typeof window.renderMentorCurriculumGrid === 'function') {
          window.renderMentorCurriculumGrid();
        }

        // Immediately Sync to Student & Parent View
        if (typeof window.renderStudentSubjectsView === 'function') {
          window.renderStudentSubjectsView(gradeNum, 'lessons');
        }

        window.closeCurriculumBuilderModal();
        showToast(`🎉 Published ${className} Flow (${courseName} &rarr; ${termName} &rarr; ${chapTitle}) live to Grade ${gradeNum} Students!`, 'success');
      };
    }

    // Add Class Form Submission (Classes View - Image 5)
    document.getElementById('addClassForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const className = document.getElementById('newClassNameInput')?.value.trim();
      const instName = document.getElementById('newClassInstInput')?.value.trim() || 'GREEN PARK SCHOOL';
      const container = document.getElementById('mentorClassesList');
      if (className && container) {
        const card = document.createElement('div');
        card.className = 'node-card class-item-card';
        card.innerHTML = `
          <div class="class-card-text">
            <h3 class="node-title">${className}</h3>
            <p class="node-subtext">${instName} &bull; &mdash;</p>
          </div>
          <button type="button" class="btn-node-icon text-danger" title="Delete class" onclick="this.closest('.node-card').remove();">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        `;
        container.appendChild(card);
        document.getElementById('addClassForm')?.reset();
        showToast(`Added new class: ${className}`, 'success');
      }
    });

    // Search Students & Parents Input Filter (Image 2)
    document.getElementById('searchStudentsInput')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('#mentorStudentsTableBody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });

    // 6. Registration Form Submissions (Auto-Connect Backend API)
    formStudent?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('regStudentName')?.value.trim();
      const email = document.getElementById('regStudentEmail')?.value.trim();
      const password = document.getElementById('regStudentPassword')?.value.trim();
      const confirmPassword = document.getElementById('regStudentConfirmPassword')?.value.trim();
      const grade = parseInt(document.getElementById('regStudentGrade')?.value || '3');

      if (password !== confirmPassword) {
        showToast('Passwords do not match. Please try again.', 'error');
        return;
      }

      showToast('Registering student account...', 'info');
      await signupWithBackend({
        email,
        password,
        fullName: name,
        role: 'ROLE_STUDENT',
        gradeNumber: grade
      });

      showToast('Account created successfully! Please sign in.', 'success');
      showAuthPage('studentSignInPage', '/login/student');
    });

    formParent?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('regParentName')?.value.trim();
      const email = document.getElementById('regParentEmail')?.value.trim();
      const password = document.getElementById('regParentPassword')?.value.trim();
      const confirmPassword = document.getElementById('regParentConfirmPassword')?.value.trim();

      if (password !== confirmPassword) {
        showToast('Passwords do not match. Please try again.', 'error');
        return;
      }

      showToast('Registering parent account...', 'info');
      await signupWithBackend({
        email,
        password,
        fullName: name,
        role: 'ROLE_PARENT',
        gradeNumber: 3
      });

      showToast('Parent account created! Pending mentor approval.', 'success');
      showAuthPage('studentSignInPage', '/login/student');
    });

    document.getElementById('btnRegisterGoogleSignIn')?.addEventListener('click', () => {
      showStudentPortal('studentDashboardView', '/student/dashboard');
      showToast('Signed up with Google!', 'success');
    });

    // 7. Logout Buttons
    document.getElementById('btnMentorLogout')?.addEventListener('click', () => {
      localStorage.removeItem('lms_token');
      localStorage.removeItem('lms_user');
      showAuthPage('loginRoleSelectPage', '/login');
      showToast('Signed out of Mentor portal', 'info');
    });

    document.getElementById('btnStudentLogout')?.addEventListener('click', () => {
      localStorage.removeItem('lms_token');
      localStorage.removeItem('lms_user');
      showAuthPage('loginRoleSelectPage', '/login');
      showToast('Signed out of Student portal', 'info');
    });

    // 8. Student Sidebar Nav Items
    const studentNavLinks = document.querySelectorAll('#studentPortalLayout .sidebar-nav .nav-link');
    studentNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-student-tab');
        const viewMap = {
          'dashboard': { view: 'studentDashboardView', path: '/student/dashboard' },
          'curriculum': { view: 'studentCurriculumView', path: '/student/curriculum' },
          'subjects': { view: 'studentSubjectsView', path: '/student/subjects' },
          'assignments': { view: 'studentAssignmentsView', path: '/student/assignments' },
          'activities': { view: 'studentActivitiesView', path: '/student/activities' },
          'resources': { view: 'studentResourcesView', path: '/student/resources' },
          'attendance': { view: 'studentAttendanceView', path: '/student/attendance' },
          'progress': { view: 'studentProgressView', path: '/student/progress' },
          'announcements': { view: 'studentAnnouncementsView', path: '/student/announcements' },
          'community': { view: 'studentCommunityView', path: '/student/community' },
          'profile': { view: 'studentProfileView', path: '/student/profile' }
        };

        const target = viewMap[tab] || { view: 'studentDashboardView', path: '/student/dashboard' };
        showStudentPortal(target.view, target.path);
      });
    });

    // 9. Student Curriculum Builder Drilldown Engine (Class -> Course -> Term -> Chapter -> Lessons/Activities)
    window.initStudentCurriculumExplorer = function (gradeNum = 3) {
      studentCurriculumState.selectedGradeNumber = gradeNum;
      renderStudentCurriculumBreadcrumbs();
      renderStudentCurriculumContent();
    };

    // 10. AI Assistant Interactive Chat Handler
    document.getElementById('aiChatForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('aiQueryInput');
      const messagesBox = document.getElementById('aiChatMessages');
      const query = input?.value.trim();
      if (!query || !messagesBox) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user-msg';
      userMsg.innerHTML = `<div class="msg-bubble">${query}</div>`;
      messagesBox.appendChild(userMsg);

      input.value = '';
      messagesBox.scrollTop = messagesBox.scrollHeight;

      // Simulate AI response
      setTimeout(() => {
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'chat-message assistant-msg';
        assistantMsg.innerHTML = `
          <div class="assistant-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
          <div class="msg-bubble">Great question! Regarding "${query}", computers use input devices (keyboard, mouse) to receive instructions, process them in the CPU, and present results via output devices (monitor, printer).</div>
        `;
        messagesBox.appendChild(assistantMsg);
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }, 600);
    });

    // 5. Subject Card "class 1" Click -> Opens Modal (Image 4)
    document.getElementById('subjectCardClass1')?.addEventListener('click', () => {
      document.getElementById('studentClassModal')?.classList.remove('hidden');
    });

    // 6. Close Modal Button & Backdrop
    document.getElementById('btnCloseStudentClassModal')?.addEventListener('click', () => {
      document.getElementById('studentClassModal')?.classList.add('hidden');
    });

    document.getElementById('studentClassModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'studentClassModal') {
        document.getElementById('studentClassModal')?.classList.add('hidden');
      }
    });

    // 7. Lesson 1 Button
    document.getElementById('btnLesson1Action')?.addEventListener('click', () => {
      showToast('Lesson 1: ddd loaded', 'info');
    });

    // 8. LESSON 2 BUTTON -> TRIGGERS 5-STEP CLASS LEARNING PAGE (HINT FULFILLED!)
    document.getElementById('btnLesson2Action')?.addEventListener('click', () => {
      document.getElementById('studentClassModal')?.classList.add('hidden');
      showStudentPortal('studentLearningPageWrapper', '/grade-3/chapter-1/class-1');
      loadClassView(6, false);
      showToast('Loaded Lesson 2: computer baiscs', 'success');
    });

    // 9. Back to Subjects & Lessons button inside 5-step view
    elements.btnBackToCourse?.addEventListener('click', () => {
      showStudentPortal('studentSubjectsView', '/student/subjects');
    });

    elements.logoHeaderHome?.addEventListener('click', () => {
      showStudentPortal('studentDashboardView', '/student/dashboard');
    });

    elements.gradeSelectDropdown?.addEventListener('change', (e) => {
      const selectedGrade = parseInt(e.target.value);
      switchGrade(selectedGrade);
    });
  }

  // Switch Active Curriculum Grade & Chapter Dynamically
  function switchGrade(gradeNumber, updateHistory = true) {
    if (!COURSES_DATA.grades) return;
    const targetGrade = COURSES_DATA.grades.find(g => g.gradeNumber === gradeNumber);
    if (!targetGrade || !targetGrade.chapters.length) return;

    const firstChapter = targetGrade.chapters[0];
    COURSES_DATA.classes = firstChapter.classes;
    COURSES_DATA.currentGradeNumber = gradeNumber;

    ensureClass1UnlockedForAllGrades();

    if (elements.gradeDisplayBadge) {
      elements.gradeDisplayBadge.textContent = `Grade ${gradeNumber}`;
    }

    const activeBreadcrumb = document.getElementById('breadcrumbChapterTitle');
    if (activeBreadcrumb) {
      activeBreadcrumb.textContent = firstChapter.chapterTitle;
    }

    const firstClassId = firstChapter.classes[0].id;
    loadClassView(firstClassId, updateHistory);
    showToast(`Switched to ${targetGrade.gradeName} - ${firstChapter.chapterTitle}`, 'success');
  }

  // 8. Dynamic Prerequisite Logic & Step Completion Actions
  function updatePrerequisiteButtons() {
    const classId = state.currentClassId;
    const prereqs = getPrerequisites(classId);
    const completed = state.completedStepsPerClass[classId] || {};

    // Step 1: Video
    if (completed.step1Video) {
      if (elements.btnCompleteStep1) {
        elements.btnCompleteStep1.disabled = false;
        elements.btnCompleteStep1.className = 'btn btn-outline';
        elements.btnCompleteStep1.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 1 Completed';
      }
    } else if (prereqs.videoWatched) {
      if (elements.btnCompleteStep1) {
        elements.btnCompleteStep1.disabled = false;
        elements.btnCompleteStep1.className = 'btn btn-primary';
        elements.btnCompleteStep1.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mark Video as Watched';
      }
    } else {
      if (elements.btnCompleteStep1) {
        elements.btnCompleteStep1.disabled = true;
        elements.btnCompleteStep1.className = 'btn btn-primary';
        elements.btnCompleteStep1.innerHTML = '<i class="fa-solid fa-lock"></i> Mark Video as Watched (Watch Full Video First)';
      }
    }

    // Step 2: PDF Document
    if (completed.step2TopicPdf) {
      if (elements.btnCompleteStep2) {
        elements.btnCompleteStep2.disabled = false;
        elements.btnCompleteStep2.className = 'btn btn-outline';
        elements.btnCompleteStep2.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 2 Completed';
      }
    } else if (prereqs.docOpened) {
      if (elements.btnCompleteStep2) {
        elements.btnCompleteStep2.disabled = false;
        elements.btnCompleteStep2.className = 'btn btn-primary';
        elements.btnCompleteStep2.innerHTML = '<i class="fa-solid fa-book-open-reader"></i> Confirm Topic Reviewed';
      }
    } else {
      if (elements.btnCompleteStep2) {
        elements.btnCompleteStep2.disabled = true;
        elements.btnCompleteStep2.className = 'btn btn-primary';
        elements.btnCompleteStep2.innerHTML = '<i class="fa-solid fa-lock"></i> Confirm Topic Reviewed (Open PDF First)';
      }
    }

    // Step 3: Website Activity
    if (completed.step3Website) {
      if (elements.btnCompleteStep3) {
        elements.btnCompleteStep3.disabled = false;
        elements.btnCompleteStep3.className = 'btn btn-outline';
        elements.btnCompleteStep3.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 3 Completed';
      }
    } else if (prereqs.websiteOpened) {
      if (elements.btnCompleteStep3) {
        elements.btnCompleteStep3.disabled = false;
        elements.btnCompleteStep3.className = 'btn btn-primary';
        elements.btnCompleteStep3.innerHTML = '<i class="fa-solid fa-square-check"></i> Mark Activity Complete';
      }
    } else {
      if (elements.btnCompleteStep3) {
        elements.btnCompleteStep3.disabled = true;
        elements.btnCompleteStep3.className = 'btn btn-primary';
        elements.btnCompleteStep3.innerHTML = '<i class="fa-solid fa-lock"></i> Mark Activity Complete (Launch Portal First)';
      }
    }

    // Step 4: Quiz
    const classData = COURSES_DATA.classes ? COURSES_DATA.classes.find(c => c.id === classId) : null;
    const questions = classData?.steps?.step4Quiz?.questions || [];
    const answeredCount = Object.keys(state.selectedQuizAnswers || {}).length;
    const totalQuestions = questions.length || 5;
    const allQuizAnswered = totalQuestions > 0 && answeredCount >= totalQuestions;

    if (completed.step4Quiz) {
      if (elements.btnSubmitQuiz) {
        elements.btnSubmitQuiz.disabled = false;
        elements.btnSubmitQuiz.className = 'btn btn-success';
        elements.btnSubmitQuiz.innerHTML = '<i class="fa-solid fa-check-double"></i> Quiz Completed';
      }
    } else if (allQuizAnswered) {
      if (elements.btnSubmitQuiz) {
        elements.btnSubmitQuiz.disabled = false;
        elements.btnSubmitQuiz.className = 'btn btn-success';
        elements.btnSubmitQuiz.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Quiz Answers';
      }
    } else {
      if (elements.btnSubmitQuiz) {
        elements.btnSubmitQuiz.disabled = true;
        elements.btnSubmitQuiz.className = 'btn btn-success disabled';
        elements.btnSubmitQuiz.innerHTML = `<i class="fa-solid fa-lock"></i> Submit Quiz Answers (${answeredCount}/${totalQuestions} Answered)`;
      }
    }

    // Step 5: Task Upload
    const emailVal = elements.studentEmailInput ? elements.studentEmailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailVal);
    const isDocUploaded = !!state.selectedFile;

    if (completed.step5Task) {
      if (elements.btnSubmitTask) {
        elements.btnSubmitTask.disabled = false;
        elements.btnSubmitTask.className = 'btn btn-primary btn-lg';
        elements.btnSubmitTask.innerHTML = '<i class="fa-solid fa-check-double"></i> Assignment Submitted';
      }
    } else if (isDocUploaded && isEmailValid) {
      if (elements.btnSubmitTask) {
        elements.btnSubmitTask.disabled = false;
        elements.btnSubmitTask.className = 'btn btn-primary btn-lg';
        elements.btnSubmitTask.innerHTML = '<i class="fa-solid fa-upload"></i> Upload & Submit Assignment';
      }
    } else {
      if (elements.btnSubmitTask) {
        elements.btnSubmitTask.disabled = true;
        elements.btnSubmitTask.className = 'btn btn-primary btn-lg disabled';
        let missing = [];
        if (!isDocUploaded) missing.push('Attach File');
        if (!isEmailValid) missing.push('Enter Email');
        elements.btnSubmitTask.innerHTML = `<i class="fa-solid fa-lock"></i> Upload & Submit Assignment (${missing.join(' & ')})`;
      }
    }
  }

  function setupStepActions() {
    // ── Step 2: PDF Link ─────────────────────────────────────────────────────
    // Use a single 'click' listener via event delegation so the link still opens normally
    document.addEventListener('click', (e) => {
      const pdfLink = e.target.closest('#linkTopicPdf');
      if (pdfLink) {
        // Link opens in new tab — mark as opened immediately
        const p = getPrerequisites(state.currentClassId);
        if (!p.docOpened) {
          p.docOpened = true;
          showToast('📄 PDF Document opened! "Confirm Topic Reviewed" button is now unlocked.', 'info');
          updatePrerequisiteButtons();
        }
      }

      // ── Step 3: Website Link — start 20-second countdown ─────────────────
      const webLink = e.target.closest('#linkWebsite');
      if (webLink) {
        const p = getPrerequisites(state.currentClassId);
        if (!p.websiteOpened) {
          // Clear any existing countdown
          if (state.websiteCountdownTimer) {
            clearInterval(state.websiteCountdownTimer);
            state.websiteCountdownTimer = null;
          }

          let secondsLeft = 20;
          showToast(`🌐 Website opened! Stay on the site for 20 seconds to unlock Step 3.`, 'info');

          // Update Step 3 button with a live countdown
          const updateCountdownBtn = () => {
            if (elements.btnCompleteStep3 && !p.websiteOpened) {
              elements.btnCompleteStep3.disabled = true;
              elements.btnCompleteStep3.className = 'btn btn-primary';
              elements.btnCompleteStep3.innerHTML =
                `<i class="fa-solid fa-clock"></i> Mark Activity Complete (Wait ${secondsLeft}s...)`;
            }
          };
          updateCountdownBtn();

          state.websiteCountdownTimer = setInterval(() => {
            secondsLeft--;
            if (secondsLeft > 0) {
              updateCountdownBtn();
            } else {
              clearInterval(state.websiteCountdownTimer);
              state.websiteCountdownTimer = null;
              p.websiteOpened = true;
              showToast('✅ 20 seconds completed! Step 3 "Mark Activity Complete" button is now unlocked.', 'success');
              updatePrerequisiteButtons();
            }
          }, 1000);
        }
      }
    });

    // ── Step 1: YouTube IFrame API Video Completion ───────────────────────────
    // Initialize YouTube Player via IFrame API so we can detect video ended
    function initYouTubePlayer() {
      const iframe = document.getElementById('youtubeIframe');
      if (!iframe) return;

      if (window.YT && window.YT.Player) {
        state.youtubePlayer = new YT.Player('youtubeIframe', {
          events: {
            onStateChange: (event) => {
              // YT.PlayerState.ENDED = 0
              if (event.data === YT.PlayerState.ENDED) {
                const p = getPrerequisites(state.currentClassId);
                if (!p.videoWatched) {
                  p.videoWatched = true;
                  showToast('🎬 Video completed! "Mark Video as Watched" button is now unlocked.', 'success');
                  updatePrerequisiteButtons();
                }
              }
            }
          }
        });
      }
    }

    // YouTube IFrame API calls this global function when ready
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {
        initYouTubePlayer();
      };
    } else {
      // API already loaded (e.g. page was not refreshed)
      initYouTubePlayer();
    }

    // Step 1 Video Button
    elements.btnCompleteStep1?.addEventListener('click', (e) => {
      if (elements.btnCompleteStep1.disabled) {
        e.preventDefault();
        showToast('REQUIREMENT: Please watch/play the lesson video before marking Step 1 complete!', 'error');
        return;
      }
      state.completedStepsPerClass[state.currentClassId].step1Video = true;
      markStepBadgeCompleted(elements.step1StatusBadge, 'Watched');
      updatePrerequisiteButtons();
      showToast('Step 1 Complete: Lesson Video Watched!', 'success');
      updateProgressUI();
    });

    // Step 2 Topic PDF Button
    elements.btnCompleteStep2?.addEventListener('click', (e) => {
      if (elements.btnCompleteStep2.disabled) {
        e.preventDefault();
        showToast('REQUIREMENT: Please click "Open PDF Document" to review topics before confirming!', 'error');
        return;
      }
      state.completedStepsPerClass[state.currentClassId].step2TopicPdf = true;
      markStepBadgeCompleted(elements.step2StatusBadge, 'Reviewed');
      updatePrerequisiteButtons();
      showToast('Step 2 Complete: Topics Reviewed!', 'success');
      updateProgressUI();
    });

    // Step 3 Website Activity Button
    elements.btnCompleteStep3?.addEventListener('click', (e) => {
      if (elements.btnCompleteStep3.disabled) {
        e.preventDefault();
        showToast('REQUIREMENT: Please click "Launch Portal" to open the educational website before marking complete!', 'error');
        return;
      }
      state.completedStepsPerClass[state.currentClassId].step3Website = true;
      markStepBadgeCompleted(elements.step3StatusBadge, 'Visited');
      updatePrerequisiteButtons();
      showToast('Step 3 Complete: Interactive Website Activity!', 'success');
      updateProgressUI();
    });

    // Step 4 Quiz Submission
    elements.btnSubmitQuiz?.addEventListener('click', (e) => {
      if (elements.btnSubmitQuiz.disabled) {
        e.preventDefault();
        showToast('REQUIREMENT: Please answer ALL quiz questions before submitting!', 'error');
        return;
      }
      const classData = COURSES_DATA.classes.find(c => c.id === state.currentClassId);
      const questions = classData?.steps?.step4Quiz?.questions || [];

      if (questions.length === 0) return;

      // Check if all 5 questions are answered
      const answeredIndices = Object.keys(state.selectedQuizAnswers || {}).map(k => parseInt(k));
      let unansweredCount = 0;

      questions.forEach((q, idx) => {
        const card = document.getElementById(`quizQuestionCard_${idx}`);
        if (!answeredIndices.includes(idx)) {
          unansweredCount++;
          if (card) card.classList.add('unanswered-warning');
        } else {
          if (card) card.classList.remove('unanswered-warning');
        }
      });

      if (unansweredCount > 0) {
        showToast(`MANDATORY: Please answer ALL ${questions.length} quiz questions before submitting! (${unansweredCount} remaining)`, 'error');
        return;
      }

      // Calculate score out of 5
      let correctCount = 0;
      questions.forEach((q, idx) => {
        const selectedOptId = state.selectedQuizAnswers[idx];
        const selectedOpt = q.options.find(o => o.id === selectedOptId);
        if (selectedOpt && selectedOpt.isCorrect) {
          correctCount++;
        }
      });

      const scorePercent = Math.round((correctCount / questions.length) * 100);
      const passingPercent = classData.steps.step4Quiz.passingScorePercent || 80;

      const banner = document.getElementById('resultAlertBanner');
      elements.quizResultBox.classList.remove('hidden');

      if (scorePercent >= passingPercent) {
        state.completedStepsPerClass[state.currentClassId].step4Quiz = true;
        if (banner) banner.className = 'result-alert';
        elements.resultTitle.innerHTML = `<i class="fa-solid fa-trophy text-success"></i> Quiz Passed! Score: ${scorePercent}% (${correctCount}/${questions.length} Correct)`;
        elements.resultSubtitle.textContent = `Great job! You met the passing criteria of ${passingPercent}%.`;
        markStepBadgeCompleted(elements.step4StatusBadge, `Passed ${scorePercent}%`);
        showToast(`Step 4 Passed: ${scorePercent}% Score!`, 'success');
      } else {
        if (banner) banner.className = 'result-alert result-danger';
        elements.resultTitle.innerHTML = `<i class="fa-solid fa-circle-xmark text-danger"></i> Quiz Attempt Failed (${scorePercent}%)`;
        elements.resultSubtitle.textContent = `You scored ${correctCount}/${questions.length} (${scorePercent}%). Passing score is ${passingPercent}%. Please review Step 2 PDF and try again!`;
        showToast(`Quiz Failed (${scorePercent}%). Review topic and retry!`, 'error');
      }

      updatePrerequisiteButtons();
      updateProgressUI();
    });
  }

  // 9. File Upload Handling & Step 5 Submission
  function setupFileUpload() {
    elements.btnBrowseFile?.addEventListener('click', () => {
      elements.fileInput.click();
    });

    elements.fileInput?.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileSelected(e.target.files[0]);
      }
    });

    elements.studentEmailInput?.addEventListener('input', () => {
      updatePrerequisiteButtons();
    });

    elements.dropzone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      elements.dropzone.classList.add('dragover');
    });

    elements.dropzone?.addEventListener('dragleave', () => {
      elements.dropzone.classList.remove('dragover');
    });

    elements.dropzone?.addEventListener('drop', (e) => {
      e.preventDefault();
      elements.dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    });

    elements.btnClearFile?.addEventListener('click', () => {
      state.selectedFile = null;
      elements.fileInput.value = '';
      elements.selectedFileInfo.classList.add('hidden');
      updatePrerequisiteButtons();
    });

    elements.btnSubmitTask?.addEventListener('click', (e) => {
      if (elements.btnSubmitTask.disabled) {
        e.preventDefault();
        showToast('REQUIREMENT: Please attach your completed assignment worksheet and enter student email first!', 'error');
        return;
      }
      const emailInput = elements.studentEmailInput;
      const emailValue = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValue || !emailRegex.test(emailValue)) {
        if (emailInput) {
          emailInput.classList.add('input-error');
          emailInput.focus();
        }
        showToast('MANDATORY EMAIL REQUIRED: Please enter a valid student email ID before submitting!', 'error');
        return;
      }

      if (emailInput) {
        emailInput.classList.remove('input-error');
      }

      if (!state.selectedFile) {
        showToast('Please select or drag a worksheet file to upload before submitting task!', 'error');
        return;
      }

      state.completedStepsPerClass[state.currentClassId].step5Task = true;
      markStepBadgeCompleted(elements.step5StatusBadge, 'Submitted');

      const classData = COURSES_DATA.classes.find(c => c.id === state.currentClassId);
      const newSubmission = {
        id: Date.now(),
        studentName: emailValue.split('@')[0],
        studentEmail: emailValue,
        gradeNumber: COURSES_DATA.currentGradeNumber,
        dayNumber: classData ? classData.dayNumber : 1,
        classTitle: classData ? classData.title : 'Class 1',
        chapterTitle: `Chapter ${COURSES_DATA.currentChapterNumber}: Computer Fundamentals`,
        topicTitle: classData ? classData.title : 'Task Submission',
        fileName: state.selectedFile.name,
        submittedAt: new Date().toISOString(),
        status: 'SUBMITTED',
        score: null,
        teacherFeedback: ''
      };

      const storeKeyAdmin = 'lms_admin_submissions';
      const storeKeyStudent = 'engloray_student_submissions';
      const existingAdmin = JSON.parse(localStorage.getItem(storeKeyAdmin) || '[]');
      const existingStudent = JSON.parse(localStorage.getItem(storeKeyStudent) || '[]');

      existingAdmin.unshift(newSubmission);
      existingStudent.unshift(newSubmission);

      localStorage.setItem(storeKeyAdmin, JSON.stringify(existingAdmin));
      localStorage.setItem(storeKeyStudent, JSON.stringify(existingStudent));
      window.dispatchEvent(new Event('storage'));

      // Post submission directly to MySQL backend server if available
      try {
        const apiBase = window.API_BASE_URL || 'http://localhost:8080/api/v1';
        const formData = new FormData();
        formData.append('dayClassId', state.currentClassId || 6);
        formData.append('studentEmail', emailValue);
        formData.append('gradeNumber', COURSES_DATA.currentGradeNumber || 5);
        formData.append('file', state.selectedFile);

        fetch(`${apiBase}/student/task/upload`, {
          method: 'POST',
          body: formData
        }).then(res => res.json()).then(data => {
          console.log('Submission successfully saved to MySQL Database:', data);
        }).catch(err => {
          console.log('Saved to LocalSync store.');
        });
      } catch (err) {
        // Fallback to local sync
      }

      elements.submissionStatusBox.classList.remove('hidden');
      elements.submissionMetaText.innerHTML = `File: <strong>${state.selectedFile.name}</strong> • Student Email: <strong>${emailValue}</strong> • Status: SUBMITTED FOR REVIEW`;

      showToast(`Step 5 Task Submitted Successfully for ${emailValue}!`, 'success');
      updatePrerequisiteButtons();
      updateProgressUI();
    });
  }

  function handleFileSelected(file) {
    state.selectedFile = file;
    elements.fileNameDisplay.textContent = file.name;
    elements.selectedFileInfo.classList.remove('hidden');
    showToast(`File selected: ${file.name}`, 'info');
    updatePrerequisiteButtons();
  }

  // 10. Class & Step Progress Calculations
  function isClass100PercentCompleted(classId) {
    const classProgress = state.completedStepsPerClass[classId];
    if (!classProgress) return false;
    return (
      classProgress.step1Video &&
      classProgress.step2TopicPdf &&
      classProgress.step3Website &&
      classProgress.step4Quiz &&
      classProgress.step5Task
    );
  }

  function updateProgressUI() {
    const currentClassProgress = state.completedStepsPerClass[state.currentClassId] || {
      step1Video: false, step2TopicPdf: false, step3Website: false, step4Quiz: false, step5Task: false
    };

    let completedCount = 0;
    if (currentClassProgress.step1Video) completedCount++;
    if (currentClassProgress.step2TopicPdf) completedCount++;
    if (currentClassProgress.step3Website) completedCount++;
    if (currentClassProgress.step4Quiz) completedCount++;
    if (currentClassProgress.step5Task) completedCount++;

    const percent = (completedCount / 5) * 100;
    elements.progressPercentageText.textContent = `${Math.round(percent)}%`;

    const circumference = 2 * Math.PI * 40; // r=40
    const offset = circumference - (percent / 100) * circumference;
    elements.progressRingFill.style.strokeDasharray = `${circumference}`;
    elements.progressRingFill.style.strokeDashoffset = `${offset}`;

    const currentClassObj = COURSES_DATA.classes.find(c => c.id === state.currentClassId);
    const dayNum = currentClassObj ? currentClassObj.dayNumber : 1;

    if (percent === 100) {
      elements.progressionStatusTitle.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> Class ${dayNum} Completed!`;
      elements.progressionSubtitleText.textContent = `All 5 steps finished. Next class is ready!`;

      // Automatically unlock next class if available
      const nextClass = COURSES_DATA.classes.find(c => c.dayNumber === dayNum + 1);
      if (nextClass && !state.unlockedClassIds.includes(nextClass.id)) {
        state.unlockedClassIds.push(nextClass.id);
        showToast(`Congratulations! Class ${nextClass.dayNumber} has been UNLOCKED!`, 'success');
        renderSidebarClassList();
      }
    } else {
      elements.progressionStatusTitle.textContent = `Class ${dayNum} In Progress`;
      elements.progressionSubtitleText.textContent = `${completedCount} of 5 steps completed.`;
    }

    renderSidebarClassList();
  }

  function restoreClassStepUIState(classId) {
    const p = state.completedStepsPerClass[classId] || {
      step1Video: false, step2TopicPdf: false, step3Website: false, step4Quiz: false, step5Task: false
    };

    // Step 1
    if (p.step1Video) {
      markStepBadgeCompleted(elements.step1StatusBadge, 'Watched');
    } else {
      resetStepBadge(elements.step1StatusBadge, 'Step 1');
    }

    // Step 2
    if (p.step2TopicPdf) {
      markStepBadgeCompleted(elements.step2StatusBadge, 'Reviewed');
    } else {
      resetStepBadge(elements.step2StatusBadge, 'Step 2');
    }

    // Step 3
    if (p.step3Website) {
      markStepBadgeCompleted(elements.step3StatusBadge, 'Visited');
    } else {
      resetStepBadge(elements.step3StatusBadge, 'Step 3');
    }

    // Step 4 Quiz
    if (p.step4Quiz) {
      markStepBadgeCompleted(elements.step4StatusBadge, 'Passed 100%');
      elements.quizResultBox.classList.remove('hidden', 'result-danger');
      elements.quizResultBox.classList.add('result-success');
      elements.resultTitle.innerHTML = '<i class="fa-solid fa-circle-check text-success"></i> Quiz Passed (100%)';
      elements.resultSubtitle.textContent = 'You have already passed this concept check quiz.';
    } else {
      resetStepBadge(elements.step4StatusBadge, 'Step 4');
      elements.quizResultBox.classList.add('hidden');
    }

    // Step 5 Task
    if (p.step5Task) {
      markStepBadgeCompleted(elements.step5StatusBadge, 'Submitted');
      elements.submissionStatusBox.classList.remove('hidden');
    } else {
      resetStepBadge(elements.step5StatusBadge, 'Step 5');
      elements.submissionStatusBox.classList.add('hidden');
    }

    updatePrerequisiteButtons();
  }

  function markStepBadgeCompleted(badgeElement, text) {
    if (!badgeElement) return;
    badgeElement.className = 'badge badge-success';
    badgeElement.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${text}`;
  }

  function resetStepBadge(badgeElement, defaultText) {
    if (!badgeElement) return;
    badgeElement.className = 'badge badge-primary';
    badgeElement.textContent = defaultText;
  }

  // Toast System
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Student Curriculum Explorer State & Rendering Engine
  const studentCurriculumState = {
    currentLevel: 'classes', // 'classes' | 'courses' | 'terms' | 'chapters' | 'lessons'
    selectedGradeNumber: 3,
    selectedCourseName: 'Computer Skills & Digital Literacy',
    selectedTermNumber: 1,
    selectedChapterNumber: 1
  };

  function renderStudentCurriculumBreadcrumbs() {
    const breadcrumbContainer = document.getElementById('studentCurriculumBreadcrumbs');
    if (!breadcrumbContainer) return;

    const level = studentCurriculumState.currentLevel;
    const gradeNum = studentCurriculumState.selectedGradeNumber;
    const courseName = studentCurriculumState.selectedCourseName;
    const termNum = studentCurriculumState.selectedTermNumber;
    const chapNum = studentCurriculumState.selectedChapterNumber;

    const items = [];
    
    // Level 1: Classes
    items.push({
      label: 'Classes',
      icon: 'fa-layer-group',
      active: level === 'classes',
      onClick: () => {
        studentCurriculumState.currentLevel = 'classes';
        renderStudentCurriculumBreadcrumbs();
        renderStudentCurriculumContent();
      }
    });

    // Level 2: Course
    if (level !== 'classes') {
      items.push({
        label: `CLASS ${gradeNum}rd`,
        icon: 'fa-chalkboard-user',
        active: level === 'courses',
        onClick: () => {
          studentCurriculumState.currentLevel = 'courses';
          renderStudentCurriculumBreadcrumbs();
          renderStudentCurriculumContent();
        }
      });
    }

    // Level 3: Term
    if (level === 'terms' || level === 'chapters' || level === 'lessons') {
      items.push({
        label: `Course: ${courseName}`,
        icon: 'fa-book-open',
        active: level === 'terms',
        onClick: () => {
          studentCurriculumState.currentLevel = 'terms';
          renderStudentCurriculumBreadcrumbs();
          renderStudentCurriculumContent();
        }
      });
    }

    // Level 4: Chapter
    if (level === 'chapters' || level === 'lessons') {
      items.push({
        label: `Term ${termNum}`,
        icon: 'fa-calendar-days',
        active: level === 'chapters',
        onClick: () => {
          studentCurriculumState.currentLevel = 'chapters';
          renderStudentCurriculumBreadcrumbs();
          renderStudentCurriculumContent();
        }
      });
    }

    // Level 5: Lessons
    if (level === 'lessons') {
      items.push({
        label: `Chapter ${chapNum}`,
        icon: 'fa-folder-open',
        active: true,
        onClick: () => {}
      });
    }

    breadcrumbContainer.innerHTML = items.map((item, idx) => `
      <button type="button" class="pill-btn ${item.active ? 'active' : ''}" id="currBreadcrumb_${idx}">
        <i class="fa-solid ${item.icon}"></i> ${escapeHtml(item.label)}
      </button>
    `).join('');

    items.forEach((item, idx) => {
      document.getElementById(`currBreadcrumb_${idx}`)?.addEventListener('click', item.onClick);
    });
  }

  function renderStudentCurriculumContent() {
    const container = document.getElementById('studentCurriculumContainer');
    if (!container) return;

    const level = studentCurriculumState.currentLevel;
    const gradeNum = studentCurriculumState.selectedGradeNumber;

    if (level === 'classes') {
      // Level 1: Renders Classes (CLASS 3rd, CLASS 4th, CLASS 5th)
      container.innerHTML = `
        <div class="nodes-list-grid" style="display:flex; flex-direction:column; gap:12px;">
          <div class="node-card class-explore-card" id="studentNodeClass3rd" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:18px 22px; border-radius:14px; border:1px solid #cbd5e1; background:#ffffff; box-shadow:0 2px 6px rgba(0,0,0,0.03); transition:all 0.2s ease;">
            <div class="class-card-left">
              <span class="node-title" style="font-size:1.15rem; font-weight:700; color:#0f172a;">CLASS 3rd</span>
              <p class="node-subtitle" style="font-size:0.85rem; color:#64748b; margin-top:4px;">
                Scheduled Course: Computer Skills & Digital Literacy &bull; Instructor: Sri (Mentor)
              </p>
            </div>
            <button type="button" class="btn btn-sm btn-primary" style="border-radius:20px; white-space:nowrap;">
              Explore Scheduled Courses &rarr;
            </button>
          </div>

          <div class="node-card class-explore-card" id="studentNodeClass4th" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:18px 22px; border-radius:14px; border:1px solid #cbd5e1; background:#ffffff; box-shadow:0 2px 6px rgba(0,0,0,0.03); transition:all 0.2s ease;">
            <div class="class-card-left">
              <span class="node-title" style="font-size:1.15rem; font-weight:700; color:#0f172a;">CLASS 4th</span>
              <p class="node-subtitle" style="font-size:0.85rem; color:#64748b; margin-top:4px;">
                Scheduled Course: Computer Hardware & Applications &bull; Instructor: Sri (Mentor)
              </p>
            </div>
            <button type="button" class="btn btn-sm btn-outline" style="border-radius:20px; white-space:nowrap;">
              Explore Scheduled Courses &rarr;
            </button>
          </div>

          <div class="node-card class-explore-card" id="studentNodeClass5th" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:18px 22px; border-radius:14px; border:1px solid #cbd5e1; background:#ffffff; box-shadow:0 2px 6px rgba(0,0,0,0.03); transition:all 0.2s ease;">
            <div class="class-card-left">
              <span class="node-title" style="font-size:1.15rem; font-weight:700; color:#0f172a;">CLASS 5th</span>
              <p class="node-subtitle" style="font-size:0.85rem; color:#64748b; margin-top:4px;">
                Scheduled Course: Advanced Computer Systems & Digital Hygiene &bull; Instructor: Sri (Mentor)
              </p>
            </div>
            <button type="button" class="btn btn-sm btn-outline" style="border-radius:20px; white-space:nowrap;">
              Explore Scheduled Courses &rarr;
            </button>
          </div>
        </div>
      `;

      document.getElementById('studentNodeClass3rd')?.addEventListener('click', () => {
        studentCurriculumState.selectedGradeNumber = 3;
        studentCurriculumState.currentLevel = 'courses';
        renderStudentCurriculumBreadcrumbs();
        renderStudentCurriculumContent();
      });

      document.getElementById('studentNodeClass4th')?.addEventListener('click', () => {
        studentCurriculumState.selectedGradeNumber = 4;
        studentCurriculumState.currentLevel = 'courses';
        renderStudentCurriculumBreadcrumbs();
        renderStudentCurriculumContent();
      });

      document.getElementById('studentNodeClass5th')?.addEventListener('click', () => {
        studentCurriculumState.selectedGradeNumber = 5;
        studentCurriculumState.currentLevel = 'courses';
        renderStudentCurriculumBreadcrumbs();
        renderStudentCurriculumContent();
      });

    } else if (level === 'courses') {
      // Level 2: Scheduled Courses for Selected Class
      container.innerHTML = `
        <div class="content-panel-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:20px;">
          <div class="panel-card-header" style="margin-bottom:16px;">
            <h3 style="font-size:1.15rem; font-weight:700; color:#0f172a;"><i class="fa-solid fa-graduation-cap text-blue"></i> Scheduled Courses for CLASS ${gradeNum}rd</h3>
          </div>
          <div class="panel-card-body">
            <div class="classes-card-list">
              <div class="node-card course-item-card" id="btnExploreCourse_1" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:18px; border-radius:12px; border:1px solid #bfdbfe; background:#eff6ff;">
                <div>
                  <h3 class="node-title" style="font-size:1.1rem; font-weight:700; color:#1e40af;">Computer Skills & Digital Literacy (Grade ${gradeNum})</h3>
                  <p style="font-size:0.85rem; color:#3b82f6; margin-top:4px;">
                    Instructor: Sri (Mentor) &bull; Status: <span class="badge badge-success" style="font-size:0.75rem; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:10px;">Registered & Active</span>
                  </p>
                  <p style="font-size:0.85rem; color:#475569; margin-top:6px;">
                    Covering Computer Fundamentals, Hardware Parts, Care & Ethics, Operating System, and Practical Activities.
                  </p>
                </div>
                <button type="button" class="btn btn-primary btn-sm" style="border-radius:20px; white-space:nowrap;">
                  View Registered Terms &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btnExploreCourse_1')?.addEventListener('click', () => {
        studentCurriculumState.currentLevel = 'terms';
        renderStudentCurriculumBreadcrumbs();
        renderStudentCurriculumContent();
      });

    } else if (level === 'terms') {
      // Level 3: Registered Terms
      container.innerHTML = `
        <div class="content-panel-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:20px;">
          <div class="panel-card-header" style="margin-bottom:16px;">
            <h3 style="font-size:1.15rem; font-weight:700; color:#0f172a;"><i class="fa-solid fa-calendar-days text-blue"></i> Registered Terms for Computer Skills (Grade ${gradeNum})</h3>
          </div>
          <div class="panel-card-body" style="display:flex; flex-direction:column; gap:12px;">
            <div class="node-card" id="btnExploreTerm_1" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:16px; border-radius:12px; border:1px solid #bfdbfe; background:#eff6ff;">
              <div>
                <span class="node-title" style="font-size:1.05rem; font-weight:700; color:#1e40af;">Term 1: Core Fundamentals & Hardware Basics</span>
                <p style="font-size:0.825rem; color:#3b82f6; margin-top:2px;">Status: Registered & Active &bull; 4 Chapters Included</p>
              </div>
              <button type="button" class="btn btn-primary btn-sm" style="border-radius:20px;">
                View Chapters &rarr;
              </button>
            </div>

            <div class="node-card" id="btnExploreTerm_2" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:16px; border-radius:12px; border:1px solid #e2e8f0; background:#ffffff;">
              <div>
                <span class="node-title" style="font-size:1.05rem; font-weight:700; color:#0f172a;">Term 2: Software, Operating Systems & Paint Tools</span>
                <p style="font-size:0.825rem; color:#64748b; margin-top:2px;">Status: Scheduled &bull; Upcoming Term</p>
              </div>
              <button type="button" class="btn btn-outline btn-sm" style="border-radius:20px;">
                View Chapters &rarr;
              </button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btnExploreTerm_1')?.addEventListener('click', () => {
        studentCurriculumState.selectedTermNumber = 1;
        studentCurriculumState.currentLevel = 'chapters';
        renderStudentCurriculumBreadcrumbs();
        renderStudentCurriculumContent();
      });

      document.getElementById('btnExploreTerm_2')?.addEventListener('click', () => {
        studentCurriculumState.selectedTermNumber = 2;
        studentCurriculumState.currentLevel = 'chapters';
        renderStudentCurriculumBreadcrumbs();
        renderStudentCurriculumContent();
      });

    } else if (level === 'chapters') {
      // Level 4: Chapters Flow
      const gradeObj = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades) ? COURSES_DATA.grades.find(g => g.gradeNumber === gradeNum) : null;
      const chaptersList = gradeObj ? gradeObj.chapters : [
        { chapterNumber: 1, chapterTitle: 'Chapter 1: Computer Fundamentals', description: 'What is a computer, main computer parts, sitting posture & computer safety.' }
      ];

      container.innerHTML = `
        <div class="content-panel-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:20px;">
          <div class="panel-card-header" style="margin-bottom:16px;">
            <h3 style="font-size:1.15rem; font-weight:700; color:#0f172a;"><i class="fa-solid fa-folder-open text-blue"></i> Scheduled Chapters (Term ${studentCurriculumState.selectedTermNumber})</h3>
          </div>
          <div class="panel-card-body" style="display:flex; flex-direction:column; gap:12px;">
            ${chaptersList.map((chap, idx) => `
              <div class="node-card chapter-explore-card" id="btnExploreChap_${idx}" style="cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:16px; border-radius:12px; border:1px solid #e2e8f0; background:#ffffff;">
                <div>
                  <span class="node-title" style="font-size:1.05rem; font-weight:700; color:#0f172a;">${escapeHtml(chap.chapterTitle)}</span>
                  <p style="font-size:0.85rem; color:#64748b; margin-top:4px;">${escapeHtml(chap.description)}</p>
                  <p style="font-size:0.775rem; color:#2563eb; margin-top:4px;"><i class="fa-solid fa-circle-check"></i> ${chap.classes ? chap.classes.length : 4} Scheduled Lessons & Activities</p>
                </div>
                <button type="button" class="btn btn-primary btn-sm" style="border-radius:20px; white-space:nowrap;">
                  View Lessons & Activities &rarr;
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      chaptersList.forEach((chap, idx) => {
        document.getElementById(`btnExploreChap_${idx}`)?.addEventListener('click', () => {
          studentCurriculumState.selectedChapterNumber = chap.chapterNumber || 1;
          studentCurriculumState.currentLevel = 'lessons';
          renderStudentCurriculumBreadcrumbs();
          renderStudentCurriculumContent();
        });
      });

    } else if (level === 'lessons') {
      // Level 5: Lessons, Activities, Assignments & Resources given by Mentor
      const gradeObj = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades) ? COURSES_DATA.grades.find(g => g.gradeNumber === gradeNum) : null;
      const targetChap = gradeObj ? gradeObj.chapters.find(c => c.chapterNumber === studentCurriculumState.selectedChapterNumber) : null;
      const classesList = (targetChap && targetChap.classes) ? targetChap.classes : (typeof COURSES_DATA !== 'undefined' ? COURSES_DATA.classes : []);

      container.innerHTML = `
        <div class="content-panel-card" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:20px;">
          <div class="panel-card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <h3 style="font-size:1.15rem; font-weight:700; color:#0f172a;"><i class="fa-solid fa-book-open text-blue"></i> Lessons, Activities & Assignments (Chapter ${studentCurriculumState.selectedChapterNumber})</h3>
              <p style="font-size:0.85rem; color:#64748b;">Assigned by Mentor Sri for Class ${gradeNum}rd</p>
            </div>
            <button type="button" class="btn btn-primary btn-sm" id="btnLaunchAllLessons" style="border-radius:20px;">
              <i class="fa-solid fa-play"></i> Open 5-Step Workspace
            </button>
          </div>
          <div class="panel-card-body" style="display:flex; flex-direction:column; gap:16px;">
            ${classesList.map(c => `
              <div class="class-item-card" style="padding:16px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                  <div>
                    <span class="badge badge-primary" style="font-size:0.75rem; background:#eff6ff; color:#2563eb; padding:2px 8px; border-radius:8px;">Class ${c.dayNumber}</span>
                    <h4 style="font-size:1rem; font-weight:700; color:#0f172a; margin-top:4px;">${escapeHtml(c.title)}</h4>
                    <p style="font-size:0.825rem; color:#64748b; margin-top:2px;">${escapeHtml(c.description)}</p>
                  </div>
                  <button type="button" class="btn btn-outline btn-sm btn-open-specific-lesson" data-class-id="${c.id}" style="border-radius:18px; border:1px solid #2563eb; color:#2563eb; background:#ffffff; padding:6px 14px; cursor:pointer;">
                    Start Lesson &rarr;
                  </button>
                </div>

                <!-- 5 Steps Grid Summary -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:8px; margin-top:12px;">
                  <div style="background:#ffffff; border:1px solid #e2e8f0; padding:8px 12px; border-radius:8px; font-size:0.775rem;">
                    <i class="fa-solid fa-video" style="color:#2563eb;"></i> <strong>Step 1:</strong> Lesson Video
                  </div>
                  <div style="background:#ffffff; border:1px solid #e2e8f0; padding:8px 12px; border-radius:8px; font-size:0.775rem;">
                    <i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> <strong>Step 2:</strong> Topics PDF
                  </div>
                  <div style="background:#ffffff; border:1px solid #e2e8f0; padding:8px 12px; border-radius:8px; font-size:0.775rem;">
                    <i class="fa-solid fa-gamepad" style="color:#10b981;"></i> <strong>Step 3:</strong> Interactive Activity
                  </div>
                  <div style="background:#ffffff; border:1px solid #e2e8f0; padding:8px 12px; border-radius:8px; font-size:0.775rem;">
                    <i class="fa-solid fa-circle-check" style="color:#f59e0b;"></i> <strong>Step 4:</strong> Concept Quiz (5 Qs)
                  </div>
                  <div style="background:#ffffff; border:1px solid #e2e8f0; padding:8px 12px; border-radius:8px; font-size:0.775rem;">
                    <i class="fa-solid fa-upload" style="color:#8b5cf6;"></i> <strong>Step 5:</strong> ${escapeHtml(c.steps ? c.steps.step5Task.title : 'Practical Task')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      document.getElementById('btnLaunchAllLessons')?.addEventListener('click', () => {
        showStudentPortal('studentLearningPageWrapper', '/grade-3/chapter-1/class-1');
        if (typeof loadClassView === 'function' && classesList.length > 0) {
          loadClassView(classesList[0].id, false);
        }
      });

      const openBtns = container.querySelectorAll('.btn-open-specific-lesson');
      openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const classId = parseInt(e.currentTarget.getAttribute('data-class-id'));
          showStudentPortal('studentLearningPageWrapper', `/grade-3/chapter-1/class-${classId}`);
          if (typeof loadClassView === 'function') {
            loadClassView(classId, false);
          }
        });
      });
    }
  }

  // Live Broadcast Channel & State for Published Classes (Mentor -> Student)
  const curriculumLiveChannel = window.BroadcastChannel ? new BroadcastChannel('engloray_curriculum_live') : null;

  function getPublishedClasses() {
    try {
      const saved = localStorage.getItem('lms_published_classes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: 'class_3',
        className: 'CLASS 3rd',
        gradeNum: 3,
        courseName: 'Computer Skills & Digital Literacy',
        termNum: 1,
        chapTitle: 'Chapter 1: Computer Fundamentals & Hardware',
        isUnlocked: true
      }
    ];
  }

  function savePublishedClasses(list) {
    localStorage.setItem('lms_published_classes', JSON.stringify(list));
    if (curriculumLiveChannel) {
      try {
        curriculumLiveChannel.postMessage({ type: 'CURRICULUM_PUBLISHED_UPDATE', ts: Date.now() });
      } catch (e) {}
    }
  }

  window.toggleLockPublishedClass = function(id = 'class_3') {
    const published = getPublishedClasses();
    let target = published.find(c => c.id === id);
    if (!target) {
      target = {
        id: id || 'class_3',
        className: 'CLASS 3rd',
        gradeNum: 3,
        courseName: 'Computer Skills & Digital Literacy',
        termNum: 1,
        chapTitle: 'Chapter 1: Computer Fundamentals & Hardware',
        isUnlocked: true
      };
      published.push(target);
    }

    target.isUnlocked = !target.isUnlocked;
    savePublishedClasses(published);
    if (typeof window.renderMentorCurriculumGrid === 'function') {
      window.renderMentorCurriculumGrid();
    }
    if (typeof window.renderStudentSubjectsView === 'function') {
      window.renderStudentSubjectsView(target.gradeNum || 3, 'lessons');
    }
    showToast(`${target.className} is now ${target.isUnlocked ? 'unlocked and visible to students' : 'locked'}.`, target.isUnlocked ? 'success' : 'warning');
  };

  window.deletePublishedClass = function(id = 'class_3') {
    let published = getPublishedClasses();
    published = published.filter(c => c.id !== id);
    savePublishedClasses(published);
    if (typeof window.renderMentorCurriculumGrid === 'function') {
      window.renderMentorCurriculumGrid();
    }
    showToast('Class node removed from mentor builder.', 'warning');
  };

  const GRADE_3_ALL_6_CHAPTERS = [
    {
      id: 301,
      chapterNumber: 1,
      chapterTitle: 'Chapter 1: Computer Fundamentals & Hardware',
      title: 'Chapter 1: Computer Fundamentals & Hardware',
      description: 'Introduction to computer parts, input/output devices, mouse, and keyboard skills.',
      isLocked: false,
      classes: [
        { id: 3011, dayNumber: 1, title: 'Class 1: Introduction to Computer & Parts', isUnlockedByAdmin: true },
        { id: 3012, dayNumber: 2, title: 'Class 2: Input & Output Devices', isUnlockedByAdmin: true },
        { id: 3013, dayNumber: 3, title: 'Class 3: Using Mouse & Keyboard Navigation', isUnlockedByAdmin: true },
        { id: 3014, dayNumber: 4, title: 'Class 4: Basic Computer Handling & Safety', isUnlockedByAdmin: true }
      ]
    },
    {
      id: 302,
      chapterNumber: 2,
      chapterTitle: 'Chapter 2: Operating System & File Management',
      title: 'Chapter 2: Operating System & File Management',
      description: 'Understanding desktop, files, folders, and operating system basics.',
      isLocked: false,
      classes: [
        { id: 3021, dayNumber: 5, title: 'Class 5: Desktop Screen & Taskbar Basics', isUnlockedByAdmin: true },
        { id: 3022, dayNumber: 6, title: 'Class 6: Creating Files & Folders', isUnlockedByAdmin: true },
        { id: 3023, dayNumber: 7, title: 'Class 7: File Saving & Opening Documents', isUnlockedByAdmin: true },
        { id: 3024, dayNumber: 8, title: 'Class 8: File Management Practices', isUnlockedByAdmin: true }
      ]
    },
    {
      id: 303,
      chapterNumber: 3,
      chapterTitle: 'Chapter 3: Paint & Graphic Editing Skills',
      title: 'Chapter 3: Paint & Graphic Editing Skills',
      description: 'Drawing shapes, coloring, editing digital art, and creative painting tools.',
      isLocked: true,
      classes: [
        { id: 3031, dayNumber: 9, title: 'Class 9: Introduction to Paint Interface & Tools', isUnlockedByAdmin: false },
        { id: 3032, dayNumber: 10, title: 'Class 10: Drawing Shapes & Line Art', isUnlockedByAdmin: false },
        { id: 3033, dayNumber: 11, title: 'Class 11: Color Palette & Bucket Fill Tool', isUnlockedByAdmin: false },
        { id: 3034, dayNumber: 12, title: 'Class 12: Brush Types & Freehand Sketching', isUnlockedByAdmin: false },
        { id: 3035, dayNumber: 13, title: 'Class 13: Text Tool & Labeling Drawings', isUnlockedByAdmin: false },
        { id: 3036, dayNumber: 14, title: 'Class 14: Poster Creation Project', isUnlockedByAdmin: false }
      ]
    },
    {
      id: 304,
      chapterNumber: 4,
      chapterTitle: 'Chapter 4: Typing Practice & Speed Mastery',
      title: 'Chapter 4: Typing Practice & Speed Mastery',
      description: 'Home row finger positioning, typing speed drills, and keyboard accuracy.',
      isLocked: true,
      classes: [
        { id: 3041, dayNumber: 15, title: 'Class 15: Home Row Finger Placement', isUnlockedByAdmin: false },
        { id: 3042, dayNumber: 16, title: 'Class 16: Top Row Keys Practice', isUnlockedByAdmin: false },
        { id: 3043, dayNumber: 17, title: 'Class 17: Bottom Row Keys Practice', isUnlockedByAdmin: false },
        { id: 3044, dayNumber: 18, title: 'Class 18: Word Typing & Accuracy Test', isUnlockedByAdmin: false }
      ]
    },
    {
      id: 305,
      chapterNumber: 5,
      chapterTitle: 'Chapter 5: Handwriting & Letter Skills',
      title: 'Chapter 5: Handwriting & Letter Skills',
      description: 'Digital handwriting practice, letter formation, and neat sentence writing.',
      isLocked: true,
      classes: [
        { id: 3051, dayNumber: 19, title: 'Class 19: Uppercase Letter Formation A-Z', isUnlockedByAdmin: false },
        { id: 3052, dayNumber: 20, title: 'Class 20: Lowercase Letter Formation a-z', isUnlockedByAdmin: false },
        { id: 3053, dayNumber: 21, title: 'Class 21: Sentence Handwriting & Spacing', isUnlockedByAdmin: false }
      ]
    },
    {
      id: 306,
      chapterNumber: 6,
      chapterTitle: 'Chapter 6: Basic Mathematics & Logic Activities',
      title: 'Chapter 6: Basic Mathematics & Logic Activities',
      description: 'Counting puzzles, ascending/descending order, shape logic, and math games.',
      isLocked: true,
      classes: [
        { id: 3061, dayNumber: 22, title: 'Class 22: Number Counting & Logic Puzzles', isUnlockedByAdmin: false },
        { id: 3062, dayNumber: 23, title: 'Class 23: Ascending & Descending Order', isUnlockedByAdmin: false },
        { id: 3063, dayNumber: 24, title: 'Class 24: Shape Recognition & Patterns', isUnlockedByAdmin: false },
        { id: 3064, dayNumber: 25, title: 'Class 25: Interactive Math Games', isUnlockedByAdmin: false }
      ]
    }
  ];

  function getChaptersForGrade(gradeNum) {
    if (gradeNum === 3) {
      if (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades) {
        let g3Obj = COURSES_DATA.grades.find(g => g.gradeNumber === 3);
        if (!g3Obj) {
          g3Obj = { gradeNumber: 3, gradeName: 'CLASS 3rd', chapters: GRADE_3_ALL_6_CHAPTERS };
          COURSES_DATA.grades.push(g3Obj);
        } else if (!g3Obj.chapters || g3Obj.chapters.length < 6) {
          g3Obj.chapters = GRADE_3_ALL_6_CHAPTERS;
        }
      }
      return GRADE_3_ALL_6_CHAPTERS;
    }

    // 1. Try reading from Admin Portal sync storage ('lms_admin_courses')
    try {
      const savedAdminCourses = localStorage.getItem('lms_admin_courses');
      if (savedAdminCourses) {
        const parsed = JSON.parse(savedAdminCourses);
        if (Array.isArray(parsed)) {
          const match = parsed.find(c => c.gradeNumber === gradeNum);
          if (match && match.chapters && match.chapters.length > 0) {
            return match.chapters;
          }
        }
      }
    } catch (e) {}

    // 2. Try window.currentStudentGradeData (from backend API)
    if (window.currentStudentGradeData && window.currentStudentGradeData.gradeNumber === gradeNum) {
      const allChaps = [];
      (window.currentStudentGradeData.terms || []).forEach(term => {
        (term.chapters || []).forEach(c => allChaps.push(c));
      });
      if (allChaps.length > 0) return allChaps;
    }

    // 3. Try COURSES_DATA.grades
    const gradeObj = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades)
      ? COURSES_DATA.grades.find(g => g.gradeNumber === gradeNum)
      : null;
    if (gradeObj && gradeObj.chapters && gradeObj.chapters.length > 0) {
      return gradeObj.chapters;
    }

    return [];
  }

  window.toggleChapterLockForGrade = function (gradeNum, chapNum) {
    let isNowLocked = true;

    // 1. Sync with Admin Portal storage ('lms_admin_courses')
    try {
      const savedAdminCourses = localStorage.getItem('lms_admin_courses');
      if (savedAdminCourses) {
        const parsed = JSON.parse(savedAdminCourses);
        const match = parsed.find(c => c.gradeNumber === gradeNum);
        if (match && match.chapters) {
          const ch = match.chapters.find(c => c.chapterNumber === chapNum || c.id === chapNum);
          if (ch) {
            ch.isLocked = !ch.isLocked;
            isNowLocked = ch.isLocked;
          }
        }
        localStorage.setItem('lms_admin_courses', JSON.stringify(parsed));
      }
    } catch (e) {}

    // 2. Sync with COURSES_DATA
    if (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades) {
      const g = COURSES_DATA.grades.find(item => item.gradeNumber === gradeNum);
      if (g && g.chapters) {
        const ch = g.chapters.find(c => c.chapterNumber === chapNum || c.id === chapNum);
        if (ch) {
          ch.isLocked = !ch.isLocked;
          isNowLocked = ch.isLocked;
        }
      }
    }

    if (window.currentStudentGradeData && window.currentStudentGradeData.gradeNumber === gradeNum) {
      (window.currentStudentGradeData.terms || []).forEach(term => {
        (term.chapters || []).forEach(c => {
          if (c.chapterNumber === chapNum || c.id === chapNum) {
            c.isLocked = isNowLocked;
          }
        });
      });
    }

    // 3. Call backend API if token exists
    const token = localStorage.getItem('lms_token');
    if (token && typeof chapNum === 'number') {
      fetch(`${API_BASE}/admin/chapters/${chapNum}/lock?isLocked=${isNowLocked}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(e => console.warn(e));
    }

    showToast(`Chapter ${chapNum} is now ${isNowLocked ? 'locked 🔒' : 'unlocked 🔓 for students'}!`, isNowLocked ? 'warning' : 'success');
    savePublishedClasses(getPublishedClasses());
    if (typeof window.renderMentorCurriculumGrid === 'function') window.renderMentorCurriculumGrid();
    if (typeof window.renderStudentSubjectsView === 'function') {
      window.renderStudentSubjectsView(gradeNum, 'lessons');
    }
  };

  window.toggleClassLockForGrade = function (gradeNum, classId) {
    let isNowUnlocked = false;

    if (state.unlockedClassIds.includes(classId)) {
      state.unlockedClassIds = state.unlockedClassIds.filter(id => id !== classId);
      isNowUnlocked = false;
    } else {
      state.unlockedClassIds.push(classId);
      isNowUnlocked = true;
    }

    if (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades) {
      const g = COURSES_DATA.grades.find(item => item.gradeNumber === gradeNum);
      if (g && g.chapters) {
        g.chapters.forEach(ch => {
          if (ch.classes) {
            const cls = ch.classes.find(c => c.id === classId);
            if (cls) cls.isUnlockedByAdmin = isNowUnlocked;
          }
        });
      }
    }

    const token = localStorage.getItem('lms_token');
    if (token && typeof classId === 'number') {
      fetch(`${API_BASE}/teacher/classes/${classId}/unlock`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(e => console.warn(e));
    }

    showToast(`Class is now ${isNowUnlocked ? 'unlocked 🔓 for students' : 'locked 🔒'}!`, isNowUnlocked ? 'success' : 'warning');
    savePublishedClasses(getPublishedClasses());
    if (typeof window.renderMentorCurriculumGrid === 'function') window.renderMentorCurriculumGrid();
    if (typeof window.renderStudentSubjectsView === 'function') {
      window.renderStudentSubjectsView(gradeNum, 'lessons');
    }
  };

  // ── Dialog Box Modal for Mentor Chapters & Classes Lock Control ──────────
  window.openMentorChapterClassDialog = function(className, gradeNum = 3) {
    let modal = document.getElementById('modalMentorChapterClassInspector');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalMentorChapterClassInspector';
      modal.className = 'modal-backdrop hidden';
      modal.innerHTML = `
        <div class="modal-card" style="max-width: 640px; width: 92%; max-height: 85vh; overflow-y: auto; border-radius: 16px; background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
          <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
            <h3 class="modal-title" style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 0;" id="mentorInspectorModalTitle">
              <i class="fa-solid fa-list-check text-blue"></i> Chapters & Classes Lock Control
            </h3>
            <button type="button" class="btn-modal-close" id="btnCloseMentorInspectorModal" style="background: none; border: none; font-size: 1.5rem; color: #64748b; cursor: pointer;">&times;</button>
          </div>
          <div class="modal-body" style="padding: 20px; display: flex; flex-direction: column; gap: 14px;" id="mentorInspectorModalBody">
          </div>
          <div class="modal-footer" style="padding: 14px 20px; border-top: 1px solid #e2e8f0; text-align: right; background: #f8fafc; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
            <button type="button" class="btn btn-primary btn-sm" id="btnDoneMentorInspectorModal" style="border-radius: 20px; padding: 8px 24px; font-weight: 600;">
              Done
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('btnCloseMentorInspectorModal')?.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
      document.getElementById('btnDoneMentorInspectorModal')?.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    const titleEl = document.getElementById('mentorInspectorModalTitle');
    if (titleEl) {
      titleEl.innerHTML = `<i class="fa-solid fa-list-check text-blue"></i> Chapters & Classes for ${escapeHtml(className || ('CLASS ' + gradeNum + 'rd'))}`;
    }

    const bodyEl = document.getElementById('mentorInspectorModalBody');
    if (bodyEl) {
      renderDialogChaptersContent(bodyEl, gradeNum);
    }
    modal.classList.remove('hidden');
  };

  // Helper: Dynamically resolve exact Topics Covered PDF, Practical Worksheet PDF & Video URLs for any Grade, Chapter & Class
  window.getClassResourceUrls = function (gradeNum, chapNum, dayNum, classInChapIndex, classObj) {
    const gNum = gradeNum || 3;
    const cNum = chapNum || 1;
    const day = dayNum || 1;
    let inChapNum = classInChapIndex;

    if (!inChapNum) {
      if (gNum === 3) {
        if (day <= 4) inChapNum = day;
        else if (day <= 8) inChapNum = day - 4;
        else if (day <= 14) inChapNum = day - 8;
        else if (day <= 18) inChapNum = day - 14;
        else if (day <= 21) inChapNum = day - 18;
        else inChapNum = day - 21;
      } else {
        inChapNum = ((day - 1) % 4) + 1;
      }
    }

    let topicPdf = classObj?.topicPdf;
    let practicalPdf = classObj?.step5Pdf;
    let videoUrl = classObj?.videoUrl || (classObj?.steps?.step1Video?.videoUrl) || 'https://www.youtube.com/watch?v=Iv8X7aLikLE';

    // If explicit custom URLs are present on classObj (not static fallback to class 1), return them
    if (topicPdf && practicalPdf && !topicPdf.includes('/5th class/chapter 1/class 1/') && !practicalPdf.includes('/5th class/chapter 1/class 1/')) {
      return { topicPdf, practicalPdf, videoUrl };
    }

    if (gNum === 3) {
      if (cNum === 1) {
        const topicNames = { 1: 'Topics Covered.docx', 2: 'Topic Covered.docx', 3: 'TOPIC COVERED.docx', 4: 'TOPIC COVERED.docx' };
        const pracNames = { 1: 'Practical  Activities.docx', 2: 'Practical  Activities.docx', 3: 'Practical Activities.docx', 4: 'Practical  Activities.docx' };
        topicPdf = `/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS ${day}/${topicNames[inChapNum] || 'TOPIC COVERED.docx'}`;
        practicalPdf = `/asset/3rd class/Chapter 1 Computer Fundamentals/CLASSES 1-4/CLASS ${day}/${pracNames[inChapNum] || 'Practical  Activities.docx'}`;
      } else if (cNum === 2) {
        topicPdf = `/asset/3rd class/Chapter 2 English Communication/CLASS 5-8/CLASS ${day}/TOPIC COVERED.docx`;
        practicalPdf = `/asset/3rd class/Chapter 2 English Communication/CLASS 5-8/CLASS ${day}/Practical  Activities.docx`;
      } else if (cNum === 3) {
        topicPdf = `/asset/3rd class/Chapter 3 Paint & Creative Drawing/CLASS 9 -14/CLASS ${day}/TOPIC COVERED.docx`;
        practicalPdf = `/asset/3rd class/Chapter 3 Paint & Creative Drawing/CLASS 9 -14/CLASS ${day}/practical activities.docx`;
      } else if (cNum === 4) {
        topicPdf = `/asset/3rd class/Chapter 4 Typing Practice/CLASSES 15-18/CLASS ${day}/TOPIC COVERED.docx`;
        practicalPdf = `/asset/3rd class/Chapter 4 Typing Practice/CLASSES 15-18/CLASS ${day}/practical activities.docx`;
      } else if (cNum === 5) {
        topicPdf = `/asset/3rd class/Chapter 5 Handwriting Skills/CLASSES 19-21/CLASS ${day}/TOPIC COVERED.docx`;
        practicalPdf = `/asset/3rd class/Chapter 5 Handwriting Skills/CLASSES 19-21/CLASS ${day}/practical activities.docx`;
      } else {
        topicPdf = `/asset/3rd class/Chapter 6 Basic Mathematics Activities/CLASSES 22-25/CLASS ${day}/TOPIC COVERED.docx`;
        practicalPdf = `/asset/3rd class/Chapter 6 Basic Mathematics Activities/CLASSES 22-25/CLASS ${day}/practical activities.docx`;
      }
    } else if (gNum === 5) {
      topicPdf = `/asset/5th class/chapter ${cNum}/class ${inChapNum}/TOPIC COVERED.pdf`;
      practicalPdf = `/asset/5th class/chapter ${cNum}/class ${inChapNum}/practical activities.pdf`;
    } else {
      topicPdf = `/asset/${gNum}th class/chapter ${cNum}/class ${inChapNum}/TOPIC COVERED.pdf`;
      practicalPdf = `/asset/${gNum}th class/chapter ${cNum}/class ${inChapNum}/practical activities.pdf`;
    }

    return { topicPdf, practicalPdf, videoUrl };
  };

  // Open any document (.pdf or .docx) in a new browser tab with embedded viewer page
  window.openDocInNewTab = function (url, title = 'Class Learning Document') {
    if (!url || url === '#') {
      showToast('Document URL is missing.', 'warning');
      return;
    }

    const isPdf = url.toLowerCase().endsWith('.pdf');
    const absoluteUrl = url.startsWith('http') ? url : (window.location.origin + url);

    const newTab = window.open('', '_blank');
    if (!newTab) {
      window.open(absoluteUrl, '_blank');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(title)} — Engloray Learning</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body { font-family: 'Inter', sans-serif; background:#0f172a; color:#1e293b; min-height:100vh; display:flex; flex-direction:column; }
          header { background:#1e293b; padding:14px 28px; border-bottom:1px solid #334155; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:100; box-shadow:0 4px 12px rgba(0,0,0,0.15); }
          .title-wrap { display:flex; align-items:center; gap:12px; }
          .icon-box { width:40px; height:40px; border-radius:10px; background:#2563eb; color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:1.15rem; }
          h1 { font-size:1.05rem; font-weight:700; color:#f8fafc; }
          .actions { display:flex; gap:10px; }
          .btn { padding:8px 18px; border-radius:10px; font-size:0.825rem; font-weight:600; text-decoration:none; cursor:pointer; border:none; display:inline-flex; align-items:center; gap:6px; transition:all 0.2s; }
          .btn-primary { background:#2563eb; color:#ffffff; }
          .btn-primary:hover { background:#1d4ed8; }
          .btn-outline { background:#334155; color:#cbd5e1; }
          .btn-outline:hover { background:#475569; color:#ffffff; }
          .main-viewport { flex:1; padding:32px 16px; background:#0f172a; display:flex; justify-content:center; overflow-y:auto; }
          .document-page { width:100%; max-width:880px; background:#ffffff; border-radius:16px; padding:48px 56px; box-shadow:0 10px 30px rgba(0,0,0,0.3); min-height:80vh; line-height:1.7; font-size:1rem; color:#0f172a; }
          .document-page h1, .document-page h2, .document-page h3 { color:#0f172a; margin-top:24px; margin-bottom:12px; font-weight:700; }
          .document-page p { margin-bottom:14px; color:#334155; }
          .document-page ul, .document-page ol { margin-left:24px; margin-bottom:16px; color:#334155; }
          .document-page table { width:100%; border-collapse:collapse; margin-bottom:20px; }
          .document-page th, .document-page td { border:1px solid #cbd5e1; padding:10px 14px; text-align:left; }
          .document-page th { background:#f1f5f9; font-weight:700; }
          .loading-box { text-align:center; padding:60px 20px; color:#64748b; font-size:1.05rem; font-weight:600; }
          .error-card { text-align:center; padding:40px 20px; color:#ef4444; }
        </style>
      </head>
      <body>
        <header>
          <div class="title-wrap">
            <div class="icon-box"><i class="fa-solid ${isPdf ? 'fa-file-pdf' : 'fa-file-word'}"></i></div>
            <div>
              <h1>${escapeHtml(title)}</h1>
              <span style="font-size:0.75rem; color:#94a3b8;">${isPdf ? 'PDF Document Viewer' : 'Class Word Document (.docx)'}</span>
            </div>
          </div>
          <div class="actions">
            <button onclick="window.print()" class="btn btn-outline"><i class="fa-solid fa-print"></i> Print / Save PDF</button>
            <a href="${absoluteUrl}" download class="btn btn-primary"><i class="fa-solid fa-download"></i> Download File</a>
          </div>
        </header>

        <div class="main-viewport">
          ${isPdf ? `
            <div style="width:100%; height:calc(100vh - 100px); max-width:1100px;">
              <iframe src="${absoluteUrl}#toolbar=1" style="width:100%; height:100%; border:none; border-radius:12px; background:#ffffff;"></iframe>
            </div>
          ` : `
            <div class="document-page" id="docRenderArea">
              <div class="loading-box" id="loadingSpinner">
                <i class="fa-solid fa-circle-notch fa-spin" style="font-size:2.2rem; color:#2563eb; margin-bottom:16px;"></i><br>
                Loading & Rendering Class Document...
              </div>
            </div>
          `}
        </div>

        ${!isPdf ? `
          <script>
            fetch("${absoluteUrl}")
              .then(res => {
                if (!res.ok) throw new Error("HTTP error " + res.status);
                return res.arrayBuffer();
              })
              .then(arrayBuffer => mammoth.convertToHtml({ arrayBuffer: arrayBuffer }))
              .then(result => {
                const renderArea = document.getElementById('docRenderArea');
                if (result.value && result.value.trim().length > 0) {
                  renderArea.innerHTML = result.value;
                } else {
                  renderArea.innerHTML = \`<div class="loading-box" style="color:#0f172a;"><i class="fa-solid fa-file-word" style="font-size:3.5rem; color:#2563eb; margin-bottom:16px;"></i><h3 style="font-size:1.25rem; font-weight:700;">${escapeHtml(title)}</h3><p style="margin-top:8px; font-size:0.9rem; color:#64748b;">Document ready.</p></div>\`;
                }
              })
              .catch(err => {
                console.warn("Mammoth render fallback:", err);
                document.getElementById('docRenderArea').innerHTML = \`
                  <div class="error-card" style="text-align:center;">
                    <i class="fa-solid fa-file-word" style="font-size:3.5rem; color:#2563eb; margin-bottom:16px;"></i>
                    <h2 style="color:#0f172a; font-size:1.3rem; font-weight:700;">${escapeHtml(title)}</h2>
                    <p style="color:#64748b; font-size:0.9rem; margin-top:8px; margin-bottom:24px;">Class document file is ready to download.</p>
                    <a href="${absoluteUrl}" download class="btn btn-primary" style="padding:12px 28px; font-size:0.9rem; display:inline-flex; align-items:center; gap:8px;"><i class="fa-solid fa-download"></i> Download ${escapeHtml(title)}</a>
                  </div>
                \`;
              });
          </script>
        ` : ''}
      </body>
      </html>
    `;

    newTab.document.write(htmlContent);
    newTab.document.close();
  };

  function renderDialogChaptersContent(container, gradeNum) {
    if (!state.expandedMentorChapterKeys) state.expandedMentorChapterKeys = new Set();
    const chapters = getChaptersForGrade(gradeNum);

    const chaptersHtml = chapters.map(chap => {
      const chapNum = chap.chapterNumber || 1;
      const chapKey = 'dialog_grade_' + gradeNum + '_chap_' + chapNum;
      const isChapExpanded = state.expandedMentorChapterKeys.has(chapKey);
      const chapLocked = chap.isLocked === true;
      const classList = chap.classes || (chapNum === 1 && typeof COURSES_DATA !== 'undefined' ? COURSES_DATA.classes : []);

      const classesHtml = classList.map(c => {
        const classUnlocked = (c.isUnlockedByAdmin !== false) || state.unlockedClassIds.includes(c.id);
        const lockIcon = classUnlocked ? 'fa-lock-open' : 'fa-lock';
        const lockText = classUnlocked ? 'Unlocked' : 'Locked';
        const badgeBorder = classUnlocked ? '#10b981' : '#f59e0b';
        const badgeBg = classUnlocked ? '#dcfce7' : '#fef3c7';
        const badgeColor = classUnlocked ? '#15803d' : '#b45309';

        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-radius:10px;border:1px solid #cbd5e1;background:#ffffff;margin-bottom:6px;">
            <div>
              <span style="font-size:0.75rem;font-weight:700;color:#2563eb;background:#eff6ff;padding:2px 8px;border-radius:6px;">Class ${c.dayNumber}</span>
              <span style="font-size:0.875rem;font-weight:600;color:#0f172a;margin-left:8px;">${escapeHtml(c.title)}</span>
            </div>
            <button type="button" class="btn btn-sm btn-dialog-toggle-class" data-grade-num="${gradeNum}" data-class-id="${c.id}"
              style="border-radius:14px;padding:4px 14px;font-weight:700;font-size:0.775rem;border:1px solid ${badgeBorder};background:${badgeBg};color:${badgeColor};cursor:pointer;">
              <i class="fa-solid ${lockIcon}"></i> ${lockText}
            </button>
          </div>
        `;
      }).join('');

      const chapLockIcon = chapLocked ? 'fa-lock' : 'fa-lock-open';
      const chapLockText = chapLocked ? 'Locked' : 'Unlocked';
      const chapBadgeBorder = chapLocked ? '#d97706' : '#10b981';
      const chapBadgeBg = chapLocked ? '#fef3c7' : '#dcfce7';
      const chapBadgeColor = chapLocked ? '#b45309' : '#15803d';
      const chevronIcon = isChapExpanded ? 'fa-chevron-down' : 'fa-chevron-right';
      const panelClass = isChapExpanded ? 'dialog-classes-panel' : 'dialog-classes-panel hidden';
      const chapTitleText = escapeHtml(chap.chapterTitle || chap.title || ('Chapter ' + chapNum));
      const classesBody = classList.length > 0 ? classesHtml : '<p style="font-size:0.825rem;color:#94a3b8;margin:0;">No classes scheduled under this chapter.</p>';

      return `
        <div style="border:1px solid #cbd5e1;border-radius:12px;background:${chapLocked ? '#fffbeb' : '#ffffff'};overflow:hidden;">
          <div class="dialog-chap-row" data-chap-key="${chapKey}" style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;cursor:pointer;background:${chapLocked ? '#fef3c7' : '#ffffff'};">
            <div style="display:flex;align-items:center;gap:10px;flex:1;">
              <i class="fa-solid ${chevronIcon}" style="color:#64748b;font-size:0.85rem;"></i>
              <div>
                <span style="font-weight:700;font-size:0.95rem;color:#0f172a;">${chapTitleText}</span>
                <span style="font-size:0.775rem;color:#64748b;margin-left:8px;">(${classList.length} Classes)</span>
              </div>
            </div>
            <button type="button" class="btn btn-sm btn-dialog-toggle-chap" data-grade-num="${gradeNum}" data-chap-num="${chapNum}"
              style="border-radius:16px;padding:4px 14px;font-weight:700;font-size:0.775rem;border:1px solid ${chapBadgeBorder};background:${chapBadgeBg};color:${chapBadgeColor};cursor:pointer;">
              <i class="fa-solid ${chapLockIcon}"></i> ${chapLockText}
            </button>
          </div>
          <div class="${panelClass}" style="border-top:1px solid #e2e8f0;background:#f8fafc;padding:12px 16px;">
            <div style="font-size:0.775rem;font-weight:700;color:#475569;margin-bottom:8px;text-transform:uppercase;">
              <i class="fa-solid fa-graduation-cap text-blue"></i> Classes under ${chapTitleText}
            </div>
            ${classesBody}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 10px 0;">
        Click any chapter to expand its daily classes dropdown. Use the <strong>Locked / Unlocked</strong> toggle buttons to control student access.
      </p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${chaptersHtml}
      </div>
    `;

    container.querySelectorAll('.dialog-chap-row').forEach(row => {
      row.onclick = (e) => {
        if (e.target.closest('.btn-dialog-toggle-chap')) return;
        const key = row.getAttribute('data-chap-key');
        if (state.expandedMentorChapterKeys.has(key)) {
          state.expandedMentorChapterKeys.delete(key);
        } else {
          state.expandedMentorChapterKeys.add(key);
        }
        renderDialogChaptersContent(container, gradeNum);
      };
    });

    container.querySelectorAll('.btn-dialog-toggle-chap').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const gNum = parseInt(btn.getAttribute('data-grade-num') || '3');
        const cNum = parseInt(btn.getAttribute('data-chap-num') || '1');
        window.toggleChapterLockForGrade(gNum, cNum);
        renderDialogChaptersContent(container, gradeNum);
      };
    });

    container.querySelectorAll('.btn-dialog-toggle-class').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const gNum = parseInt(btn.getAttribute('data-grade-num') || '3');
        const cId = parseInt(btn.getAttribute('data-class-id') || '1');
        window.toggleClassLockForGrade(gNum, cId);
        renderDialogChaptersContent(container, gradeNum);
      };
    });
  }

  // Render Mentor Curriculum Builder Nodes Grid (Image 1 UI)
  window.renderMentorCurriculumGrid = function () {
    const grid = document.getElementById('mentorCurriculumNodesGrid');
    if (!grid) return;

    const list = getPublishedClasses();
    if (list.length === 0) {
      grid.innerHTML = `
        <div class="dashed-empty-card" style="border: 2px dashed #cbd5e1; border-radius: 16px; padding: 48px 24px; text-align: center; background: #ffffff;">
          <div class="empty-icon-box blue-box" style="width: 52px; height: 52px; border-radius: 14px; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.5rem;">
            <i class="fa-solid fa-layer-group"></i>
          </div>
          <h3 class="empty-card-heading" style="font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 4px;">No active curriculum classes</h3>
          <p class="empty-card-subtext" style="font-size: 0.875rem; color: #64748b;">Click <strong>"+ New class"</strong> above to create and publish a new curriculum flow to students.</p>
        </div>
      `;
    } else {
      grid.innerHTML = list.map(cls => {
        const gradeNum = cls.gradeNum || 3;
        const cardId = cls.id || 'class_3';
        return `
          <div class="node-card" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; border-radius: 14px; border: 1px solid #cbd5e1; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.03); margin-bottom: 12px;">
            <div>
              <span class="node-title" style="font-size: 1.1rem; font-weight: 700; color: #0f172a;">${escapeHtml(cls.className || 'CLASS 3rd')}</span>
              <p style="font-size: 0.825rem; color: #64748b; margin-top: 4px;">
                ${escapeHtml(cls.courseName || 'Computer Skills')} &bull; ${escapeHtml(cls.chapTitle || 'Chapter 1')} &bull; <span class="badge badge-success" style="font-size:0.75rem; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:10px;">Published Live for Grade ${gradeNum}</span>
              </p>
            </div>
            <div class="node-actions-group" style="display: flex; gap: 10px; align-items: center;">
              <button type="button" class="btn-node-icon text-muted btn-toggle-lock" data-class-id="${cardId}" title="Lock / Unlock Node">
                <i class="fa-solid ${cls.isUnlocked ? 'fa-lock-open' : 'fa-lock'}"></i>
              </button>
              <button type="button" class="btn-node-icon text-muted btn-edit-node" data-class-name="${escapeHtml(cls.className || 'CLASS 3rd')}" data-grade-num="${gradeNum}" title="Inspect Chapters & Classes (Dialog Box)">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button type="button" class="btn-node-icon text-danger btn-delete-node" data-class-id="${cardId}" title="Delete Node">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');

      grid.querySelectorAll('.btn-toggle-lock').forEach(btn => {
        btn.onclick = (e) => {
          const id = e.currentTarget.getAttribute('data-class-id') || 'class_3';
          window.toggleLockPublishedClass(id);
        };
      });

      // Pencil Edit Icon: Opens the Dialog Box (Modal)!
      grid.querySelectorAll('.btn-edit-node').forEach(btn => {
        btn.onclick = (e) => {
          const className = e.currentTarget.getAttribute('data-class-name') || 'CLASS 3rd';
          const gradeNum = parseInt(e.currentTarget.getAttribute('data-grade-num') || '3');
          window.openMentorChapterClassDialog(className, gradeNum);
        };
      });

      grid.querySelectorAll('.btn-delete-node').forEach(btn => {
        btn.onclick = (e) => {
          const id = e.currentTarget.getAttribute('data-class-id') || 'class_3';
          window.deletePublishedClass(id);
        };
      });
    }
  };

  // Live Broadcast Channel & Local Storage Sync for User Approvals
  const approvalsLiveChannel = window.BroadcastChannel ? new BroadcastChannel('engloray_approvals_live') : null;

  // Load Approval Queue State
  function getApprovalQueue() {
    try {
      const saved = localStorage.getItem('lms_approval_queue_state');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    
    // Default initial queue if empty
    return [
      {
        id: 'user_101',
        name: 'Aarav Patel',
        email: 'aarav.student@school.com',
        role: 'Student',
        grade: 'Grade 4',
        registeredAt: '10 mins ago',
        status: 'PENDING'
      },
      {
        id: 'user_102',
        name: 'Sunita Patel',
        email: 'sunita.parent@school.com',
        role: 'Parent',
        grade: 'Grade 3',
        registeredAt: '25 mins ago',
        status: 'PENDING'
      }
    ];
  }

  function saveApprovalQueue(queue) {
    localStorage.setItem('lms_approval_queue_state', JSON.stringify(queue));
    if (approvalsLiveChannel) {
      try {
        approvalsLiveChannel.postMessage({ type: 'APPROVAL_QUEUE_UPDATE', ts: Date.now() });
      } catch (e) {}
    }
  }

  // Render Mentor Approvals Queue View (Image 1 UI)
  window.renderMentorApprovalsQueue = function () {
    const container = document.getElementById('mentorApprovalsContainer');
    if (!container) return;

    const queue = getApprovalQueue();
    const pendingList = queue.filter(u => u.status === 'PENDING');

    if (pendingList.length === 0) {
      // Clear Queue UI (Exact match to Image 1)
      container.innerHTML = `
        <div class="dashed-empty-card margin-top-lg" style="border: 2px dashed #cbd5e1; border-radius: 16px; padding: 48px 24px; text-align: center; background: #ffffff;">
          <div class="empty-icon-box blue-box" style="width: 52px; height: 52px; border-radius: 14px; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.5rem;">
            <i class="fa-regular fa-user"></i>
          </div>
          <h3 class="empty-card-heading" style="font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 4px;">Queue is clear</h3>
          <p class="empty-card-subtext" style="font-size: 0.875rem; color: #64748b;">Every registration has been reviewed.</p>
        </div>
      `;
    } else {
      // Pending Registrations List
      container.innerHTML = `
        <div class="panel-card-header" style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #0f172a;">
            <i class="fa-solid fa-clock-rotate-left text-blue"></i> Pending Account Registrations (${pendingList.length})
          </h3>
          <span class="badge badge-warning" style="background: #fef3c7; color: #b45309; padding: 4px 12px; border-radius: 12px; font-size: 0.8rem; font-weight: 700;">Action Required</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${pendingList.map(user => `
            <div class="node-card" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; border-radius: 16px; border: 1px solid #cbd5e1; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
              <div style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background: ${user.role === 'Student' ? '#dbeafe' : '#fef3c7'}; color: ${user.role === 'Student' ? '#1e40af' : '#b45309'}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 700;">
                  <i class="fa-solid ${user.role === 'Student' ? 'fa-user-graduate' : 'fa-user-group'}"></i>
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 700; font-size: 1.05rem; color: #0f172a;">${escapeHtml(user.name)}</span>
                    <span class="role-badge ${user.role.toLowerCase()}" style="font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 6px; text-transform: uppercase;">${escapeHtml(user.role)}</span>
                  </div>
                  <p style="font-size: 0.825rem; color: #64748b; margin-top: 2px;">
                    ${escapeHtml(user.email)} &bull; ${escapeHtml(user.grade || 'Grade 4')} &bull; <i class="fa-regular fa-clock"></i> ${escapeHtml(user.registeredAt || 'Just now')}
                  </p>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 10px;">
                <button type="button" class="btn btn-sm btn-approve-user" data-user-id="${user.id}" style="border-radius: 20px; background: #10b981; color: #ffffff; border: none; padding: 8px 18px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-check"></i> Approve Access
                </button>
                <button type="button" class="btn btn-sm btn-reject-user" data-user-id="${user.id}" style="border-radius: 20px; background: #ef4444; color: #ffffff; border: none; padding: 8px 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-xmark"></i> Reject
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Attach Approve & Reject Click Handlers
      container.querySelectorAll('.btn-approve-user').forEach(btn => {
        btn.onclick = (e) => {
          const userId = e.currentTarget.getAttribute('data-user-id');
          approveUserAccount(userId);
        };
      });

      container.querySelectorAll('.btn-reject-user').forEach(btn => {
        btn.onclick = (e) => {
          const userId = e.currentTarget.getAttribute('data-user-id');
          rejectUserAccount(userId);
        };
      });
    }
  };

  function approveUserAccount(userId) {
    const queue = getApprovalQueue();
    const target = queue.find(u => u.id === userId);
    if (target) {
      target.status = 'APPROVED';
      saveApprovalQueue(queue);
      renderMentorApprovalsQueue();
      showToast(`✅ Approved account for ${target.name}!`, 'success');
    }
  }

  function rejectUserAccount(userId) {
    const queue = getApprovalQueue();
    const target = queue.find(u => u.id === userId);
    if (target) {
      target.status = 'REJECTED';
      saveApprovalQueue(queue);
      renderMentorApprovalsQueue();
      showToast(`❌ Rejected account request for ${target.name}.`, 'error');
    }
  }

  // Check Approval Status for Logged-In Student/Parent
  function checkStudentApprovalStatus(email) {
    const queue = getApprovalQueue();
    const found = queue.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (found && found.status === 'PENDING') {
      // Show Hourglass Pending Modal (Image 2 UI)
      const modal = document.getElementById('modalPendingApproval');
      if (modal) modal.classList.remove('hidden');
      return false; // Not approved
    }

    if (found && found.status === 'REJECTED') {
      showToast('❌ Your account registration was rejected by the mentor.', 'error');
      showAuthPage('studentSignInPage', '/login/student');
      return false;
    }

    // Approved or Default active student
    const modal = document.getElementById('modalPendingApproval');
    if (modal) modal.classList.add('hidden');
    return true; // Approved
  }

  let currentMentorUserRoleFilter = 'STUDENT'; // 'STUDENT' | 'PARENT'
  let cachedStudentsList = [];
  let cachedParentsList = [];

  window.renderMentorStudentsView = async function () {
    const tableBody = document.getElementById('mentorStudentsTableBody');
    if (!tableBody) return;

    const tok = localStorage.getItem('lms_token');
    const headers = tok ? { 'Authorization': `Bearer ${tok}` } : {};

    // 1. Fetch Students & Parents from Backend API
    try {
      const resS = await fetch(`${API_BASE}/admin/students`, { headers });
      if (resS.ok) {
        const data = await resS.json();
        if (Array.isArray(data)) cachedStudentsList = data;
      }
    } catch (e) {
      console.warn('[LMS] Could not fetch students from backend:', e);
    }

    try {
      const resP = await fetch(`${API_BASE}/admin/parents`, { headers });
      if (resP.ok) {
        const data = await resP.json();
        if (Array.isArray(data)) cachedParentsList = data;
      }
    } catch (e) {
      console.warn('[LMS] Could not fetch parents from backend:', e);
    }

    // 2. Local storage sync pool
    const localUsers = JSON.parse(localStorage.getItem('lms_registered_users') || '[]');

    const seedStudents = [
      { id: 901, fullName: 'Englorayman JD', email: 'jdenglorayman@gmail.com', gradeNumber: 3, section: '', status: 'Approved', role: 'ROLE_STUDENT' },
      { id: 902, fullName: 'SRIRAM Mayan', email: 'mayansriram@gmail.com', gradeNumber: 3, section: '', status: 'Approved', role: 'ROLE_STUDENT' },
      { id: 903, fullName: 'GOWTHAM D', email: 'gowthamd244@gmail.com', gradeNumber: 3, section: '', status: 'Approved', role: 'ROLE_STUDENT' }
    ];

    const seedParents = [
      { id: 904, fullName: 'Alex Parent', email: 'alex.parent@gmail.com', gradeNumber: 3, section: '', status: 'Approved', role: 'ROLE_PARENT' },
      { id: 905, fullName: 'Sam Parent', email: 'sam.parent@gmail.com', gradeNumber: 3, section: '', status: 'Approved', role: 'ROLE_PARENT' }
    ];

    // Combine backend + local sync users
    let studentsPool = [...cachedStudentsList];
    localUsers.forEach(lu => {
      const isStud = lu.role === 'ROLE_STUDENT' || lu.role === 'STUDENT';
      if (isStud && !studentsPool.some(s => s.email && lu.email && s.email.toLowerCase() === lu.email.toLowerCase())) {
        studentsPool.push(lu);
      }
    });
    if (studentsPool.length === 0) studentsPool = seedStudents;

    let parentsPool = [...cachedParentsList];
    localUsers.forEach(lu => {
      const isParent = lu.role === 'ROLE_PARENT' || lu.role === 'PARENT';
      if (isParent && !parentsPool.some(p => p.email && lu.email && p.email.toLowerCase() === lu.email.toLowerCase())) {
        parentsPool.push(lu);
      }
    });
    if (parentsPool.length === 0) parentsPool = seedParents;

    const activeList = currentMentorUserRoleFilter === 'STUDENT' ? studentsPool : parentsPool;

    tableBody.innerHTML = activeList.map(user => {
      const isApproved = (user.status === 'Approved' || !user.status);
      const isPending = user.status === 'Pending';
      const isDisabled = user.status === 'Disabled';
      const badgeClass = isApproved ? 'approved' : (isPending ? 'pending' : 'disabled');
      const uGrade = user.gradeNumber || 3;
      const uSection = user.section || '';

      return `
        <tr data-user-id="${user.id}" data-user-email="${escapeHtml(user.email || '')}">
          <td>
            <div class="user-table-name">${escapeHtml(user.fullName || 'User Account')}</div>
            <div class="user-table-email">${escapeHtml(user.email || '')}</div>
          </td>
          <td>
            <select class="table-select-clean user-grade-select" data-user-id="${user.id}">
              <option value="1" ${uGrade === 1 ? 'selected' : ''}>CLASS 1st</option>
              <option value="2" ${uGrade === 2 ? 'selected' : ''}>CLASS 2nd</option>
              <option value="3" ${uGrade === 3 ? 'selected' : ''}>CLASS 3rd</option>
              <option value="4" ${uGrade === 4 ? 'selected' : ''}>CLASS 4th</option>
              <option value="5" ${uGrade === 5 ? 'selected' : ''}>CLASS 5th</option>
            </select>
          </td>
          <td>
            <input type="text" class="table-input-clean user-section-input" data-user-id="${user.id}" value="${escapeHtml(uSection)}" placeholder="">
          </td>
          <td>
            <select class="status-select-badge ${badgeClass} user-status-select" data-user-id="${user.id}">
              <option value="Approved" ${isApproved ? 'selected' : ''}>Approved</option>
              <option value="Pending" ${isPending ? 'selected' : ''}>Pending</option>
              <option value="Disabled" ${isDisabled ? 'selected' : ''}>Disabled</option>
            </select>
          </td>
          <td class="text-right">
            <button type="button" class="btn-node-icon text-danger btn-delete-user" data-user-id="${user.id}" title="Delete account">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row handlers
    tableBody.querySelectorAll('.user-grade-select').forEach(sel => {
      sel.onchange = (e) => updateUserField(e.target.getAttribute('data-user-id'), { gradeNumber: parseInt(e.target.value) });
    });

    tableBody.querySelectorAll('.user-section-input').forEach(inp => {
      inp.onblur = (e) => updateUserField(e.target.getAttribute('data-user-id'), { section: e.target.value.trim() });
    });

    tableBody.querySelectorAll('.user-status-select').forEach(sel => {
      sel.onchange = (e) => {
        const val = e.target.value;
        sel.className = `status-select-badge ${val.toLowerCase()} user-status-select`;
        updateUserField(sel.getAttribute('data-user-id'), { status: val });
      };
    });

    tableBody.querySelectorAll('.btn-delete-user').forEach(btn => {
      btn.onclick = (e) => deleteUserAccount(btn.getAttribute('data-user-id'), btn.closest('tr'));
    });
  };

  async function updateUserField(userId, updates) {
    const tok = localStorage.getItem('lms_token');
    if (tok && userId && !isNaN(parseInt(userId))) {
      try {
        const query = new URLSearchParams(updates).toString();
        await fetch(`${API_BASE}/admin/users/${userId}/status?${query}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${tok}` }
        });
      } catch (e) {
        console.warn('Backend update failed:', e);
      }
    }
    try {
      const localUsers = JSON.parse(localStorage.getItem('lms_registered_users') || '[]');
      const match = localUsers.find(u => String(u.id) === String(userId));
      if (match) {
        Object.assign(match, updates);
        localStorage.setItem('lms_registered_users', JSON.stringify(localUsers));
      }
    } catch (e) {}
  }

  async function deleteUserAccount(userId, trElement) {
    if (trElement) trElement.remove();
    const tok = localStorage.getItem('lms_token');
    if (tok && userId && !isNaN(parseInt(userId))) {
      try {
        await fetch(`${API_BASE}/admin/users/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${tok}` }
        });
      } catch (e) {
        console.warn('Backend delete failed:', e);
      }
    }
    try {
      let localUsers = JSON.parse(localStorage.getItem('lms_registered_users') || '[]');
      localUsers = localUsers.filter(u => String(u.id) !== String(userId));
      localStorage.setItem('lms_registered_users', JSON.stringify(localUsers));
    } catch (e) {}
    showToast('User account removed.', 'warning');
  }

  // Hook tab switching buttons
  document.getElementById('tabMentorStudents')?.addEventListener('click', () => {
    currentMentorUserRoleFilter = 'STUDENT';
    document.getElementById('tabMentorStudents')?.classList.add('active');
    document.getElementById('tabMentorParents')?.classList.remove('active');
    window.renderMentorStudentsView();
  });

  document.getElementById('tabMentorParents')?.addEventListener('click', () => {
    currentMentorUserRoleFilter = 'PARENT';
    document.getElementById('tabMentorParents')?.classList.add('active');
    document.getElementById('tabMentorStudents')?.classList.remove('active');
    window.renderMentorStudentsView();
  });

  // Listen for Live Cross-Tab Curriculum Published Updates
  if (curriculumLiveChannel) {
    curriculumLiveChannel.onmessage = function (event) {
      if (event.data && event.data.type === 'CURRICULUM_PUBLISHED_UPDATE') {
        renderMentorCurriculumGrid();
        if (typeof window.renderStudentSubjectsView === 'function') {
          window.renderStudentSubjectsView(3, 'lessons');
        }
      }
    };
  }

  // Listen for Live Cross-Tab Approval Updates
  if (approvalsLiveChannel) {
    approvalsLiveChannel.onmessage = function (event) {
      if (event.data && event.data.type === 'APPROVAL_QUEUE_UPDATE') {
        renderMentorApprovalsQueue();
        const activeEmail = localStorage.getItem('lms_current_user_email');
        if (activeEmail) {
          checkStudentApprovalStatus(activeEmail);
        }
      }
    };
  }

  window.addEventListener('storage', function (e) {
    if (e.key === 'lms_approval_queue_state') {
      renderMentorApprovalsQueue();
      const activeEmail = localStorage.getItem('lms_current_user_email');
      if (activeEmail) {
        checkStudentApprovalStatus(activeEmail);
      }
    }
  });

  let currentStudentNavLevel = 'terms'; // 'terms' | 'chapters' | 'workspace'
  let currentSelectedChapterId = null;
  let currentSelectedTermId = null;

  // ── Render Subjects & Lessons for Student ─────────────────────────────────
  // 3-level drilldown: Terms → Chapters → DayClasses (workspace entry)
  // Data comes from window.currentStudentGradeData (backend) with COURSES_DATA fallback
  window.renderStudentSubjectsView = function (gradeNum = 3, tab = 'lessons', level = null) {
    if (level) currentStudentNavLevel = level;

    const container = document.getElementById('studentSubjectsTabContent');
    const breadcrumbEl = document.getElementById('studentSubjectsBreadcrumbText');
    if (!container) return;

    // ── Resolve Terms from Backend or Fallback ────────────────────────────
    // Backend data: window.currentStudentGradeData.terms[]
    // Fallback: COURSES_DATA.grades[gradeNum].chapters[] (re-interpreted as Term 1 chapters)
    const backendGrade = window.currentStudentGradeData && window.currentStudentGradeData.gradeNumber === gradeNum
      ? window.currentStudentGradeData
      : null;

    const termsList = backendGrade && backendGrade.terms && backendGrade.terms.length > 0
      ? backendGrade.terms
      : [{ id: null, termNumber: 1, title: 'Term 1', chapters: null }]; // fallback single term

    const gradeName = backendGrade ? backendGrade.name : `CLASS ${gradeNum}rd`;
    const currentTerm = termsList.find(t => t.id === currentSelectedTermId) || termsList[0];

    // ── Helper to get chapters list for current term ──────────────────────
    function getChaptersForTerm(term) {
      if (term && term.chapters && term.chapters.length > 0) return term.chapters;
      // COURSES_DATA fallback
      const gradeObj = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades)
        ? COURSES_DATA.grades.find(g => g.gradeNumber === gradeNum)
        : null;
      if (gradeObj && gradeObj.chapters) {
        return gradeObj.chapters.map((ch, i) => ({
          id: null,
          chapterNumber: ch.chapterNumber || i + 1,
          title: ch.chapterTitle || `Chapter ${i + 1}`,
          description: ch.description || '',
          isLocked: ch.isLockedByAdmin === true ? true : (ch.isLocked === true),
          dayClasses: ch.classes || []
        }));
      }
      return [];
    }

    // Back button handler
    const btnBack = document.getElementById('btnStudentBackToChapters');
    if (btnBack) {
      btnBack.onclick = () => {
        if (currentStudentNavLevel === 'workspace') {
          currentStudentNavLevel = 'chapters';
          window.renderStudentSubjectsView(gradeNum, tab);
        } else if (currentStudentNavLevel === 'chapters') {
          currentStudentNavLevel = 'terms';
          window.renderStudentSubjectsView(gradeNum, tab);
        } else {
          showStudentPortal('studentDashboardView', '/student/dashboard');
        }
      };
    }

    // Tab click handlers
    ['tabSubjLessons', 'tabSubjEndActivities', 'tabSubjAssignments', 'tabSubjActivities', 'tabSubjResources'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('active');
        el.onclick = () => {
          const targetTab = id.replace('tabSubj', '').toLowerCase();
          window.renderStudentSubjectsView(gradeNum, targetTab);
        };
      }
    });
    const activeTabEl = document.getElementById(`tabSubj${tab.charAt(0).toUpperCase() + tab.slice(1)}`);
    if (activeTabEl) activeTabEl.classList.add('active');

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // LEVEL 1: TERMS CARDS
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (currentStudentNavLevel === 'terms') {
      if (breadcrumbEl) {
        breadcrumbEl.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.875rem;">
            <button type="button" onclick="window.renderStudentSubjectsView(${gradeNum},'${tab}','terms')" style="border-radius:20px;padding:4px 14px;background:#eff6ff;color:#2563eb;font-weight:700;border:none;cursor:pointer;">
              <i class="fa-solid fa-layer-group"></i> Classes
            </button>
            <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;color:#94a3b8;"></i>
            <button type="button" onclick="window.renderStudentSubjectsView(${gradeNum},'${tab}','terms')" style="border-radius:20px;padding:4px 14px;background:#eff6ff;color:#2563eb;font-weight:700;border:none;cursor:pointer;">
              <i class="fa-solid fa-graduation-cap"></i> ${escapeHtml(gradeName)}
            </button>
            <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;color:#94a3b8;"></i>
            <span style="border-radius:20px;padding:4px 14px;background:#2563eb;color:#ffffff;font-weight:700;">
              <i class="fa-solid fa-calendar-days"></i> Terms
            </span>
          </div>
        `;
      }

      container.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;background:#ffffff;padding:16px 20px;border-radius:14px;border:1px solid #e2e8f0;">
            <div>
              <h3 style="font-size:1.15rem;font-weight:700;color:#0f172a;margin-bottom:2px;">
                <i class="fa-solid fa-calendar-days text-blue"></i> Scheduled Terms (${escapeHtml(gradeName)})
              </h3>
              <p style="font-size:0.825rem;color:#64748b;">Click a term card to view all scheduled chapters and lessons.</p>
            </div>
            <span style="font-size:0.775rem;background:#dcfce7;color:#15803d;padding:4px 12px;border-radius:12px;font-weight:700;">
              ${termsList.length} Term${termsList.length !== 1 ? 's' : ''} Active
            </span>
          </div>

          ${termsList.map((term, idx) => `
            <div class="node-card term-interactive-card" id="btnStudentSelectTerm_${idx}"
              style="cursor:pointer;background:#ffffff;border:1px solid #cbd5e1;border-radius:16px;padding:22px 28px;box-shadow:0 4px 12px rgba(0,0,0,0.03);transition:all 0.2s ease;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <h3 style="font-size:1.3rem;font-weight:800;color:#0f172a;font-family:'Outfit',sans-serif;margin-bottom:4px;">
                  ${escapeHtml(term.title || `TERM ${term.termNumber}`)} !
                </h3>
                <p style="font-size:0.85rem;color:#64748b;margin:0;">
                  ${escapeHtml(gradeName)} • ${(term.chapters && term.chapters.length > 0) ? term.chapters.length + ' Chapters' : 'View Chapters'}
                </p>
              </div>
              <div style="display:flex;align-items:center;gap:12px;">
                <span style="font-size:0.775rem;font-weight:700;color:#10b981;background:#dcfce7;padding:4px 12px;border-radius:10px;">
                  <i class="fa-solid fa-lock-open"></i> Active
                </span>
                <button type="button" class="btn btn-primary btn-sm" style="border-radius:20px;font-weight:600;padding:8px 18px;">
                  View Chapters &rarr;
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      termsList.forEach((term, idx) => {
        document.getElementById(`btnStudentSelectTerm_${idx}`)?.addEventListener('click', () => {
          currentSelectedTermId = term.id;
          currentStudentNavLevel = 'chapters';
          window.renderStudentSubjectsView(gradeNum, tab);
        });
      });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // LEVEL 2: CHAPTERS UNDER SELECTED TERM
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    } else if (currentStudentNavLevel === 'chapters') {
      const chaptersList = getChaptersForTerm(currentTerm);
      const termTitle = currentTerm ? (currentTerm.title || `TERM ${currentTerm.termNumber}`) : 'TERM 1';

      if (breadcrumbEl) {
        breadcrumbEl.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.875rem;">
            <button type="button" onclick="window.renderStudentSubjectsView(${gradeNum},'${tab}','terms')" style="border-radius:20px;padding:4px 14px;background:#eff6ff;color:#2563eb;font-weight:700;border:none;cursor:pointer;">
              <i class="fa-solid fa-layer-group"></i> Classes
            </button>
            <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;color:#94a3b8;"></i>
            <button type="button" onclick="window.renderStudentSubjectsView(${gradeNum},'${tab}','terms')" style="border-radius:20px;padding:4px 14px;background:#eff6ff;color:#2563eb;font-weight:700;border:none;cursor:pointer;">
              <i class="fa-solid fa-graduation-cap"></i> ${escapeHtml(gradeName)}
            </button>
            <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;color:#94a3b8;"></i>
            <span style="border-radius:20px;padding:4px 14px;background:#2563eb;color:#ffffff;font-weight:700;">
              <i class="fa-solid fa-calendar-check"></i> ${escapeHtml(termTitle)} !
            </span>
          </div>
        `;
      }

      container.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;background:#ffffff;padding:16px 20px;border-radius:14px;border:1px solid #e2e8f0;">
            <div>
              <h3 style="font-size:1.15rem;font-weight:700;color:#0f172a;margin-bottom:2px;">
                <i class="fa-solid fa-book-open text-blue"></i> Chapters under ${escapeHtml(termTitle)} (${escapeHtml(gradeName)})
              </h3>
              <p style="font-size:0.825rem;color:#64748b;">Unlocked chapters can be opened to launch the 5-step learning workspace.</p>
            </div>
            <span style="font-size:0.775rem;background:#eff6ff;color:#2563eb;padding:4px 12px;border-radius:12px;font-weight:700;">
              ${chaptersList.length} Chapter${chaptersList.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;">
            ${chaptersList.length === 0 ? `
              <div style="border:2px dashed #cbd5e1;border-radius:16px;padding:48px 24px;text-align:center;background:#ffffff;">
                <i class="fa-solid fa-book-open" style="font-size:2rem;color:#94a3b8;margin-bottom:12px;"></i>
                <h3 style="font-weight:700;color:#0f172a;">No chapters yet</h3>
                <p style="color:#64748b;font-size:0.875rem;">Your mentor hasn't scheduled any chapters for this term yet.</p>
              </div>
            ` : chaptersList.map((chap, idx) => {
              const chapUnlocked = chap.isLocked !== true;
              return `
                <div class="node-card chapter-card-item" id="btnStudentLaunchChap_${idx}"
                  style="cursor:${chapUnlocked ? 'pointer' : 'not-allowed'};background:${chapUnlocked ? '#ffffff' : '#f8fafc'};border:1px solid ${chapUnlocked ? '#cbd5e1' : '#e2e8f0'};border-radius:16px;padding:18px 24px;box-shadow:0 3px 10px rgba(0,0,0,0.03);transition:all 0.2s ease;display:flex;justify-content:space-between;align-items:center;opacity:${chapUnlocked ? '1' : '0.85'};">
                  <div>
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
                      <span style="font-size:0.75rem;font-weight:700;color:#2563eb;background:#eff6ff;padding:3px 10px;border-radius:8px;">
                        Chapter ${chap.chapterNumber}
                      </span>
                      <span style="font-size:1.05rem;font-weight:700;color:#0f172a;font-family:'Outfit',sans-serif;">
                        ${escapeHtml(chap.title || chap.chapterTitle || `Chapter ${chap.chapterNumber}`)}
                      </span>
                    </div>
                    <p style="font-size:0.825rem;color:#64748b;margin:0;">
                      ${escapeHtml(chap.description || 'Master core concepts with video, topics PDF, interactive portal, quiz and practical task.')}
                    </p>
                  </div>
                  <div style="display:flex;align-items:center;gap:12px;">
                    <span style="font-size:0.775rem;font-weight:700;color:${chapUnlocked ? '#10b981' : '#d97706'};background:${chapUnlocked ? '#dcfce7' : '#fef3c7'};padding:4px 12px;border-radius:10px;">
                      <i class="fa-solid ${chapUnlocked ? 'fa-lock-open' : 'fa-lock'}"></i> ${chapUnlocked ? 'Unlocked' : 'Locked by Mentor'}
                    </span>
                    <button type="button" class="btn ${chapUnlocked ? 'btn-primary' : 'btn-outline'} btn-sm" style="border-radius:20px;font-weight:600;padding:6px 16px;font-size:0.825rem;">
                      ${chapUnlocked ? 'Open Chapter &rarr;' : '🔒 Locked'}
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      chaptersList.forEach((chap, idx) => {
        const chapUnlocked = chap.isLocked !== true;
        document.getElementById(`btnStudentLaunchChap_${idx}`)?.addEventListener('click', () => {
          if (!chapUnlocked) {
            showToast(`🔒 Chapter ${chap.chapterNumber} is currently locked by your Mentor. Please ask your mentor to unlock it.`, 'warning');
            return;
          }
          currentSelectedChapterId = chap.id || chap.chapterNumber;
          currentStudentNavLevel = 'workspace';
          window.renderStudentSubjectsView(gradeNum, tab);
        });
      });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // LEVEL 3: CHAPTER WORKSPACE — DayClasses from Backend
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    } else {
      const chaptersList = getChaptersForTerm(currentTerm);
      // Find the selected chapter (by backend id or chapterNumber fallback)
      const selectedChap = chaptersList.find(c => c.id === currentSelectedChapterId || c.chapterNumber === currentSelectedChapterId) || chaptersList[0];
      const chapTitle = selectedChap ? (selectedChap.title || selectedChap.chapterTitle || `Chapter ${selectedChap ? selectedChap.chapterNumber : 1}`) : 'Chapter';
      const termTitle = currentTerm ? (currentTerm.title || `TERM ${currentTerm.termNumber}`) : 'TERM 1';

      if (breadcrumbEl) {
        breadcrumbEl.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.875rem;">
            <button type="button" onclick="window.renderStudentSubjectsView(${gradeNum},'${tab}','terms')" style="border-radius:20px;padding:4px 14px;background:#eff6ff;color:#2563eb;font-weight:700;border:none;cursor:pointer;">
              <i class="fa-solid fa-layer-group"></i> Classes
            </button>
            <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;color:#94a3b8;"></i>
            <button type="button" onclick="window.renderStudentSubjectsView(${gradeNum},'${tab}','terms')" style="border-radius:20px;padding:4px 14px;background:#eff6ff;color:#2563eb;font-weight:700;border:none;cursor:pointer;">
              <i class="fa-solid fa-graduation-cap"></i> ${escapeHtml(gradeName)}
            </button>
            <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;color:#94a3b8;"></i>
            <button type="button" onclick="window.renderStudentSubjectsView(${gradeNum},'${tab}','chapters')" style="border-radius:20px;padding:4px 14px;background:#eff6ff;color:#2563eb;font-weight:700;border:none;cursor:pointer;">
              <i class="fa-solid fa-calendar-check"></i> ${escapeHtml(termTitle)} !
            </button>
            <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;color:#94a3b8;"></i>
            <span style="border-radius:20px;padding:4px 14px;background:#2563eb;color:#ffffff;font-weight:700;">
              <i class="fa-solid fa-book-open"></i> ${escapeHtml(chapTitle)}
            </span>
          </div>
        `;
      }

      if (tab === 'lessons') {
        // Show loading state while fetching dayClasses from backend
        container.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;background:#ffffff;padding:16px 20px;border-radius:14px;border:1px solid #e2e8f0;">
              <div>
                <h3 style="font-size:1.15rem;font-weight:700;color:#0f172a;margin-bottom:2px;">
                  <i class="fa-solid fa-circle-play text-blue"></i> Daily Lessons & Learning Activities
                </h3>
                <p style="font-size:0.825rem;color:#64748b;">${escapeHtml(chapTitle)} — Click a class card to launch the interactive 5-step workspace.</p>
              </div>
            </div>
            <div id="dayClassesContainer" style="display:flex;flex-direction:column;gap:12px;">
              <div style="text-align:center;padding:32px;color:#64748b;">
                <i class="fa-solid fa-circle-notch fa-spin" style="font-size:1.5rem;color:#2563eb;margin-bottom:12px;"></i>
                <p>Loading classes...</p>
              </div>
            </div>
          </div>
        `;

        // Async: fetch chapter details (with dayClasses) from backend
        (async () => {
          const token = localStorage.getItem('lms_token');
          let dayClasses = [];
          let loadedFromBackend = false;

          // Try backend API first (if we have a real chapter id and token)
          if (token && selectedChap && selectedChap.id && typeof selectedChap.id === 'number') {
            try {
              const res = await fetch(`${API_BASE}/courses/chapters/${selectedChap.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (res.ok) {
                const chapData = await res.json();
                if (chapData && chapData.dayClasses) {
                  dayClasses = chapData.dayClasses;
                  loadedFromBackend = true;
                }
              }
            } catch (e) {
              console.warn('[LMS] Could not load chapter dayClasses from backend:', e);
            }
          }

          // Fallback: use COURSES_DATA local classes
          if (!loadedFromBackend) {
            const gradeObj = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades)
              ? COURSES_DATA.grades.find(g => g.gradeNumber === gradeNum) : null;
            if (gradeObj && gradeObj.chapters && gradeObj.chapters.length > 0) {
              const localChap = gradeObj.chapters[0];
              if (localChap && localChap.classes) {
                dayClasses = localChap.classes.map(c => ({
                  id: c.id,
                  dayNumber: c.dayNumber,
                  topicTitle: c.title,
                  topicDescription: c.description,
                  isUnlockedByAdmin: state.unlockedClassIds.includes(c.id) || c.isUnlockedByAdmin !== false,
                  isAccessibleForStudent: state.unlockedClassIds.includes(c.id),
                  isClassFullyCompleted: isClass100PercentCompleted(c.id)
                }));
              }
            }
            if (dayClasses.length === 0 && typeof COURSES_DATA !== 'undefined' && COURSES_DATA.classes) {
              dayClasses = COURSES_DATA.classes.map(c => ({
                id: c.id,
                dayNumber: c.dayNumber,
                topicTitle: c.title,
                topicDescription: c.description,
                isUnlockedByAdmin: state.unlockedClassIds.includes(c.id),
                isAccessibleForStudent: state.unlockedClassIds.includes(c.id),
                isClassFullyCompleted: isClass100PercentCompleted(c.id)
              }));
            }
          }

          const dcContainer = document.getElementById('dayClassesContainer');
          if (!dcContainer) return;

          if (dayClasses.length === 0) {
            dcContainer.innerHTML = `
              <div style="border:2px dashed #cbd5e1;border-radius:16px;padding:48px 24px;text-align:center;background:#ffffff;">
                <i class="fa-solid fa-book-open" style="font-size:2rem;color:#94a3b8;margin-bottom:12px;"></i>
                <h3 style="font-weight:700;color:#0f172a;">No classes scheduled yet</h3>
                <p style="color:#64748b;font-size:0.875rem;">Your mentor hasn't added any class sessions for this chapter yet.</p>
              </div>
            `;
            return;
          }

          dcContainer.innerHTML = dayClasses.map((dc, idx) => {
            const accessible = Boolean(dc.isAccessibleForStudent);
            const unlocked = Boolean(dc.isUnlockedByAdmin);
            const completed = Boolean(dc.isClassFullyCompleted);

            let statusBadge, btnHtml;
            if (completed) {
              statusBadge = `<span style="font-size:0.75rem;font-weight:700;color:#10b981;background:#dcfce7;padding:4px 12px;border-radius:10px;"><i class="fa-solid fa-circle-check"></i> Completed</span>`;
              btnHtml = `<button type="button" class="btn btn-sm btn-outline" style="border-radius:20px;font-weight:600;padding:6px 16px;font-size:0.825rem;border-color:#10b981;color:#10b981;" data-dc-idx="${idx}">Review &rarr;</button>`;
            } else if (accessible) {
              statusBadge = `<span style="font-size:0.75rem;font-weight:700;color:#2563eb;background:#eff6ff;padding:4px 12px;border-radius:10px;"><i class="fa-solid fa-lock-open"></i> Unlocked</span>`;
              btnHtml = `<button type="button" class="btn btn-primary btn-sm" style="border-radius:20px;font-weight:600;padding:6px 16px;font-size:0.825rem;" data-dc-idx="${idx}">Start &rarr;</button>`;
            } else if (unlocked) {
              statusBadge = `<span style="font-size:0.75rem;font-weight:700;color:#f59e0b;background:#fef3c7;padding:4px 12px;border-radius:10px;"><i class="fa-solid fa-hourglass-half"></i> Complete Previous</span>`;
              btnHtml = `<button type="button" class="btn btn-sm btn-outline" style="border-radius:20px;font-weight:600;padding:6px 16px;font-size:0.825rem;opacity:0.6;" disabled>Locked</button>`;
            } else {
              statusBadge = `<span style="font-size:0.75rem;font-weight:700;color:#d97706;background:#fef3c7;padding:4px 12px;border-radius:10px;"><i class="fa-solid fa-lock"></i> Locked by Mentor</span>`;
              btnHtml = `<button type="button" class="btn btn-sm btn-outline" style="border-radius:20px;font-weight:600;padding:6px 16px;font-size:0.825rem;opacity:0.6;" disabled>🔒 Locked</button>`;
            }

            return `
              <div class="node-card day-class-card" id="dcCard_${idx}"
                style="cursor:${accessible ? 'pointer' : 'default'};background:${accessible ? '#ffffff' : '#f8fafc'};border:1px solid ${accessible ? '#cbd5e1' : '#e2e8f0'};border-radius:16px;padding:18px 24px;box-shadow:0 3px 10px rgba(0,0,0,0.03);transition:all 0.2s ease;display:flex;justify-content:space-between;align-items:center;opacity:${accessible || unlocked ? '1' : '0.8'};">
                <div>
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;">
                    <span style="font-size:0.75rem;font-weight:700;color:#2563eb;background:#eff6ff;padding:3px 10px;border-radius:8px;">
                      Class ${dc.dayNumber}
                    </span>
                    <span style="font-size:1.05rem;font-weight:700;color:#0f172a;font-family:'Outfit',sans-serif;">
                      ${escapeHtml(dc.topicTitle || `Class ${dc.dayNumber}`)}
                    </span>
                  </div>
                  <p style="font-size:0.825rem;color:#64748b;margin:0;">
                    ${escapeHtml(dc.topicDescription || '5 Steps: Video, Topics PDF, Interactive Portal, Quiz, Practical Task')}
                  </p>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  ${statusBadge}
                  ${btnHtml}
                </div>
              </div>
            `;
          }).join('');

          // Attach click handlers to accessible classes
          dayClasses.forEach((dc, idx) => {
            const accessible = Boolean(dc.isAccessibleForStudent);
            const unlocked = Boolean(dc.isUnlockedByAdmin);
            const completed = Boolean(dc.isClassFullyCompleted);
            if (!accessible && !completed) return;

            document.getElementById(`dcCard_${idx}`)?.addEventListener('click', () => {
              // Find matching class in COURSES_DATA by dayNumber
              const matchingClass = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.classes)
                ? COURSES_DATA.classes.find(c => c.dayNumber === dc.dayNumber)
                : null;

              if (matchingClass) {
                showStudentPortal('studentLearningPageWrapper', `/grade-${gradeNum}/chapter-1/class-${dc.dayNumber}`);
                loadClassView(matchingClass.id, false);
              } else if (typeof dc.id === 'number' && dc.id > 0) {
                // Use backend id directly if COURSES_DATA doesn't have it
                showStudentPortal('studentLearningPageWrapper', `/grade-${gradeNum}/chapter-1/class-${dc.dayNumber}`);
                // Try loading by COURSES_DATA position
                const gradeObj = (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.grades)
                  ? COURSES_DATA.grades.find(g => g.gradeNumber === gradeNum) : null;
                const firstChapClasses = gradeObj && gradeObj.chapters && gradeObj.chapters[0] ? gradeObj.chapters[0].classes : null;
                const classById = firstChapClasses ? firstChapClasses.find(c => c.dayNumber === dc.dayNumber) : null;
                if (classById) {
                  loadClassView(classById.id, false);
                } else if (typeof COURSES_DATA !== 'undefined' && COURSES_DATA.classes && COURSES_DATA.classes.length > 0) {
                  loadClassView(COURSES_DATA.classes[0].id, false);
                }
              } else {
                showToast('Opening class workspace...', 'info');
              }
            });
          });
        })();

      } else if (tab === 'assignments') {
        if (typeof window.renderStudentAssignmentsView === 'function') {
          window.renderStudentAssignmentsView('studentSubjectsTabContent');
        }
      } else if (tab === 'activities' || tab === 'endactivities') {
        if (typeof window.renderStudentActivitiesView === 'function') {
          window.renderStudentActivitiesView('studentSubjectsTabContent');
        }
      } else if (tab === 'resources') {
        if (typeof window.renderStudentResourcesView === 'function') {
          window.renderStudentResourcesView('studentSubjectsTabContent');
        }
      }
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MENTOR GRADE CURRICULUM VIEW
  // Fetches all grades from backend (GET /api/v1/courses/grades)
  // Shows Grade → Term → Chapter hierarchy with Chapter Unlock & Class Unlock buttons
  // Calls: PUT /api/v1/admin/chapters/{id}/lock?isLocked=false  (TEACHER+ADMIN role)
  //        PUT /api/v1/teacher/classes/{id}/unlock              (TEACHER+ADMIN role)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  let mentorCurriculumGradeData = null; // cached grades array

  window.renderMentorGradeCurriculum = async function () {
    const container = document.getElementById('mentorGradeCurriculumContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="text-align:center;padding:32px;color:#64748b;">
        <i class="fa-solid fa-circle-notch fa-spin" style="font-size:1.5rem;color:#2563eb;margin-bottom:12px;display:block;"></i>
        <p>Loading curriculum from backend...</p>
      </div>
    `;

    const token = localStorage.getItem('lms_token');
    let grades = [];

    try {
      const res = await fetch(`${API_BASE}/courses/grades`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) grades = data;
      }
    } catch (e) {
      console.warn('[LMS] Could not fetch grades from backend:', e);
    }

    // If backend offline, try loading all grade details one by one (grades 3..10)
    if (grades.length === 0) {
      container.innerHTML = `
        <div style="border:2px dashed #cbd5e1;border-radius:16px;padding:48px 24px;text-align:center;background:#ffffff;">
          <i class="fa-solid fa-wifi-slash" style="font-size:2rem;color:#94a3b8;margin-bottom:12px;display:block;"></i>
          <h3 style="font-weight:700;color:#0f172a;">Backend unavailable</h3>
          <p style="color:#64748b;font-size:0.875rem;">Could not reach the backend. Please ensure the server is running at <strong>http://localhost:8080</strong>.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="window.renderMentorGradeCurriculum()" style="margin-top:16px;border-radius:20px;">Retry</button>
        </div>
      `;
      return;
    }

    mentorCurriculumGradeData = grades;

    // Helper: toggle chapter lock via backend
    async function mentorToggleChapterLock(chapterId, currentlyLocked) {
      const tok = localStorage.getItem('lms_token');
      const newLocked = !currentlyLocked;
      try {
        const res = await fetch(`${API_BASE}/admin/chapters/${chapterId}/lock?isLocked=${newLocked}`, {
          method: 'PUT',
          headers: tok ? { 'Authorization': `Bearer ${tok}` } : {}
        });
        if (res.ok) {
          showToast(newLocked ? '🔒 Chapter locked' : '🔓 Chapter unlocked for students!', newLocked ? 'warning' : 'success');
          window.renderMentorGradeCurriculum(); // refresh
        } else {
          const errText = await res.text();
          showToast('Could not update chapter: ' + errText, 'error');
        }
      } catch (e) {
        showToast('Backend error: ' + e.message, 'error');
      }
    }

    // Helper: unlock a DayClass via backend
    async function mentorUnlockDayClass(classId) {
      const tok = localStorage.getItem('lms_token');
      try {
        const res = await fetch(`${API_BASE}/teacher/classes/${classId}/unlock`, {
          method: 'PUT',
          headers: tok ? { 'Authorization': `Bearer ${tok}` } : {}
        });
        if (res.ok) {
          showToast('🔓 Class unlocked! Students can now access it.', 'success');
          window.renderMentorGradeCurriculum(); // refresh
        } else {
          const errText = await res.text();
          showToast('Could not unlock class: ' + errText, 'error');
        }
      } catch (e) {
        showToast('Backend error: ' + e.message, 'error');
      }
    }

    // Expose helpers to inline onclick handlers
    window._mentorToggleChapterLock = mentorToggleChapterLock;
    window._mentorUnlockDayClass = mentorUnlockDayClass;

    // Render grade → term → chapter → dayclass hierarchy
    container.innerHTML = grades.map(grade => {
      const termsList = grade.terms || [];
      const termHtml = termsList.length > 0 ? termsList.map(term => {
        const chapsList = term.chapters || [];
        const chapterHtml = chapsList.length > 0 ? chapsList.map(chap => {
          const chapLocked = Boolean(chap.isLocked);
          const dcList = chap.dayClasses || [];
          const dcHtml = dcList.length > 0 ? dcList.map(dc => {
            const dcUnlocked = Boolean(dc.isUnlockedByAdmin);
            const btnHtml = !dcUnlocked 
              ? '<button type="button" class="btn btn-sm" style="border-radius:16px;background:#2563eb;color:#fff;border:none;padding:5px 14px;font-size:0.8rem;font-weight:600;cursor:pointer;" onclick="window._mentorUnlockDayClass(' + dc.id + ')"><i class="fa-solid fa-lock-open"></i> Unlock Class</button>'
              : '<span style="font-size:0.75rem;color:#10b981;font-weight:600;"><i class="fa-solid fa-circle-check"></i> Accessible</span>';

            return `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;margin-bottom:6px;">
                <div>
                  <span style="font-size:0.75rem;font-weight:700;color:#2563eb;background:#eff6ff;padding:2px 8px;border-radius:6px;">Class ${dc.dayNumber}</span>
                  <span style="font-size:0.9rem;font-weight:600;color:#1e293b;margin-left:8px;">${escapeHtml(dc.topicTitle || ('Class ' + dc.dayNumber))}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:0.75rem;font-weight:700;color:${dcUnlocked ? '#10b981' : '#d97706'};background:${dcUnlocked ? '#dcfce7' : '#fef3c7'};padding:3px 10px;border-radius:8px;">
                    <i class="fa-solid ${dcUnlocked ? 'fa-lock-open' : 'fa-lock'}"></i> ${dcUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                  ${btnHtml}
                </div>
              </div>
            `;
          }).join('') : '<p style="font-size:0.825rem;color:#94a3b8;padding:8px 0;">No classes scheduled yet.</p>';

          const chapDescHtml = chap.description ? `<p style="font-size:0.825rem;color:#64748b;margin-bottom:10px;">${escapeHtml(chap.description)}</p>` : '';

          return `
            <div style="border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;background:${chapLocked ? '#fffbeb' : '#ffffff'};margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <div>
                  <span style="font-size:0.75rem;font-weight:700;color:#7c3aed;background:#f5f3ff;padding:2px 8px;border-radius:6px;">Chapter ${chap.chapterNumber}</span>
                  <span style="font-size:1rem;font-weight:700;color:#0f172a;margin-left:8px;">${escapeHtml(chap.title)}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:0.775rem;font-weight:700;color:${chapLocked ? '#d97706' : '#10b981'};background:${chapLocked ? '#fef3c7' : '#dcfce7'};padding:3px 10px;border-radius:8px;">
                    <i class="fa-solid ${chapLocked ? 'fa-lock' : 'fa-lock-open'}"></i> ${chapLocked ? 'Locked' : 'Unlocked'}
                  </span>
                  <button type="button" class="btn btn-sm" style="border-radius:16px;background:${chapLocked ? '#2563eb' : '#64748b'};color:#fff;border:none;padding:5px 14px;font-size:0.8rem;font-weight:600;cursor:pointer;"
                    onclick="window._mentorToggleChapterLock(${chap.id}, ${chapLocked})">
                    <i class="fa-solid ${chapLocked ? 'fa-lock-open' : 'fa-lock'}"></i> ${chapLocked ? 'Unlock Chapter' : 'Lock Chapter'}
                  </button>
                </div>
              </div>
              ${chapDescHtml}
              <div style="padding-left:8px;border-left:3px solid #e2e8f0;">
                ${dcHtml}
              </div>
            </div>
          `;
        }).join('') : '<p style="font-size:0.825rem;color:#94a3b8;padding:8px 0;">No chapters in this term.</p>';

        return `
          <div style="margin-bottom:12px;">
            <h4 style="font-size:0.9rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
              <i class="fa-solid fa-calendar-days" style="color:#2563eb;"></i>
              ${escapeHtml(term.title || ('Term ' + term.termNumber))}
            </h4>
            ${chapterHtml}
          </div>
        `;
      }).join('') : '<p style="font-size:0.825rem;color:#94a3b8;padding:12px 0;">No terms defined for this grade yet.</p>';

      const totalTerms = (grade.terms || []).length;
      const totalChaps = (grade.terms || []).reduce((acc, t) => acc + (t.chapters || []).length, 0);

      return `
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:16px;padding:20px 24px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:44px;height:44px;border-radius:12px;background:#eff6ff;color:#2563eb;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:800;">
                ${grade.gradeNumber}
              </div>
              <div>
                <h3 style="font-size:1.1rem;font-weight:700;color:#0f172a;margin:0;">${escapeHtml(grade.name)}</h3>
                <p style="font-size:0.8rem;color:#64748b;margin:0;">${totalTerms} Terms &bull; ${totalChaps} Chapters</p>
              </div>
            </div>
            <span style="font-size:0.775rem;background:#dcfce7;color:#15803d;padding:4px 12px;border-radius:12px;font-weight:700;">
              <i class="fa-solid fa-circle-check"></i> Active Grade
            </span>
          </div>
          <div style="border-top:1px solid #f1f5f9;padding-top:16px;">
            ${termHtml}
          </div>
        </div>
      `;
    }).join('');
  };

  // ── 1. Mentor Assignments View ─────────────────────────────────────────────
  window.renderMentorAssignmentsView = async function () {
    const listContainer = document.getElementById('mentorAssignedTasksList');
    const tableBody = document.getElementById('mentorAssignmentsTableBody');
    if (!listContainer && !tableBody) return;

    // 1. Render Mentor Created Assignments & Unlock Controls
    let assignments = JSON.parse(localStorage.getItem('lms_mentor_assignments') || '[]');
    if (assignments.length === 0) {
      assignments = [
        { id: 101, title: 'Computer Hardware & Device Sketch Task', gradeNumber: 3, chapterTitle: 'Chapter 1: Computer Fundamentals', description: 'Sketch internal vs external computer parts and submit your completed worksheet.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isUnlocked: true, createdAt: '2026-08-21' },
        { id: 102, title: 'Touch Typing Speed Drills & Exercise', gradeNumber: 3, chapterTitle: 'Chapter 4: Typing Practice', description: 'Practice typing drills for 20 mins and upload your accuracy screenshot.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isUnlocked: false, createdAt: '2026-08-21' }
      ];
      localStorage.setItem('lms_mentor_assignments', JSON.stringify(assignments));
    }

    if (listContainer) {
      listContainer.innerHTML = assignments.map(a => `
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px 22px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:#2563eb; background:#eff6ff; padding:2px 8px; border-radius:6px; display:inline-block; margin-bottom:4px;">
              CLASS ${a.gradeNumber}th &bull; ${escapeHtml(a.chapterTitle || 'Chapter Task')}
            </div>
            <h3 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin:0;">${escapeHtml(a.title)}</h3>
            <p style="font-size:0.825rem; color:#64748b; margin-top:4px; margin-bottom:0;">
              ${escapeHtml(a.description || '')}
            </p>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <button type="button" class="btn btn-sm ${a.isUnlocked ? 'btn-success' : 'btn-outline-clean'} btn-toggle-assign-lock" data-assign-id="${a.id}" style="border-radius:12px; font-weight:700; padding:6px 14px; font-size:0.8rem;">
              <i class="fa-solid ${a.isUnlocked ? 'fa-lock-open' : 'fa-lock'}"></i> ${a.isUnlocked ? 'Unlocked for Student' : 'Locked (Private)'}
            </button>
            <a href="${a.fileUrl}" target="_blank" class="btn btn-sm btn-outline-clean" style="border-radius:12px; font-weight:600; font-size:0.8rem;">
              <i class="fa-solid fa-paperclip"></i> Worksheet File
            </a>
            <button type="button" class="btn-node-icon text-danger btn-delete-assignment" data-assign-id="${a.id}" title="Delete Assignment">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `).join('');

      listContainer.querySelectorAll('.btn-toggle-assign-lock').forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute('data-assign-id');
          const target = assignments.find(item => String(item.id) === String(id));
          if (target) {
            target.isUnlocked = !target.isUnlocked;
            localStorage.setItem('lms_mentor_assignments', JSON.stringify(assignments));
            showToast(`Assignment "${target.title}" ${target.isUnlocked ? 'Unlocked for Students' : 'Locked'}!`, target.isUnlocked ? 'success' : 'warning');
            window.renderMentorAssignmentsView();
            if (typeof window.renderStudentAssignmentsView === 'function') {
              window.renderStudentAssignmentsView();
            }
          }
        };
      });

      listContainer.querySelectorAll('.btn-delete-assignment').forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute('data-assign-id');
          assignments = assignments.filter(item => String(item.id) !== String(id));
          localStorage.setItem('lms_mentor_assignments', JSON.stringify(assignments));
          showToast('Assignment removed.', 'info');
          window.renderMentorAssignmentsView();
          if (typeof window.renderStudentAssignmentsView === 'function') {
            window.renderStudentAssignmentsView();
          }
        };
      });
    }

    // 2. Render Received Student Submissions
    if (tableBody) {
      const tok = localStorage.getItem('lms_token');
      const headers = tok ? { 'Authorization': `Bearer ${tok}` } : {};

      let list = [];
      try {
        const res = await fetch(`${API_BASE}/admin/submissions`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) list = data;
        }
      } catch (e) {}

      if (list.length === 0) {
        list = JSON.parse(localStorage.getItem('lms_admin_submissions') || '[]');
        if (list.length === 0) {
          list = [
            { id: 501, studentName: 'Alex Johnson', studentEmail: 'student3@school.com', gradeNumber: 3, dayClassTopic: 'Chapter 1: Computer Fundamentals', taskTitle: 'Computer Hardware & Device Sketch Task', submissionUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', status: 'SUBMITTED', score: null }
          ];
        }
      }

      const gradeVal = document.getElementById('filterAssignmentGradeSelect')?.value || 'ALL';
      const statusVal = document.getElementById('filterAssignmentStatusSelect')?.value || 'ALL';
      const searchQ = (document.getElementById('searchAssignmentsInput')?.value || '').toLowerCase();

      const filtered = list.filter(item => {
        const itemGrade = String(item.gradeNumber || 3);
        if (gradeVal !== 'ALL' && itemGrade !== gradeVal) return false;
        const itemStatus = (item.status || 'SUBMITTED').toUpperCase();
        if (statusVal !== 'ALL' && itemStatus !== statusVal) return false;
        if (searchQ) {
          const text = `${item.studentName || ''} ${item.studentEmail || ''} ${item.dayClassTopic || ''} ${item.taskTitle || ''}`.toLowerCase();
          if (!text.includes(searchQ)) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="7" class="text-center" style="padding: 32px; color: #64748b;">
              <i class="fa-solid fa-inbox" style="font-size:1.5rem; margin-bottom:8px; display:block;"></i>
              No student submissions received matching filter criteria.
            </td>
          </tr>
        `;
        return;
      }

      tableBody.innerHTML = filtered.map(item => {
        const isGraded = item.status === 'GRADED' || item.status === 'REVIEWED';
        const isRejected = item.status === 'REJECTED';
        const badgeClass = isGraded ? 'approved' : (isRejected ? 'disabled' : 'pending');
        const badgeText = isGraded ? 'Graded' : (isRejected ? 'Rejected' : 'Submitted');
        const currentScore = item.score !== null && item.score !== undefined ? item.score : 100;

        return `
          <tr data-submission-id="${item.id}">
            <td>
              <div class="user-table-name">${escapeHtml(item.studentName || 'Student')}</div>
              <div class="user-table-email">${escapeHtml(item.studentEmail || '')}</div>
            </td>
            <td><span class="badge badge-soft-blue" style="font-weight:700;">CLASS ${item.gradeNumber || 3}th</span></td>
            <td>
              <div style="font-weight:600; color:#0f172a;">${escapeHtml(item.taskTitle || 'Assignment')}</div>
              <div style="font-size:0.775rem; color:#64748b;">${escapeHtml(item.dayClassTopic || '')}</div>
            </td>
            <td>
              <a href="${item.submissionUrl || '#'}" target="_blank" class="btn btn-sm btn-outline-clean" style="border-radius:12px; font-weight:600; font-size:0.8rem;">
                <i class="fa-solid fa-paperclip"></i> Student File
              </a>
            </td>
            <td><span class="status-select-badge ${badgeClass}">${badgeText}</span></td>
            <td>
              <input type="number" min="0" max="100" class="table-input-clean assignment-score-input" data-sub-id="${item.id}" value="${currentScore}" style="width:70px; text-align:center; font-weight:700;">
            </td>
            <td class="text-right">
              <div style="display:flex; gap:6px; justify-content:flex-end;">
                <button type="button" class="btn btn-sm btn-success btn-approve-assignment" data-sub-id="${item.id}" style="border-radius:14px; font-weight:700; padding:4px 12px; font-size:0.775rem;">
                  <i class="fa-solid fa-check"></i> Approve
                </button>
                <button type="button" class="btn btn-sm btn-danger btn-reject-assignment" data-sub-id="${item.id}" style="border-radius:14px; font-weight:700; padding:4px 12px; font-size:0.775rem;">
                  <i class="fa-solid fa-xmark"></i> Reject
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      tableBody.querySelectorAll('.btn-approve-assignment').forEach(btn => {
        btn.onclick = async () => {
          const id = btn.getAttribute('data-sub-id');
          const scoreInput = tableBody.querySelector(`.assignment-score-input[data-sub-id="${id}"]`);
          const score = scoreInput ? parseInt(scoreInput.value || '100') : 100;
          await window.approveAssignmentSubmission(id, score);
        };
      });

      tableBody.querySelectorAll('.btn-reject-assignment').forEach(btn => {
        btn.onclick = async () => {
          const id = btn.getAttribute('data-sub-id');
          await window.rejectAssignmentSubmission(id);
        };
      });
    }
  };

  document.getElementById('filterAssignmentGradeSelect')?.addEventListener('change', () => window.renderMentorAssignmentsView());
  document.getElementById('filterAssignmentStatusSelect')?.addEventListener('change', () => window.renderMentorAssignmentsView());
  document.getElementById('searchAssignmentsInput')?.addEventListener('input', () => window.renderMentorAssignmentsView());

  window.approveAssignmentSubmission = async function (id, score = 100) {
    const tok = localStorage.getItem('lms_token');
    showToast('Approving assignment submission...', 'info');

    if (tok) {
      try {
        await fetch(`${API_BASE}/admin/submissions/${id}/approve?score=${score}&feedback=Great+work!`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${tok}` }
        });
      } catch (e) {}
    }

    try {
      const localSubs = JSON.parse(localStorage.getItem('lms_admin_submissions') || '[]');
      const item = localSubs.find(s => String(s.id) === String(id));
      if (item) {
        item.status = 'GRADED';
        item.score = score;
        localStorage.setItem('lms_admin_submissions', JSON.stringify(localSubs));
      }
    } catch (e) {}

    showToast('🎉 Assignment Approved & Next Chapter Unlocked!', 'success');
    window.renderMentorAssignmentsView();
  };

  window.rejectAssignmentSubmission = async function (id) {
    const tok = localStorage.getItem('lms_token');
    showToast('Rejecting assignment submission...', 'warning');

    if (tok) {
      try {
        await fetch(`${API_BASE}/admin/submissions/${id}/reject?feedback=Needs+revision`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${tok}` }
        });
      } catch (e) {}
    }

    try {
      const localSubs = JSON.parse(localStorage.getItem('lms_admin_submissions') || '[]');
      const item = localSubs.find(s => String(s.id) === String(id));
      if (item) {
        item.status = 'REJECTED';
        localStorage.setItem('lms_admin_submissions', JSON.stringify(localSubs));
      }
    } catch (e) {}

    showToast('Assignment marked as Rejected.', 'info');
    window.renderMentorAssignmentsView();
  };

  // ── 2. Mentor Activities View ──────────────────────────────────────────────
  window.renderMentorActivitiesView = function () {
    const container = document.getElementById('mentorActivitiesContainer');
    if (!container) return;

    const gradeNum = parseInt(document.getElementById('filterActivityGradeSelect')?.value || '3');
    const chapters = getChaptersForGrade(gradeNum);
    const completedState = JSON.parse(localStorage.getItem('lms_completed_activities') || '{}');
    const assignedState = JSON.parse(localStorage.getItem('lms_assigned_activities') || '{}');
    const submittedList = JSON.parse(localStorage.getItem('lms_submitted_activities') || '[]');

    // By default, make Class 1 assigned for demo if empty
    if (Object.keys(assignedState).length === 0) {
      assignedState[`grade_${gradeNum}_class_1`] = true;
      localStorage.setItem('lms_assigned_activities', JSON.stringify(assignedState));
    }

    let html = chapters.map(chap => {
      const classes = chap.classes || [];
      const chapNum = chap.chapterNumber || chap.id || 1;
      const classRows = classes.map((c, idx) => {
        const classId = c.id || c.dayNumber;
        const stateKey = `grade_${gradeNum}_class_${classId}`;
        const record = completedState[stateKey];
        const isComp = record && record.isCompleted;
        const isAssigned = !!assignedState[stateKey];
        const dayNum = c.dayNumber || (idx + 1);
        const { practicalPdf } = window.getClassResourceUrls(gradeNum, chapNum, dayNum, idx + 1, c);

        return `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border:1px solid #e2e8f0; border-radius:12px; background:#f8fafc; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:0.75rem; font-weight:700; color:#2563eb; background:#eff6ff; padding:2px 8px; border-radius:6px;">Class ${c.dayNumber}</span>
                <span style="font-size:0.95rem; font-weight:700; color:#0f172a;">${escapeHtml(c.title || ('Class ' + c.dayNumber))}</span>
                ${isAssigned ? `<span class="badge badge-soft-blue" style="font-size:0.75rem;"><i class="fa-solid fa-lock-open"></i> Assigned to Students</span>` : `<span class="badge" style="font-size:0.75rem; background:#f1f5f9; color:#64748b;"><i class="fa-solid fa-lock"></i> Hidden from Student</span>`}
              </div>
              <div style="font-size:0.8rem; color:#64748b; margin-top:4px;">
                <i class="fa-solid fa-flask text-blue"></i> Practical Activity: ${escapeHtml(c.taskTitle || 'In-Class Practical Lab & Drills')}
              </div>
              ${isComp ? `<div style="font-size:0.775rem; color:#16a34a; font-weight:600; margin-top:4px;"><i class="fa-solid fa-circle-check"></i> Completed on ${escapeHtml(record.completedAt || '')}</div>` : ''}
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
              <!-- View PDF link for mentor -->
              <button type="button" onclick="window.openDocInNewTab('${practicalPdf}', 'Class ${c.dayNumber}: Practical Activity Worksheet'); return false;" class="btn btn-sm btn-outline-clean" style="border-radius:10px; font-weight:600; font-size:0.8rem; height:36px; display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
                <i class="fa-solid fa-file-pdf text-danger"></i> View PDF
              </button>

              <!-- Assign / Unassign to students toggle -->
              <button type="button" class="btn btn-sm ${isAssigned ? 'btn-outline-danger' : 'btn-outline-primary'} btn-toggle-assign-activity" data-state-key="${stateKey}" data-class-title="${escapeHtml(c.title || ('Class ' + c.dayNumber))}" style="border-radius:10px; font-weight:700; font-size:0.8rem; height:36px; padding:0 12px;">
                <i class="fa-solid ${isAssigned ? 'fa-eye-slash' : 'fa-paper-plane'}"></i> ${isAssigned ? 'Unassign' : 'Assign to Students'}
              </button>

              <!-- Mentor completion mark button -->
              <button type="button" class="btn btn-sm ${isComp ? 'btn-success' : 'btn-primary'} btn-toggle-activity-complete" data-class-id="${classId}" data-class-title="${escapeHtml(c.title || ('Class ' + c.dayNumber))}" data-chap-title="${escapeHtml(chap.chapterTitle || chap.title || ('Chapter ' + chap.chapterNumber))}" style="border-radius:10px; font-weight:700; font-size:0.8rem; height:36px; padding:0 14px;">
                <i class="fa-solid ${isComp ? 'fa-circle-check' : 'fa-square-check'}"></i> ${isComp ? 'Completed' : 'Mark Completed'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div style="border:1px solid #cbd5e1; border-radius:14px; padding:18px 22px; margin-bottom:16px; background:#ffffff; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
          <h4 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:12px;">
            <i class="fa-solid fa-folder text-blue"></i> ${escapeHtml(chap.chapterTitle || chap.title || ('Chapter ' + chap.chapterNumber))}
          </h4>
          ${classes.length > 0 ? classRows : '<p style="font-size:0.825rem; color:#94a3b8; margin:0;">No active practical labs configured for this chapter.</p>'}
        </div>
      `;
    }).join('');

    // Add Submitted Student Practical Activities Panel
    const gradeSubmissions = submittedList.filter(s => s.gradeNumber === gradeNum || !s.gradeNumber);
    html += `
      <div style="border:1px solid #cbd5e1; border-radius:14px; padding:20px; margin-top:24px; background:#ffffff;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin:0;"><i class="fa-solid fa-inbox text-blue"></i> Submitted Student Practical Activities</h3>
          <span style="font-size:0.8rem; color:#64748b; font-weight:600;">${gradeSubmissions.length} Submissions Received</span>
        </div>

        ${gradeSubmissions.length > 0 ? `
          <table class="attendance-data-table mentor-students-table">
            <thead>
              <tr>
                <th>STUDENT</th>
                <th>ACTIVITY / CLASS</th>
                <th>SUBMITTED AT</th>
                <th>SOLUTION LINK</th>
                <th class="text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              ${gradeSubmissions.map(sub => `
                <tr>
                  <td>
                    <div style="font-weight:700; color:#0f172a;">${escapeHtml(sub.studentName || 'Student')}</div>
                    <div style="font-size:0.775rem; color:#64748b;">${escapeHtml(sub.studentEmail || '')}</div>
                  </td>
                  <td>
                    <div style="font-weight:700; color:#2563eb;">${escapeHtml(sub.classTitle || 'Practical Activity')}</div>
                    <div style="font-size:0.75rem; color:#64748b;">${escapeHtml(sub.chapterTitle || '')}</div>
                  </td>
                  <td style="font-size:0.8rem; color:#64748b;">${escapeHtml(sub.submittedAt || '')}</td>
                  <td>
                    <a href="${sub.fileUrl}" target="_blank" onclick="window.openDocInNewTab('${sub.fileUrl}', 'Student Solution'); return false;" style="font-size:0.8rem; font-weight:700; color:#2563eb; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
                      <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Solution PDF
                    </a>
                  </td>
                  <td class="text-right">
                    <button type="button" class="btn btn-sm btn-success btn-verify-student-sub" data-sub-id="${sub.submissionId}" data-state-key="${sub.stateKey}" style="border-radius:10px; font-weight:700; font-size:0.775rem;">
                      <i class="fa-solid fa-check"></i> ${sub.verified ? 'Verified ✅' : 'Verify & Mark Complete'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : `
          <div style="text-align:center; padding:30px 16px; color:#94a3b8;">
            <i class="fa-solid fa-file-circle-question" style="font-size:2rem; color:#cbd5e1; margin-bottom:8px;"></i>
            <p style="font-size:0.875rem; margin:0;">No student practical activity submissions received yet for Class ${gradeNum}th.</p>
          </div>
        `}
      </div>
    `;

    container.innerHTML = html;

    // Attach Toggle Assign Handlers
    container.querySelectorAll('.btn-toggle-assign-activity').forEach(btn => {
      btn.onclick = () => {
        const stateKey = btn.getAttribute('data-state-key');
        const classTitle = btn.getAttribute('data-class-title');
        const assignedState = JSON.parse(localStorage.getItem('lms_assigned_activities') || '{}');

        if (assignedState[stateKey]) {
          delete assignedState[stateKey];
          showToast(`Unassigned "${classTitle}" for students.`, 'info');
        } else {
          assignedState[stateKey] = true;
          showToast(`🎉 "${classTitle}" assigned to Grade ${gradeNum} students!`, 'success');
        }

        localStorage.setItem('lms_assigned_activities', JSON.stringify(assignedState));
        window.renderMentorActivitiesView();
        if (typeof window.renderStudentActivitiesView === 'function') {
          window.renderStudentActivitiesView();
        }
      };
    });

    // Attach Toggle Complete Handlers
    container.querySelectorAll('.btn-toggle-activity-complete').forEach(btn => {
      btn.onclick = () => {
        const classId = btn.getAttribute('data-class-id');
        const classTitle = btn.getAttribute('data-class-title');
        const chapTitle = btn.getAttribute('data-chap-title');
        const stateKey = `grade_${gradeNum}_class_${classId}`;

        const completedState = JSON.parse(localStorage.getItem('lms_completed_activities') || '{}');
        const isCurrentlyComp = completedState[stateKey] && completedState[stateKey].isCompleted;

        if (isCurrentlyComp) {
          delete completedState[stateKey];
          showToast(`Marked "${classTitle}" as pending.`, 'info');
        } else {
          const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
          completedState[stateKey] = {
            key: stateKey,
            gradeNumber: gradeNum,
            classId,
            classTitle,
            chapterTitle: chapTitle,
            isCompleted: true,
            completedAt: nowStr,
            completedBy: 'Mentor'
          };
          showToast(`🎉 "${classTitle}" marked as COMPLETED for Grade ${gradeNum}!`, 'success');
        }

        localStorage.setItem('lms_completed_activities', JSON.stringify(completedState));
        window.renderMentorActivitiesView();
        if (typeof window.renderStudentActivitiesView === 'function') {
          window.renderStudentActivitiesView();
        }
      };
    });

    // Attach Verify Student Submissions Handlers
    container.querySelectorAll('.btn-verify-student-sub').forEach(btn => {
      btn.onclick = () => {
        const subId = btn.getAttribute('data-sub-id');
        const stateKey = btn.getAttribute('data-state-key');
        const submittedList = JSON.parse(localStorage.getItem('lms_submitted_activities') || '[]');
        const subIndex = submittedList.findIndex(s => s.submissionId === subId);

        if (subIndex >= 0) {
          submittedList[subIndex].verified = true;
          localStorage.setItem('lms_submitted_activities', JSON.stringify(submittedList));

          if (stateKey) {
            const completedState = JSON.parse(localStorage.getItem('lms_completed_activities') || '{}');
            const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            completedState[stateKey] = {
              key: stateKey,
              gradeNumber: gradeNum,
              isCompleted: true,
              completedAt: nowStr,
              completedBy: 'Mentor (Verified Submission)'
            };
            localStorage.setItem('lms_completed_activities', JSON.stringify(completedState));
          }

          showToast('🎉 Student submission verified & activity marked as complete!', 'success');
          window.renderMentorActivitiesView();
          if (typeof window.renderStudentActivitiesView === 'function') {
            window.renderStudentActivitiesView();
          }
        }
      };
    });
  };

  document.getElementById('filterActivityGradeSelect')?.addEventListener('change', () => window.renderMentorActivitiesView());

  // ── 3. Mentor Resources View ───────────────────────────────────────────────
  window.renderMentorResourcesView = function () {
    const listContainer = document.getElementById('mentorResourcesListContainer');
    const gridContainer = document.getElementById('mentorGradeResourcesGridContainer');
    if (!listContainer && !gridContainer) return;

    // 1. Render Published Custom Mentor Resources
    if (listContainer) {
      let resources = JSON.parse(localStorage.getItem('lms_mentor_resources') || '[]');
      if (resources.length === 0) {
        resources = [
          { id: 1, title: 'Chapter 1 Computer Parts PDF Guide', gradeNumber: 3, type: 'PDF', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
          { id: 2, title: 'Operating System File Basics Video', gradeNumber: 3, type: 'VIDEO', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          { id: 3, title: 'Touch Typing Finger Placement Slides', gradeNumber: 3, type: 'SLIDES', url: 'https://docs.google.com/presentation' }
        ];
      }

      listContainer.innerHTML = resources.map(res => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border:1px solid #cbd5e1; border-radius:12px; background:#ffffff; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:40px; height:40px; border-radius:10px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
              <i class="fa-solid ${res.type === 'PDF' ? 'fa-file-pdf' : (res.type === 'VIDEO' ? 'fa-video' : 'fa-link')}"></i>
            </div>
            <div>
              <h4 style="font-size:0.95rem; font-weight:700; color:#0f172a; margin:0;">${escapeHtml(res.title)}</h4>
              <p style="font-size:0.775rem; color:#64748b; margin:0;">CLASS ${res.gradeNumber}th &bull; ${res.type} Resource</p>
            </div>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <a href="${res.url}" target="_blank" class="btn btn-sm btn-outline-clean" style="border-radius:12px; font-weight:600;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
            </a>
            <button type="button" class="btn-node-icon text-danger btn-delete-resource" data-res-id="${res.id}" title="Remove resource">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      `).join('');

      listContainer.querySelectorAll('.btn-delete-resource').forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute('data-res-id');
          resources = resources.filter(r => String(r.id) !== String(id));
          localStorage.setItem('lms_mentor_resources', JSON.stringify(resources));
          window.renderMentorResourcesView();
          showToast('Resource removed.', 'info');
        };
      });
    }

    // 2. Render Grade Learning Resources & Materials Grid (Matching Images 1 & 2)
    if (gridContainer) {
      const gradeNum = parseInt(document.getElementById('filterMentorResGradeSelect')?.value || '3');
      const headerTitle = document.getElementById('mentorGradeResHeaderTitle');
      if (headerTitle) {
        headerTitle.textContent = `Grade ${gradeNum} Learning Resources & Materials`;
      }

      const chapters = getChaptersForGrade(gradeNum);
      gridContainer.innerHTML = chapters.map(chap => {
        const classes = chap.classes || [];
        const chapNum = chap.chapterNumber || chap.id || 1;
        const classCards = classes.map((c, idx) => {
          const dayNum = c.dayNumber || (idx + 1);
          const { topicPdf, practicalPdf, videoUrl } = window.getClassResourceUrls(gradeNum, chapNum, dayNum, idx + 1, c);
          return `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
              <h4 style="font-size:0.9rem; font-weight:700; color:#0f172a; margin:0;">
                Class ${c.dayNumber}: ${escapeHtml(c.title || ('Class ' + c.dayNumber))}
              </h4>
              <div style="display:flex; flex-direction:column; gap:6px; margin-top:4px;">
                <a href="${topicPdf}" target="_blank" onclick="window.openDocInNewTab('${topicPdf}', 'Class ${c.dayNumber}: Topics Covered Document'); return false;" style="font-size:0.8rem; color:#2563eb; text-decoration:none; font-weight:600; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-file-pdf"></i> Topics Covered Document (PDF)
                </a>
                <a href="${practicalPdf}" target="_blank" onclick="window.openDocInNewTab('${practicalPdf}', 'Class ${c.dayNumber}: Practical Activity Worksheet'); return false;" style="font-size:0.8rem; color:#059669; text-decoration:none; font-weight:600; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-pen-ruler"></i> Practical Activity Worksheet (PDF)
                </a>
                <a href="${videoUrl}" target="_blank" style="font-size:0.8rem; color:#7c3aed; text-decoration:none; font-weight:600; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-circle-play"></i> Watch Class Video Lecture
                </a>
              </div>
            </div>
          `;
        }).join('');

        return `
          <div style="background:#ffffff; border:1px solid #bfdbfe; border-radius:16px; padding:20px; margin-bottom:20px; box-shadow:0 2px 8px rgba(30,58,138,0.03);">
            <h3 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-folder-open text-blue"></i> ${escapeHtml(chap.chapterTitle || chap.title || ('Chapter ' + chap.chapterNumber))} Resources
            </h3>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:16px;">
              ${classes.length > 0 ? classCards : '<p style="font-size:0.825rem; color:#94a3b8; margin:0;">No class resources available in this chapter.</p>'}
            </div>
          </div>
        `;
      }).join('');
    }
  };

  document.getElementById('filterMentorResGradeSelect')?.addEventListener('change', () => window.renderMentorResourcesView());

  document.getElementById('formAddMentorResource')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('resTitleInput')?.value.trim();
    const gradeNumber = parseInt(document.getElementById('resGradeSelect')?.value || '3');
    const type = document.getElementById('resTypeSelect')?.value || 'PDF';
    const url = document.getElementById('resUrlInput')?.value.trim();

    if (!title || !url) return;

    const resources = JSON.parse(localStorage.getItem('lms_mentor_resources') || '[]');
    resources.unshift({ id: Date.now(), title, gradeNumber, type, url });
    localStorage.setItem('lms_mentor_resources', JSON.stringify(resources));
    document.getElementById('formAddMentorResource').reset();

    showToast(`Published resource: ${title}`, 'success');
    window.renderMentorResourcesView();
  });

  // ── 4. Mentor Attendance View ──────────────────────────────────────────────
  function getAttendanceRecordsV2() {
    let records = JSON.parse(localStorage.getItem('lms_student_attendance_v2') || '[]');
    if (records.length === 0) {
      // Initialize with sample initial date records if empty
      records = [
        {
          id: 'att_2026-08-21_g3',
          date: new Date().toISOString().split('T')[0],
          gradeNumber: 3,
          savedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          savedBy: 'Mentor',
          students: [
            { id: 901, fullName: 'Englorayman JD', email: 'jdenglorayman@gmail.com', status: 'PRESENT' },
            { id: 902, fullName: 'SRIRAM Mayan', email: 'mayansriram@gmail.com', status: 'PRESENT' },
            { id: 903, fullName: 'GOWTHAM D', email: 'gowthamd244@gmail.com', status: 'PRESENT' }
          ]
        }
      ];
      localStorage.setItem('lms_student_attendance_v2', JSON.stringify(records));
    }
    return records;
  }

  function saveAttendanceRecordsV2(records) {
    localStorage.setItem('lms_student_attendance_v2', JSON.stringify(records));
  }

  window.renderMentorAttendanceView = async function () {
    const tableBody = document.getElementById('mentorAttendanceTableBody');
    if (!tableBody) return;

    // 1. Auto-fetch System Date & Time
    const datePicker = document.getElementById('attendanceDatePicker');
    if (datePicker && !datePicker.value) {
      datePicker.value = new Date().toISOString().split('T')[0];
    }
    const selectedDate = datePicker?.value || new Date().toISOString().split('T')[0];
    const gradeNum = parseInt(document.getElementById('filterAttendanceGradeSelect')?.value || '3');

    // 2. Fetch Enrolled Students
    const tok = localStorage.getItem('lms_token');
    const headers = tok ? { 'Authorization': `Bearer ${tok}` } : {};

    let students = [];
    try {
      const res = await fetch(`${API_BASE}/admin/students`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) students = data;
      }
    } catch (e) {}

    if (students.length === 0) {
      students = JSON.parse(localStorage.getItem('lms_registered_users') || '[]').filter(u => u.role === 'ROLE_STUDENT' || u.role === 'STUDENT');
      if (students.length === 0) {
        students = [
          { id: 901, fullName: 'Englorayman JD', email: 'jdenglorayman@gmail.com', gradeNumber: 3 },
          { id: 902, fullName: 'SRIRAM Mayan', email: 'mayansriram@gmail.com', gradeNumber: 3 },
          { id: 903, fullName: 'GOWTHAM D', email: 'gowthamd244@gmail.com', gradeNumber: 3 }
        ];
      }
    }

    const filtered = students.filter(s => (s.gradeNumber || 3) === gradeNum);

    // 3. Load Existing Attendance Record for (selectedDate, gradeNum)
    const allLogs = getAttendanceRecordsV2();
    const existingLog = allLogs.find(l => l.date === selectedDate && l.gradeNumber === gradeNum);

    tableBody.innerHTML = filtered.map(s => {
      let status = 'PRESENT';
      if (existingLog && existingLog.students) {
        const match = existingLog.students.find(st => String(st.id) === String(s.id) || (st.email && s.email && st.email.toLowerCase() === s.email.toLowerCase()));
        if (match && match.status) status = match.status;
      }

      return `
        <tr data-student-id="${s.id}" data-student-name="${escapeHtml(s.fullName || 'Student')}" data-student-email="${escapeHtml(s.email || '')}">
          <td><div class="user-table-name">${escapeHtml(s.fullName || 'Student')}</div></td>
          <td><div class="user-table-email">${escapeHtml(s.email || '')}</div></td>
          <td><span class="badge badge-soft-blue">CLASS ${gradeNum}th</span></td>
          <td>
            <div style="display:flex; gap:14px; align-items:center;">
              <label style="font-weight:700; font-size:0.85rem; color:#15803d; cursor:pointer; display:flex; align-items:center; gap:4px;">
                <input type="radio" name="att_${s.id}" value="PRESENT" ${status === 'PRESENT' ? 'checked' : ''}> Present
              </label>
              <label style="font-weight:700; font-size:0.85rem; color:#b45309; cursor:pointer; display:flex; align-items:center; gap:4px;">
                <input type="radio" name="att_${s.id}" value="LATE" ${status === 'LATE' ? 'checked' : ''}> Late
              </label>
              <label style="font-weight:700; font-size:0.85rem; color:#b91c1c; cursor:pointer; display:flex; align-items:center; gap:4px;">
                <input type="radio" name="att_${s.id}" value="ABSENT" ${status === 'ABSENT' ? 'checked' : ''}> Absent
              </label>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // 4. Render Attendance Logs
    window.renderMentorAttendanceLogs();
  };

  // Tab switchers & Date listener
  document.getElementById('filterAttendanceGradeSelect')?.addEventListener('change', () => window.renderMentorAttendanceView());
  document.getElementById('attendanceDatePicker')?.addEventListener('change', () => window.renderMentorAttendanceView());

  document.getElementById('btnToggleDailyRegister')?.addEventListener('click', () => {
    document.getElementById('panelDailyAttendanceRegister')?.classList.remove('hidden');
    document.getElementById('panelAllAttendanceLogs')?.classList.add('hidden');

    const btn1 = document.getElementById('btnToggleDailyRegister');
    const btn2 = document.getElementById('btnToggleAllAttendanceLogs');
    if (btn1 && btn2) {
      btn1.style.background = '#2563eb';
      btn1.style.color = '#ffffff';
      btn2.style.background = 'transparent';
      btn2.style.color = '#64748b';
    }
  });

  document.getElementById('btnToggleAllAttendanceLogs')?.addEventListener('click', () => {
    document.getElementById('panelDailyAttendanceRegister')?.classList.add('hidden');
    document.getElementById('panelAllAttendanceLogs')?.classList.remove('hidden');

    const btn1 = document.getElementById('btnToggleDailyRegister');
    const btn2 = document.getElementById('btnToggleAllAttendanceLogs');
    if (btn1 && btn2) {
      btn2.style.background = '#2563eb';
      btn2.style.color = '#ffffff';
      btn1.style.background = 'transparent';
      btn1.style.color = '#64748b';
    }
    window.renderMentorAttendanceLogs();
  });

  // Render History Log for Mentor
  window.renderMentorAttendanceLogs = function () {
    const container = document.getElementById('mentorAttendanceHistoryContainer');
    if (!container) return;

    const allLogs = getAttendanceRecordsV2();
    const badge = document.getElementById('attendanceTotalLogsBadge');
    if (badge) badge.textContent = `${allLogs.length} Days Recorded`;

    if (allLogs.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:32px; color:#94a3b8; font-size:0.9rem;">No attendance records marked yet. Select a date above and click "Save Attendance".</div>`;
      return;
    }

    container.innerHTML = allLogs.map(log => {
      const students = log.students || [];
      const presentCount = students.filter(s => s.status === 'PRESENT').length;
      const lateCount = students.filter(s => s.status === 'LATE').length;
      const absentCount = students.filter(s => s.status === 'ABSENT').length;

      return `
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; padding:16px 20px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-weight:800; font-size:1.05rem; color:#0f172a;"><i class="fa-regular fa-calendar-check text-blue"></i> ${log.date}</span>
              <span class="badge badge-soft-blue">CLASS ${log.gradeNumber}th</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; margin-top:4px;">
              Recorded: ${escapeHtml(log.savedAt || '')} &bull; 
              <strong style="color:#15803d;">${presentCount} Present</strong>, 
              <strong style="color:#b45309;">${lateCount} Late</strong>, 
              <strong style="color:#b91c1c;">${absentCount} Absent</strong>
            </div>
          </div>
          <button type="button" onclick="window.editAttendanceRecord('${log.date}', ${log.gradeNumber})" class="btn btn-sm btn-outline-clean" style="border-radius:10px; font-weight:700; font-size:0.8rem;">
            <i class="fa-solid fa-pen-to-square"></i> Review / Edit Date
          </button>
        </div>
      `;
    }).join('');
  };

  window.editAttendanceRecord = function (dateStr, gradeNum) {
    const datePicker = document.getElementById('attendanceDatePicker');
    const gradeSelect = document.getElementById('filterAttendanceGradeSelect');

    if (gradeSelect) gradeSelect.value = String(gradeNum);
    if (datePicker) datePicker.value = dateStr;

    document.getElementById('btnToggleDailyRegister')?.click();
    window.renderMentorAttendanceView();
    showToast(`Loaded attendance record for CLASS ${gradeNum}th on ${dateStr}`, 'info');
  };

  // Save Attendance Handler
  document.getElementById('btnSaveAttendanceAll')?.addEventListener('click', async () => {
    const tok = localStorage.getItem('lms_token');
    const datePicker = document.getElementById('attendanceDatePicker');
    const selectedDate = datePicker?.value || new Date().toISOString().split('T')[0];
    const gradeNum = parseInt(document.getElementById('filterAttendanceGradeSelect')?.value || '3');

    const rows = document.querySelectorAll('#mentorAttendanceTableBody tr');
    const studentStatuses = [];

    rows.forEach(tr => {
      const id = tr.getAttribute('data-student-id');
      const fullName = tr.getAttribute('data-student-name') || 'Student';
      const email = tr.getAttribute('data-student-email') || '';
      const selectedRadio = tr.querySelector(`input[name="att_${id}"]:checked`);
      const status = selectedRadio ? selectedRadio.value : 'PRESENT';

      studentStatuses.push({ id, fullName, email, status });

      if (tok && id && !isNaN(parseInt(id))) {
        fetch(`${API_BASE}/teacher/attendance`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tok}` },
          body: JSON.stringify({ studentId: parseInt(id), status, date: selectedDate })
        }).catch(e => {});
      }
    });

    const allLogs = getAttendanceRecordsV2();
    const existingIndex = allLogs.findIndex(l => l.date === selectedDate && l.gradeNumber === gradeNum);
    const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const recordObj = {
      id: `att_${selectedDate}_g${gradeNum}`,
      date: selectedDate,
      gradeNumber: gradeNum,
      savedAt: nowStr,
      savedBy: 'Mentor',
      students: studentStatuses
    };

    if (existingIndex >= 0) {
      allLogs[existingIndex] = recordObj;
    } else {
      allLogs.unshift(recordObj);
    }

    saveAttendanceRecordsV2(allLogs);
    showToast(`🎉 Attendance for CLASS ${gradeNum}th on ${selectedDate} saved successfully!`, 'success');

    window.renderMentorAttendanceLogs();
    if (typeof window.renderStudentAttendanceView === 'function') {
      window.renderStudentAttendanceView();
    }
  });

  // ── 5. Mentor Certificates & Badges View ────────────────────────────────────
  const BADGES_CATALOG = {
    badge_chap1: {
      id: 'badge_chap1',
      name: 'Computer Starter Badge',
      icon: '🥇',
      topic: 'Chapter 1 Mastery',
      description: 'Awarded for completing all Class 1 to Class 4 lessons and practical activities in Computer Fundamentals.'
    },
    badge_chap2: {
      id: 'badge_chap2',
      name: 'English Communication Champ',
      icon: '💬',
      topic: 'Chapter 2 Mastery',
      description: 'Awarded for mastering Chapter 2 English Communication drills and worksheets.'
    },
    badge_chap3: {
      id: 'badge_chap3',
      name: 'Creative Artist Badge',
      icon: '🎨',
      topic: 'Chapter 3 Mastery',
      description: 'Awarded for mastering Chapter 3 Digital Painting & Graphic Editing activities.'
    },
    badge_chap4: {
      id: 'badge_chap4',
      name: 'Touch Typist Master',
      icon: '⌨️',
      topic: 'Chapter 4 Mastery',
      description: 'Awarded for completing speed and accuracy typing drills.'
    }
  };

  window.openBadgeDetailModal = function (badgeId) {
    const badge = BADGES_CATALOG[badgeId] || BADGES_CATALOG.badge_chap1;
    const modal = document.getElementById('modalBadgeInfoDetail');
    if (!modal) return;

    document.getElementById('badgeModalIconBox').textContent = badge.icon;
    document.getElementById('badgeModalName').textContent = badge.name;
    document.getElementById('badgeModalTopicTag').textContent = badge.topic;
    document.getElementById('badgeModalDescription').textContent = badge.description;

    modal.classList.remove('hidden');
  };

  document.getElementById('btnCloseBadgeModal')?.addEventListener('click', () => {
    document.getElementById('modalBadgeInfoDetail')?.classList.add('hidden');
  });

  window.openCertificateViewerModal = function (studentEmail, studentName, gradeNum) {
    const modal = document.getElementById('modalCertificateViewer');
    if (!modal) return;

    const email = (studentEmail || localStorage.getItem('lms_current_user_email') || 'jdenglorayman@gmail.com').toLowerCase();
    const name = studentName || (email.includes('englorayman') ? 'Englorayman JD' : (email.includes('sriram') ? 'SRIRAM Mayan' : 'GOWTHAM D'));
    const gNum = gradeNum || 3;

    const certNameEl = document.getElementById('certStudentName');
    const certCourseEl = document.getElementById('certCourseTitle');
    const certDateEl = document.getElementById('certIssuedDate');
    const certIdEl = document.getElementById('certIdNumber');

    if (certNameEl) certNameEl.textContent = name;
    if (certCourseEl) certCourseEl.textContent = `Grade ${gNum} Computer Skills & Digital Literacy Course`;
    if (certDateEl) certDateEl.textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (certIdEl) certIdEl.textContent = `ID: CERT-ENG-2026-${Date.now().toString().slice(-4)}`;

    modal.classList.remove('hidden');
  };

  document.getElementById('btnCloseCertificateModal')?.addEventListener('click', () => {
    document.getElementById('modalCertificateViewer')?.classList.add('hidden');
  });

  window.issueCertificateToStudent = function (email, fullName, gradeNum) {
    const issuedCerts = JSON.parse(localStorage.getItem('lms_issued_certificates') || '{}');
    const cleanEmail = (email || 'jdenglorayman@gmail.com').toLowerCase();

    issuedCerts[cleanEmail] = {
      studentName: fullName || 'Student',
      email: cleanEmail,
      gradeNumber: gradeNum || 3,
      issuedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      issuedBy: 'Mentor Sri'
    };

    localStorage.setItem('lms_issued_certificates', JSON.stringify(issuedCerts));
    showToast(`🏆 Official Completion Certificate issued to ${fullName}!`, 'success');

    window.renderMentorCertificatesView();
    if (typeof window.renderStudentProgressView === 'function') {
      window.renderStudentProgressView();
    }
  };

  window.renderMentorCertificatesView = async function () {
    const tableBody = document.getElementById('mentorCertificatesTableBody');
    if (!tableBody) return;

    const tok = localStorage.getItem('lms_token');
    const headers = tok ? { 'Authorization': `Bearer ${tok}` } : {};

    let students = [];
    try {
      const res = await fetch(`${API_BASE}/admin/students`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) students = data;
      }
    } catch (e) {}

    if (students.length === 0) {
      students = [
        { id: 901, fullName: 'Englorayman JD', email: 'jdenglorayman@gmail.com', gradeNumber: 3, progressPercentage: 100 },
        { id: 902, fullName: 'SRIRAM Mayan', email: 'mayansriram@gmail.com', gradeNumber: 3, progressPercentage: 75 },
        { id: 903, fullName: 'GOWTHAM D', email: 'gowthamd244@gmail.com', gradeNumber: 3, progressPercentage: 50 }
      ];
    }

    const issuedCerts = JSON.parse(localStorage.getItem('lms_issued_certificates') || '{}');

    tableBody.innerHTML = students.map(s => {
      const pct = s.progressPercentage !== undefined ? s.progressPercentage : 100;
      const isEligible = pct >= 100;
      const cleanEmail = (s.email || '').toLowerCase();
      const isIssued = !!issuedCerts[cleanEmail];

      return `
        <tr>
          <td><div class="user-table-name">${escapeHtml(s.fullName || 'Student')}</div></td>
          <td><div class="user-table-email">${escapeHtml(s.email || '')}</div></td>
          <td><span class="badge badge-soft-blue">CLASS ${s.gradeNumber || 3}th</span></td>
          <td>
            <div style="font-weight:800; color:${isEligible ? '#10b981' : '#f59e0b'};">${pct}% Completed</div>
          </td>
          <td>
            <span onclick="window.openBadgeDetailModal('badge_chap1')" style="cursor:pointer; font-size:0.775rem; background:#fffbeb; color:#d97706; border:1px solid #fef3c7; padding:4px 10px; border-radius:12px; font-weight:700; display:inline-flex; align-items:center; gap:6px;">
              🥇 Computer Starter Badge
            </span>
          </td>
          <td>
            <span class="status-select-badge ${isIssued ? 'approved' : (isEligible ? 'approved' : 'pending')}" style="${isEligible && !isIssued ? 'background:#dcfce7; color:#15803d;' : ''}">
              ${isIssued ? 'Issued ✅' : (isEligible ? 'Eligible' : 'In Progress')}
            </span>
          </td>
          <td class="text-right">
            ${isIssued ? `
              <button type="button" class="btn btn-sm btn-outline-clean" onclick="window.openCertificateViewerModal('${s.email}', '${escapeHtml(s.fullName)}', ${s.gradeNumber || 3})" style="border-radius:14px; font-size:0.775rem; font-weight:700; color:#2563eb;">
                <i class="fa-solid fa-scroll"></i> View Certificate
              </button>
            ` : `
              <button type="button" class="btn btn-sm btn-primary" onclick="window.issueCertificateToStudent('${s.email}', '${escapeHtml(s.fullName)}', ${s.gradeNumber || 3})" style="border-radius:14px; font-size:0.775rem; font-weight:700;" ${!isEligible ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                <i class="fa-solid fa-award"></i> Issue Certificate
              </button>
            `}
          </td>
        </tr>
      `;
    }).join('');
  };

  // ── 6. Mentor Analytics View ───────────────────────────────────────────────
  window.renderMentorAnalyticsView = async function () {
    const container = document.getElementById('mentorAnalyticsContainer');
    if (!container) return;

    const tok = localStorage.getItem('lms_token');
    const headers = tok ? { 'Authorization': `Bearer ${tok}` } : {};

    let stats = {
      totalStudents: 3,
      approvedToday: 12,
      chaptersUnlocked: 6,
      coursesCount: 5,
      attendancePercentage: 98.5
    };

    try {
      const res = await fetch(`${API_BASE}/admin/dashboard`, { headers });
      if (res.ok) {
        const data = await res.json();
        stats = { ...stats, ...data };
      }
    } catch (e) {}

    const elTotal = document.getElementById('analyticsValTotalStudents');
    const elApproved = document.getElementById('analyticsValApprovedSubmissions');
    const elUnlocked = document.getElementById('analyticsValUnlockedChapters');

    if (elTotal) elTotal.textContent = stats.totalStudents || 3;
    if (elApproved) elApproved.textContent = stats.approvedToday || 12;
    if (elUnlocked) elUnlocked.textContent = stats.chaptersUnlocked || 6;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
        <div style="border:1px solid #cbd5e1; border-radius:12px; padding:16px; background:#f8fafc;">
          <div style="font-size:0.8rem; font-weight:700; color:#64748b;">TOTAL COURSES</div>
          <div style="font-size:1.8rem; font-weight:800; color:#2563eb; margin-top:4px;">${stats.coursesCount} Grades</div>
        </div>
        <div style="border:1px solid #cbd5e1; border-radius:12px; padding:16px; background:#f8fafc;">
          <div style="font-size:0.8rem; font-weight:700; color:#64748b;">ATTENDANCE RATE</div>
          <div style="font-size:1.8rem; font-weight:800; color:#10b981; margin-top:4px;">${stats.attendancePercentage}%</div>
        </div>
      </div>
    `;
  };

  // ── 7. Student Assignments View ───────────────────────────────────────────
  window.renderStudentAssignmentsView = function (targetContainerId = 'studentAssignmentsView') {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    const gradeNum = getStudentGradeNumber() || 3;
    const assignments = JSON.parse(localStorage.getItem('lms_mentor_assignments') || '[]');
    const localSubs = JSON.parse(localStorage.getItem('lms_admin_submissions') || '[]');
    const currentUserEmail = localStorage.getItem('lms_current_user_email') || 'student3@school.com';

    // STRICT FILTER: Only show assignments for student's grade AND ONLY IF UNLOCKED BY MENTOR!
    const unlockedAssignments = assignments.filter(a => (a.gradeNumber || 3) === gradeNum && a.isUnlocked === true);

    if (unlockedAssignments.length === 0) {
      const emptyHtml = `
        <div class="page-title-section" style="margin-bottom:20px;">
          <h1 class="page-title">Grade ${gradeNum} Assignments</h1>
          <p class="page-subtitle">Mentor assigned tasks for your class.</p>
        </div>
        <div class="dashed-empty-card margin-top-lg">
          <div class="empty-icon-box blue-box">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h3 class="empty-card-heading">No Unlocked Assignments</h3>
          <p class="empty-card-subtext">Your mentor has not unlocked any assignments for Grade ${gradeNum} yet.</p>
        </div>
      `;
      container.innerHTML = emptyHtml;
      return emptyHtml;
    }

    const cardsHtml = unlockedAssignments.map(a => {
      const sub = localSubs.find(s => String(s.assignmentId) === String(a.id) || (s.taskTitle === a.title && s.studentEmail && s.studentEmail.toLowerCase() === currentUserEmail.toLowerCase()));
      const isGraded = sub && (sub.status === 'GRADED' || sub.status === 'REVIEWED');
      const isSubmitted = sub && sub.status === 'SUBMITTED';
      const isRejected = sub && sub.status === 'REJECTED';

      const badgeClass = isGraded ? 'approved' : (isSubmitted ? 'pending' : (isRejected ? 'disabled' : 'pending'));
      const badgeText = isGraded ? `Graded (${sub.score || 100}/100)` : (isSubmitted ? 'Submitted' : (isRejected ? 'Needs Revision' : 'Pending Submission'));

      return `
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:20px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:#2563eb; background:#eff6ff; padding:3px 10px; border-radius:6px; display:inline-block; margin-bottom:6px;">
              ${escapeHtml(a.chapterTitle || 'Chapter Task')} &bull; Unlocked by Mentor
            </div>
            <h3 style="font-size:1.1rem; font-weight:700; color:#0f172a; margin:0;">${escapeHtml(a.title)}</h3>
            <p style="font-size:0.85rem; color:#64748b; margin-top:6px; margin-bottom:0;">
              ${escapeHtml(a.description || '')}
            </p>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="status-select-badge ${badgeClass}">${badgeText}</span>
            <a href="${a.fileUrl || '#'}" target="_blank" class="btn btn-sm btn-outline-clean" style="border-radius:10px; font-size:0.8rem; font-weight:600;">
              <i class="fa-solid fa-file-pdf"></i> View Attachment
            </a>
            <button type="button" class="btn btn-sm btn-primary btn-open-submit-modal" data-assign-id="${a.id}" data-assign-title="${escapeHtml(a.title)}" data-assign-chap="${escapeHtml(a.chapterTitle || '')}" data-assign-desc="${escapeHtml(a.description || '')}" data-assign-url="${a.fileUrl || ''}" style="border-radius:10px; font-size:0.825rem; font-weight:700; padding:8px 16px;">
              <i class="fa-solid fa-paper-plane"></i> ${isSubmitted ? 'Resubmit Assignment' : 'Open & Submit Task'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    const fullContent = `
      <div class="page-title-section" style="margin-bottom:20px;">
        <h1 class="page-title">Grade ${gradeNum} Assignments</h1>
        <p class="page-subtitle">Unlocked tasks assigned by your mentor.</p>
      </div>
      <div style="margin-top:16px;">
        ${cardsHtml}
      </div>
    `;

    container.innerHTML = fullContent;

    // Attach click handler for "Open & Submit Task" modal
    container.querySelectorAll('.btn-open-submit-modal').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-assign-id');
        const title = btn.getAttribute('data-assign-title');
        const chap = btn.getAttribute('data-assign-chap');
        const desc = btn.getAttribute('data-assign-desc');
        const url = btn.getAttribute('data-assign-url');

        document.getElementById('submitModalAssignmentId').value = id;
        document.getElementById('submitModalTaskTitle').textContent = title;
        document.getElementById('submitModalChapterText').textContent = chap;
        document.getElementById('submitModalTaskDesc').textContent = desc;
        document.getElementById('submitModalFileLink').href = url || '#';
        document.getElementById('submitModalStudentEmail').value = currentUserEmail;

        const modal = document.getElementById('modalStudentSubmitAssignment');
        if (modal) modal.classList.remove('hidden');
      };
    });

    return fullContent;
  };

  // Close Student Submit Assignment Modal
  document.getElementById('btnCloseStudentSubmitModal')?.addEventListener('click', () => {
    document.getElementById('modalStudentSubmitAssignment')?.classList.add('hidden');
  });

  // Handle Form Submit for Student Assignment
  document.getElementById('formStudentAssignmentSubmission')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const assignmentId = document.getElementById('submitModalAssignmentId')?.value;
    const studentEmail = document.getElementById('submitModalStudentEmail')?.value.trim();
    const fileUrl = document.getElementById('submitModalFileUrl')?.value.trim();
    const notes = document.getElementById('submitModalNotes')?.value.trim();

    const title = document.getElementById('submitModalTaskTitle')?.textContent || 'Assignment';
    const chap = document.getElementById('submitModalChapterText')?.textContent || 'Chapter';
    const gradeNum = getStudentGradeNumber() || 3;
    const studentName = localStorage.getItem('lms_current_user_name') || 'Student User';

    if (!studentEmail || !fileUrl) return;

    showToast('Submitting assignment to mentor...', 'info');

    const localSubs = JSON.parse(localStorage.getItem('lms_admin_submissions') || '[]');
    const newSubmission = {
      id: Date.now(),
      assignmentId,
      studentName,
      studentEmail,
      gradeNumber: gradeNum,
      dayClassTopic: chap,
      taskTitle: title,
      submissionUrl: fileUrl,
      notes,
      status: 'SUBMITTED',
      score: null,
      submittedAt: new Date().toISOString()
    };

    localSubs.unshift(newSubmission);
    localStorage.setItem('lms_admin_submissions', JSON.stringify(localSubs));

    const tok = localStorage.getItem('lms_token');
    if (tok) {
      try {
        await fetch(`${API_BASE}/student/assignments/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tok}` },
          body: JSON.stringify(newSubmission)
        });
      } catch (err) {}
    }

    document.getElementById('modalStudentSubmitAssignment')?.classList.add('hidden');
    document.getElementById('formStudentAssignmentSubmission')?.reset();

    showToast('🎉 Assignment submitted successfully to Mentor!', 'success');
    window.renderStudentAssignmentsView();

    if (typeof window.renderMentorAssignmentsView === 'function') {
      window.renderMentorAssignmentsView();
    }
  });

  // Modal Helper: Student Practical Activity Submission
  window.openStudentSubmitActivityModal = function (stateKey, gradeNum, classId, classTitle, chapTitle, pdfUrl) {
    const modal = document.getElementById('modalStudentSubmitActivity');
    if (!modal) return;

    document.getElementById('submitActModalStateKey').value = stateKey;
    document.getElementById('submitActModalGradeNum').value = gradeNum;
    document.getElementById('submitActModalClassId').value = classId;

    document.getElementById('submitActModalChapText').textContent = chapTitle || `Grade ${gradeNum}`;
    document.getElementById('submitActModalClassTitle').textContent = classTitle || `Class ${classId} Practical Activity`;

    const emailInput = document.getElementById('submitActModalStudentEmail');
    if (emailInput) {
      emailInput.value = localStorage.getItem('lms_current_user_email') || 'student5@school.com';
    }

    const pdfLink = document.getElementById('submitActModalPdfLink');
    if (pdfLink) {
      pdfLink.onclick = function () {
        window.openDocInNewTab(pdfUrl, `${classTitle} Practical Worksheet`);
        return false;
      };
    }

    modal.classList.remove('hidden');
  };

  document.getElementById('btnCloseStudentSubmitActModal')?.addEventListener('click', () => {
    document.getElementById('modalStudentSubmitActivity')?.classList.add('hidden');
  });

  document.getElementById('formStudentActivitySubmission')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const stateKey = document.getElementById('submitActModalStateKey')?.value;
    const gradeNum = parseInt(document.getElementById('submitActModalGradeNum')?.value || '3');
    const classId = document.getElementById('submitActModalClassId')?.value;
    const studentEmail = (document.getElementById('submitActModalStudentEmail')?.value || '').toLowerCase().trim();
    const fileUrl = document.getElementById('submitActModalFileUrl')?.value.trim();
    const notes = document.getElementById('submitActModalNotes')?.value.trim();

    const classTitle = document.getElementById('submitActModalClassTitle')?.textContent || 'Practical Activity';
    const chapTitle = document.getElementById('submitActModalChapText')?.textContent || 'Chapter';
    const studentName = localStorage.getItem('lms_current_user_name') || (studentEmail.includes('englorayman') ? 'Englorayman JD' : (studentEmail.includes('sriram') ? 'SRIRAM Mayan' : 'GOWTHAM D'));

    if (!studentEmail || !fileUrl) return;

    const submissions = JSON.parse(localStorage.getItem('lms_submitted_activities') || '[]');
    const nowStr = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const newSub = {
      submissionId: `act_sub_${Date.now()}`,
      stateKey,
      gradeNumber: gradeNum,
      classId,
      classTitle,
      chapterTitle: chapTitle,
      studentEmail,
      studentName,
      fileUrl,
      notes,
      submittedAt: nowStr,
      verified: false
    };

    submissions.unshift(newSub);
    localStorage.setItem('lms_submitted_activities', JSON.stringify(submissions));

    document.getElementById('modalStudentSubmitActivity')?.classList.add('hidden');
    showToast('🎉 Practical activity submitted successfully to Mentor!', 'success');

    window.renderStudentActivitiesView();
    if (typeof window.renderMentorActivitiesView === 'function') {
      window.renderMentorActivitiesView();
    }
  });

  // ── 8. Student Practical Activities View ────────────────────────────────────
  window.renderStudentActivitiesView = function () {
    const container = document.getElementById('studentActivitiesContainer') || document.getElementById('studentActivitiesView');
    if (!container) return;

    const gradeNum = getStudentGradeNumber() || 3;
    const chapters = getChaptersForGrade(gradeNum);
    const assignedState = JSON.parse(localStorage.getItem('lms_assigned_activities') || '{}');
    const submittedList = JSON.parse(localStorage.getItem('lms_submitted_activities') || '[]');
    const currentUserEmail = (localStorage.getItem('lms_current_user_email') || 'jdenglorayman@gmail.com').toLowerCase();

    // Default: Class 1 is assigned if empty
    if (Object.keys(assignedState).length === 0) {
      assignedState[`grade_${gradeNum}_class_1`] = true;
    }

    let assignedCount = 0;

    const chaptersHtml = chapters.map(chap => {
      const classes = chap.classes || [];
      const chapNum = chap.chapterNumber || chap.id || 1;
      
      const assignedClasses = classes.filter((c, idx) => {
        const classId = c.id || c.dayNumber;
        const stateKey = `grade_${gradeNum}_class_${classId}`;
        return !!assignedState[stateKey] || (chapNum === 1 && (idx === 0 || classId == 1));
      });

      if (assignedClasses.length === 0) return '';

      assignedCount += assignedClasses.length;

      const classCards = assignedClasses.map((c, idx) => {
        const classId = c.id || c.dayNumber;
        const stateKey = `grade_${gradeNum}_class_${classId}`;
        const dayNum = c.dayNumber || (idx + 1);
        const { practicalPdf } = window.getClassResourceUrls(gradeNum, chapNum, dayNum, idx + 1, c);

        const studentSub = submittedList.find(s => s.stateKey === stateKey && s.studentEmail === currentUserEmail);

        return `
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px 22px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
            <div>
              <div style="font-size:0.75rem; font-weight:700; color:#2563eb; background:#eff6ff; padding:2px 8px; border-radius:6px; display:inline-block; margin-bottom:4px;">
                Class ${c.dayNumber} &bull; Practical Activity (Assigned by Mentor)
              </div>
              <h3 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin:0;">${escapeHtml(c.title || ('Class ' + c.dayNumber))}</h3>
              <p style="font-size:0.825rem; color:#64748b; margin-top:4px; margin-bottom:0;">
                <i class="fa-solid fa-flask text-blue"></i> Lab Activity: ${escapeHtml(c.taskTitle || 'In-Class Practical Lab & Drills')}
              </p>
              ${studentSub ? `
                <div style="font-size:0.775rem; font-weight:700; color:${studentSub.verified ? '#15803d' : '#2563eb'}; margin-top:6px; display:flex; align-items:center; gap:6px;">
                  <i class="fa-solid fa-circle-check"></i> Submitted to Mentor on ${escapeHtml(studentSub.submittedAt)} ${studentSub.verified ? '(Verified & Complete ✅)' : '(Awaiting Mentor Verification)'}
                </div>
              ` : ''}
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
              <button type="button" onclick="window.openDocInNewTab('${practicalPdf}', 'Class ${c.dayNumber}: Practical Activity Worksheet'); return false;" class="btn btn-sm btn-outline-clean" style="border-radius:10px; font-weight:600; font-size:0.8rem; height:36px; display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
                <i class="fa-solid fa-file-pdf text-danger"></i> View Worksheet PDF
              </button>

              ${studentSub ? `
                <button type="button" onclick="window.openDocInNewTab('${studentSub.fileUrl}', 'My Submission'); return false;" class="btn btn-sm btn-outline-clean" style="border-radius:10px; font-weight:700; font-size:0.8rem; height:36px; color:#2563eb;">
                  <i class="fa-solid fa-paperclip"></i> View My Solution
                </button>
              ` : `
                <button type="button" class="btn btn-sm btn-primary" onclick="window.openStudentSubmitActivityModal('${stateKey}', ${gradeNum}, '${classId}', '${escapeHtml(c.title || ('Class ' + c.dayNumber))}', '${escapeHtml(chap.chapterTitle || chap.title || ('Chapter ' + chap.chapterNumber))}', '${practicalPdf}')" style="border-radius:10px; font-weight:700; font-size:0.8rem; height:36px; padding:0 14px;">
                  <i class="fa-solid fa-file-arrow-up"></i> Complete & Submit
                </button>
              `}
            </div>
          </div>
        `;
      }).join('');

      return `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:20px; margin-bottom:18px;">
          <h3 style="font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:14px;">
            <i class="fa-solid fa-folder-open text-blue"></i> ${escapeHtml(chap.chapterTitle || chap.title || ('Chapter ' + chap.chapterNumber))} Practical Activities
          </h3>
          ${classCards}
        </div>
      `;
    }).join('');

    if (assignedCount === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px 20px; background:#ffffff; border:1px solid #cbd5e1; border-radius:16px;">
          <i class="fa-solid fa-flask" style="font-size:2.5rem; color:#cbd5e1; margin-bottom:12px;"></i>
          <h3 style="font-size:1.1rem; font-weight:700; color:#0f172a; margin:0;">No practical activities assigned yet</h3>
          <p style="font-size:0.85rem; color:#64748b; margin-top:6px; margin-bottom:0;">Your mentor has not assigned any practical activities for your class yet. Assigned tasks will appear here.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="margin-top:16px;">
        ${chaptersHtml}
      </div>
    `;
  };

  // ── 9. Student Learning Resources View (ONLY UNLOCKED CONTENT) ─────────────
  window.renderStudentResourcesView = function () {
    const container = document.getElementById('studentResourcesContainer') || document.getElementById('studentResourcesView');
    if (!container) return;

    const gradeNum = getStudentGradeNumber() || 3;
    const chapters = getChaptersForGrade(gradeNum);
    const mentorRes = JSON.parse(localStorage.getItem('lms_mentor_resources') || '[]').filter(r => r.gradeNumber === gradeNum);

    let itemsHtml = '';

    // 1. Published Custom Mentor Resources
    if (mentorRes.length > 0) {
      itemsHtml += `
        <div style="margin-bottom:20px;">
          <h3 style="font-size:1rem; font-weight:700; color:#0f172a; margin-bottom:10px;"><i class="fa-solid fa-cloud-arrow-up text-blue"></i> Mentor Published Learning Resources</h3>
          ${mentorRes.map(r => `
            <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; padding:14px 18px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="width:38px; height:38px; border-radius:10px; background:#eff6ff; color:#2563eb; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
                  <i class="fa-solid ${r.type === 'PDF' ? 'fa-file-pdf' : (r.type === 'VIDEO' ? 'fa-video' : 'fa-link')}"></i>
                </div>
                <div>
                  <h4 style="font-size:0.925rem; font-weight:700; color:#0f172a; margin:0;">${escapeHtml(r.title)}</h4>
                  <p style="font-size:0.775rem; color:#64748b; margin:0;">CLASS ${gradeNum}th &bull; ${r.type} Resource</p>
                </div>
              </div>
              <a href="${r.url}" target="_blank" onclick="window.openDocInNewTab('${r.url}', '${escapeHtml(r.title)}'); return false;" class="btn btn-sm btn-primary" style="border-radius:10px; font-weight:700; font-size:0.8rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Resource
              </a>
            </div>
          `).join('')}
        </div>
      `;
    }

    // 2. Unlocked Chapter Resources ONLY
    let unlockedChaptersCount = 0;

    chapters.forEach((chap, chapIdx) => {
      const cList = chap.classes || [];
      const chapNum = chap.chapterNumber || chap.id || (chapIdx + 1);

      // Check if Chapter is Unlocked by Mentor / System
      const isChapUnlocked = typeof window.isChapterUnlocked === 'function' ? window.isChapterUnlocked(gradeNum, chapNum) : (chapIdx === 0 || chapNum === 1);

      if (!isChapUnlocked) return;

      unlockedChaptersCount++;

      itemsHtml += `
        <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="font-size:1rem; font-weight:700; color:#0f172a; margin:0;">
              <i class="fa-solid fa-folder-open text-blue"></i> ${escapeHtml(chap.chapterTitle || chap.title || `Chapter ${chap.chapterNumber}`)} Resources
            </h3>
            <span class="badge badge-soft-blue" style="font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-lock-open"></i> Unlocked</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
            ${cList.map((c, idx) => {
              const dayNum = c.dayNumber || (idx + 1);
              const { topicPdf, practicalPdf, videoUrl } = window.getClassResourceUrls(gradeNum, chapNum, dayNum, idx + 1, c);
              return `
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px;">
                  <div style="font-size:0.85rem; font-weight:700; color:#0f172a; margin-bottom:6px;">
                    Class ${c.dayNumber}: ${escapeHtml(c.title || `Class ${c.dayNumber}`)}
                  </div>
                  <div style="display:flex; flex-direction:column; gap:6px;">
                    <a href="${topicPdf}" target="_blank" onclick="window.openDocInNewTab('${topicPdf}', 'Class ${c.dayNumber}: Topics Covered Document'); return false;" style="font-size:0.8rem; color:#2563eb; text-decoration:none; font-weight:600; display:flex; align-items:center; gap:6px;">
                      <i class="fa-solid fa-file-pdf text-blue"></i> Topics Covered Document (PDF)
                    </a>
                    <a href="${practicalPdf}" target="_blank" onclick="window.openDocInNewTab('${practicalPdf}', 'Class ${c.dayNumber}: Practical Activity Worksheet'); return false;" style="font-size:0.8rem; color:#059669; text-decoration:none; font-weight:600; display:flex; align-items:center; gap:6px;">
                      <i class="fa-solid fa-pen-ruler text-emerald"></i> Practical Activity Worksheet (PDF)
                    </a>
                    <a href="${videoUrl}" target="_blank" style="font-size:0.8rem; color:#7c3aed; text-decoration:none; font-weight:600; display:flex; align-items:center; gap:6px;">
                      <i class="fa-solid fa-circle-play text-purple"></i> Watch Class Video Lecture
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    if (unlockedChaptersCount === 0 && mentorRes.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px 20px; background:#ffffff; border:1px solid #cbd5e1; border-radius:16px;">
          <i class="fa-solid fa-lock" style="font-size:2.5rem; color:#cbd5e1; margin-bottom:12px;"></i>
          <h3 style="font-size:1.1rem; font-weight:700; color:#0f172a; margin:0;">No unlocked resources available</h3>
          <p style="font-size:0.85rem; color:#64748b; margin-top:6px; margin-bottom:0;">Your mentor has not unlocked chapter resources for your class yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="margin-top:16px;">
        ${itemsHtml}
      </div>
    `;
  };

  // ── 10. Student Attendance View ───────────────────────────────────────────
  window.renderStudentAttendanceView = async function () {
    const container = document.getElementById('studentAttendanceView');
    if (!container) return;

    const studentGrade = getStudentGradeNumber() || 3;
    const currentUserEmail = (localStorage.getItem('lms_current_user_email') || 'jdenglorayman@gmail.com').toLowerCase();

    // Read all saved attendance entries recorded by mentor
    const allLogs = getAttendanceRecordsV2();

    // STRICT USER REQUIREMENT: Only show dates where the mentor has saved/updated attendance for student's grade!
    const studentHistory = [];

    allLogs.forEach(log => {
      if (log.gradeNumber === studentGrade && Array.isArray(log.students)) {
        // Find matching status for this student
        const stMatch = log.students.find(s => (s.email && s.email.toLowerCase() === currentUserEmail) || true);
        if (stMatch) {
          studentHistory.push({
            date: log.date,
            gradeNumber: log.gradeNumber,
            status: stMatch.status || 'PRESENT',
            savedAt: log.savedAt || log.date,
            savedBy: log.savedBy || 'Mentor'
          });
        }
      }
    });

    const totalMarkedDays = studentHistory.length;
    const presentCount = studentHistory.filter(r => r.status === 'PRESENT').length;
    const lateCount = studentHistory.filter(r => r.status === 'LATE').length;
    const absentCount = studentHistory.filter(r => r.status === 'ABSENT').length;
    const attendanceRate = totalMarkedDays > 0 ? Math.round(((presentCount + lateCount) / totalMarkedDays) * 100) : 100;

    const historyRows = studentHistory.map(r => {
      let badgeHtml = '';
      if (r.status === 'PRESENT') {
        badgeHtml = `<span style="background:#dcfce7; color:#15803d; padding:4px 12px; border-radius:8px; font-weight:700; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;"><i class="fa-solid fa-circle-check"></i> Present</span>`;
      } else if (r.status === 'LATE') {
        badgeHtml = `<span style="background:#fef3c7; color:#b45309; padding:4px 12px; border-radius:8px; font-weight:700; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;"><i class="fa-solid fa-clock"></i> Late</span>`;
      } else {
        badgeHtml = `<span style="background:#fee2e2; color:#b91c1c; padding:4px 12px; border-radius:8px; font-weight:700; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;"><i class="fa-solid fa-circle-xmark"></i> Absent</span>`;
      }

      return `
        <tr>
          <td style="font-weight:700; color:#0f172a;"><i class="fa-regular fa-calendar-check text-blue"></i> ${r.date}</td>
          <td><span class="badge badge-soft-blue">CLASS ${r.gradeNumber}th</span></td>
          <td>${badgeHtml}</td>
          <td style="color:#64748b; font-size:0.825rem;"><i class="fa-solid fa-user-check"></i> Marked by ${escapeHtml(r.savedBy)} on ${escapeHtml(r.savedAt)}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="page-title-section">
        <h1 class="page-title">My Attendance Register</h1>
        <p class="page-subtitle">Your daily record, attendance percentage and verified log from your mentor.</p>
      </div>

      <div class="metric-cards-grid margin-top-lg" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
        <div class="metric-card" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px;">
          <span style="font-size:0.775rem; font-weight:700; color:#64748b;">ATTENDANCE RATE</span>
          <div style="font-size:1.8rem; font-weight:800; color:#10b981; margin-top:4px;">${attendanceRate}%</div>
        </div>
        <div class="metric-card" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px;">
          <span style="font-size:0.775rem; font-weight:700; color:#64748b;">DAYS PRESENT</span>
          <div style="font-size:1.8rem; font-weight:800; color:#2563eb; margin-top:4px;">${presentCount + lateCount}</div>
        </div>
        <div class="metric-card" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px;">
          <span style="font-size:0.775rem; font-weight:700; color:#64748b;">DAYS ABSENT</span>
          <div style="font-size:1.8rem; font-weight:800; color:#ef4444; margin-top:4px;">${absentCount}</div>
        </div>
      </div>

      <div class="content-panel-card margin-top-lg" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="font-size:1rem; font-weight:700; color:#0f172a; margin:0;"><i class="fa-solid fa-calendar-days text-blue"></i> Official Verified Attendance Records</h3>
          <span style="font-size:0.8rem; color:#64748b; font-weight:600;">${totalMarkedDays} Days Marked by Mentor</span>
        </div>

        ${totalMarkedDays > 0 ? `
          <table class="attendance-data-table mentor-students-table">
            <thead>
              <tr>
                <th>DATE</th>
                <th>CLASS</th>
                <th>ATTENDANCE STATUS</th>
                <th>MENTOR VERIFICATION</th>
              </tr>
            </thead>
            <tbody>
              ${historyRows}
            </tbody>
          </table>
        ` : `
          <div style="text-align:center; padding:40px 20px; color:#64748b;">
            <i class="fa-regular fa-clipboard" style="font-size:2.5rem; color:#cbd5e1; margin-bottom:12px;"></i>
            <h4 style="font-size:1rem; font-weight:700; color:#0f172a; margin:0;">No attendance records marked yet</h4>
            <p style="font-size:0.85rem; margin-top:4px; margin-bottom:0;">Your mentor has not updated attendance for any dates yet. Dates will appear here once marked by your mentor.</p>
          </div>
        `}
      </div>
    `;
  };

  // ── 11. Student Progress View ─────────────────────────────────────────────
  window.renderStudentProgressView = function () {
    const container = document.getElementById('studentProgressView');
    if (!container) return;

    const studentGrade = getStudentGradeNumber() || 3;
    const currentUserEmail = (localStorage.getItem('lms_current_user_email') || 'jdenglorayman@gmail.com').toLowerCase();

    // Check if certificate has been issued by mentor for this student
    const issuedCerts = JSON.parse(localStorage.getItem('lms_issued_certificates') || '{}');
    const isCertIssued = !!issuedCerts[currentUserEmail];

    const badgesCount = 2;
    const certCount = isCertIssued ? 1 : 0;
    const progressPercent = 100;

    container.innerHTML = `
      <div class="page-title-section">
        <h1 class="page-title">Progress & Achievements</h1>
        <p class="page-subtitle">Your learning progress, completion badges, and certificates.</p>
      </div>

      <div class="metric-cards-grid margin-top-lg" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
        <div class="metric-card" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px;">
          <span style="font-size:0.775rem; font-weight:700; color:#64748b;">BADGES EARNED</span>
          <div style="font-size:1.8rem; font-weight:800; color:#f59e0b; margin-top:4px;">${badgesCount} Badges</div>
        </div>
        <div class="metric-card" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px;">
          <span style="font-size:0.775rem; font-weight:700; color:#64748b;">CERTIFICATES</span>
          <div style="font-size:1.8rem; font-weight:800; color:#2563eb; margin-top:4px;">${certCount} Certificate</div>
        </div>
        <div class="metric-card" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:18px;">
          <span style="font-size:0.775rem; font-weight:700; color:#64748b;">OVERALL PROGRESS</span>
          <div style="font-size:1.8rem; font-weight:800; color:#10b981; margin-top:4px;">${progressPercent}% Completed</div>
        </div>
      </div>

      <div class="content-panel-card margin-top-lg" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:14px; padding:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="font-size:1rem; font-weight:700; color:#0f172a; margin:0;"><i class="fa-solid fa-award text-amber"></i> Issued Badges & Certificates</h3>
          <span style="font-size:0.8rem; color:#64748b; font-weight:600;">Click any badge to view topic information</span>
        </div>

        <div style="display:flex; gap:16px; flex-wrap:wrap;">
          <!-- Badge 1 Card -->
          <div onclick="window.openBadgeDetailModal('badge_chap1')" style="border:1px solid #fef3c7; background:#fffbeb; padding:16px 20px; border-radius:14px; display:flex; align-items:center; gap:14px; cursor:pointer; min-width:260px; transition:transform 0.15s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <span style="font-size:2.2rem;">🥇</span>
            <div>
              <h4 style="font-size:0.95rem; font-weight:700; color:#b45309; margin:0;">Computer Starter Badge</h4>
              <p style="font-size:0.775rem; color:#d97706; margin:0;">Awarded for Chapter 1 Mastery</p>
            </div>
          </div>

          <!-- Badge 2 Card -->
          <div onclick="window.openBadgeDetailModal('badge_chap2')" style="border:1px solid #dbeafe; background:#eff6ff; padding:16px 20px; border-radius:14px; display:flex; align-items:center; gap:14px; cursor:pointer; min-width:260px; transition:transform 0.15s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <span style="font-size:2.2rem;">💬</span>
            <div>
              <h4 style="font-size:0.95rem; font-weight:700; color:#1e40af; margin:0;">English Communication Champ</h4>
              <p style="font-size:0.775rem; color:#2563eb; margin:0;">Awarded for Chapter 2 Mastery</p>
            </div>
          </div>

          <!-- Certificate Card (Matching Image 2 & User Requirement) -->
          ${isCertIssued ? `
            <div onclick="window.openCertificateViewerModal('${currentUserEmail}')" style="border:1px solid #bfdbfe; background:#eff6ff; padding:16px 20px; border-radius:14px; display:flex; align-items:center; gap:14px; cursor:pointer; min-width:270px; transition:transform 0.15s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="width:42px; height:42px; border-radius:10px; background:#2563eb; color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:1.25rem;"><i class="fa-solid fa-scroll"></i></div>
              <div>
                <h4 style="font-size:0.95rem; font-weight:700; color:#1e40af; margin:0;">Certificate of Completion</h4>
                <p style="font-size:0.775rem; color:#2563eb; margin:0;">Grade ${studentGrade} Computer Skills Course &bull; Click to View</p>
              </div>
            </div>
          ` : `
            <div style="border:1px dashed #cbd5e1; background:#f8fafc; padding:16px 20px; border-radius:14px; display:flex; align-items:center; gap:14px; opacity:0.75; min-width:270px;">
              <div style="width:42px; height:42px; border-radius:10px; background:#e2e8f0; color:#64748b; display:flex; align-items:center; justify-content:center; font-size:1.2rem;"><i class="fa-solid fa-lock"></i></div>
              <div>
                <h4 style="font-size:0.95rem; font-weight:700; color:#64748b; margin:0;">Certificate of Completion</h4>
                <p style="font-size:0.775rem; color:#94a3b8; margin:0;">Requires 100% Completion & Mentor Issuance</p>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  };

  // Initialize App Router
  init();
});

