/* ==========================================================================
   ENGLORAY LEARNING - DYNAMIC JSON NAVIGATION ENGINE & URL ROUTER
   Loads class data from COURSES_DATA JSON object dynamically
   Supports clean URL routing: /grade-3/chapter-1/class-1, /grade-5/chapter-1/overview, etc.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // LMS Application State
  const state = {
    currentClassId: 6, // Default Class ID
    currentView: 'learning', // 'learning' or 'overview'
    completedStepsPerClass: {},
    unlockedClassIds: [6, 7, 301, 401, 601, 701, 801, 901, 1001], // Class 1 unlocked across all grades
    selectedQuizOptionId: null,
    selectedFile: null
  };

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

  function handleCurrentRoute() {
    ensureClass1UnlockedForAllGrades();
    const route = getRouteInfo();

    let targetGradeNum = 3;
    let targetChapterNum = 1;
    let targetDayNum = 1;
    let isOverview = false;

    if (route) {
      targetGradeNum = route.gradeNum;
      targetChapterNum = route.chapterNum;
      targetDayNum = route.classDayNum;
      isOverview = route.isOverview;
    } else if (elements.gradeSelectDropdown) {
      targetGradeNum = parseInt(elements.gradeSelectDropdown.value) || 3;
    }

    let targetGrade = COURSES_DATA.grades ? COURSES_DATA.grades.find(g => g.gradeNumber === targetGradeNum) : null;
    if (!targetGrade && COURSES_DATA.grades && COURSES_DATA.grades.length > 0) {
      targetGrade = COURSES_DATA.grades[0];
      targetGradeNum = targetGrade.gradeNumber;
    }

    if (targetGrade && targetGrade.chapters && targetGrade.chapters.length > 0) {
      const firstChapter = targetGrade.chapters[0];
      COURSES_DATA.classes = firstChapter.classes;
      COURSES_DATA.currentGradeNumber = targetGradeNum;

      if (elements.gradeDisplayBadge) {
        elements.gradeDisplayBadge.textContent = `Grade ${targetGradeNum}`;
      }

      const activeBreadcrumb = document.getElementById('breadcrumbChapterTitle');
      if (activeBreadcrumb) {
        activeBreadcrumb.textContent = firstChapter.chapterTitle;
      }

      if (isOverview) {
        showCourseOverviewPage(false);
      } else {
        const targetClass = firstChapter.classes.find(c => c.dayNumber === targetDayNum) || firstChapter.classes[0];
        loadClassView(targetClass.id, false);
      }

      updateURLRoute(targetGradeNum, targetChapterNum, isOverview ? 1 : targetDayNum, isOverview, true);
    }
  }

  // 1. App Initialization & Real-Time Admin Sync
  function init() {
    setupViewSwitching();
    setupStepActions();
    setupFileUpload();

    // Listen for browser Back / Forward navigation
    window.addEventListener('popstate', () => {
      handleCurrentRoute();
    });

    // Handle initial route parsing
    handleCurrentRoute();

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

    // Step 1: Video
    elements.step1Title.textContent = classData.steps.step1Video.title;
    elements.step1Desc.textContent = classData.steps.step1Video.description;
    elements.youtubeIframe.src = classData.steps.step1Video.videoUrl;

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
    elements.btnBackToCourse?.addEventListener('click', () => {
      showToast('Navigating back to Course Overview Page...', 'info');
      showCourseOverviewPage();
    });

    elements.logoHeaderHome?.addEventListener('click', () => {
      showCourseOverviewPage();
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

  // 8. Step Completion Actions
  function setupStepActions() {
    // Step 1 Video
    elements.btnCompleteStep1?.addEventListener('click', () => {
      state.completedStepsPerClass[state.currentClassId].step1Video = true;
      markStepBadgeCompleted(elements.step1StatusBadge, 'Watched');
      elements.btnCompleteStep1.classList.remove('btn-primary');
      elements.btnCompleteStep1.classList.add('btn-outline');
      elements.btnCompleteStep1.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 1 Completed';
      showToast('Step 1 Complete: Lesson Video Watched!', 'success');
      updateProgressUI();
    });

    // Step 2 Topic PDF
    elements.btnCompleteStep2?.addEventListener('click', () => {
      state.completedStepsPerClass[state.currentClassId].step2TopicPdf = true;
      markStepBadgeCompleted(elements.step2StatusBadge, 'Reviewed');
      elements.btnCompleteStep2.classList.remove('btn-primary');
      elements.btnCompleteStep2.classList.add('btn-outline');
      elements.btnCompleteStep2.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 2 Completed';
      showToast('Step 2 Complete: Topics Reviewed!', 'success');
      updateProgressUI();
    });

    // Step 3 Website Activity
    elements.btnCompleteStep3?.addEventListener('click', () => {
      state.completedStepsPerClass[state.currentClassId].step3Website = true;
      markStepBadgeCompleted(elements.step3StatusBadge, 'Visited');
      elements.btnCompleteStep3.classList.remove('btn-primary');
      elements.btnCompleteStep3.classList.add('btn-outline');
      elements.btnCompleteStep3.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 3 Completed';
      showToast('Step 3 Complete: Interactive Website Activity!', 'success');
      updateProgressUI();
    });

    // Step 4 Quiz Submission (Mandatory 5 Questions)
    elements.btnSubmitQuiz?.addEventListener('click', () => {
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
    });

    elements.btnSubmitTask?.addEventListener('click', () => {
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
      updateProgressUI();
    });
  }

  function handleFileSelected(file) {
    state.selectedFile = file;
    elements.fileNameDisplay.textContent = file.name;
    elements.selectedFileInfo.classList.remove('hidden');
    showToast(`File selected: ${file.name}`, 'info');
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
      elements.btnCompleteStep1.classList.remove('btn-primary');
      elements.btnCompleteStep1.classList.add('btn-outline');
      elements.btnCompleteStep1.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 1 Completed';
    } else {
      resetStepBadge(elements.step1StatusBadge, 'Step 1');
      elements.btnCompleteStep1.className = 'btn btn-primary btn-md';
      elements.btnCompleteStep1.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mark Video as Completed';
    }

    // Step 2
    if (p.step2TopicPdf) {
      markStepBadgeCompleted(elements.step2StatusBadge, 'Reviewed');
      elements.btnCompleteStep2.classList.remove('btn-primary');
      elements.btnCompleteStep2.classList.add('btn-outline');
      elements.btnCompleteStep2.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 2 Completed';
    } else {
      resetStepBadge(elements.step2StatusBadge, 'Step 2');
      elements.btnCompleteStep2.className = 'btn btn-primary btn-md';
      elements.btnCompleteStep2.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mark Topic PDF as Read';
    }

    // Step 3
    if (p.step3Website) {
      markStepBadgeCompleted(elements.step3StatusBadge, 'Visited');
      elements.btnCompleteStep3.classList.remove('btn-primary');
      elements.btnCompleteStep3.classList.add('btn-outline');
      elements.btnCompleteStep3.innerHTML = '<i class="fa-solid fa-check-double"></i> Step 3 Completed';
    } else {
      resetStepBadge(elements.step3StatusBadge, 'Step 3');
      elements.btnCompleteStep3.className = 'btn btn-primary btn-md';
      elements.btnCompleteStep3.innerHTML = '<i class="fa-solid fa-circle-check"></i> Mark Activity Completed';
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

  // Initialize App Router
  init();
});
