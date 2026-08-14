import axios from 'axios';
import {
  getStoredSubmissions,
  saveStoredSubmissions,
  getStoredStudents,
  getStoredCourses,
  getStoredAdmins,
  saveStoredAdmins
} from './mockData';

export const API_BASE_URL = process.env.REACT_APP_API_URL || window.__REACT_APP_API_URL__ || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 4000
});

// Interceptor for JWT token attachment
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('lms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Auth Endpoint
  login: async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      return res.data;
    } catch (err) {
      // Mock Fallback Auth handling
      let role = 'admin';
      let fullName = 'System Administrator';
      if (email.includes('superadmin') || email.includes('super')) {
        role = 'super_admin';
        fullName = 'Super Admin User';
      }
      return {
        token: 'mock-jwt-token-' + Date.now(),
        id: role === 'super_admin' ? 1 : 2,
        email: email,
        fullName: fullName,
        role: role,
        gradeNumber: null
      };
    }
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      const res = await apiClient.get('/admin/dashboard');
      return res.data;
    } catch (err) {
      const submissions = getStoredSubmissions();
      const pending = submissions.filter(s => s.status === 'SUBMITTED').length;
      const approved = submissions.filter(s => s.status === 'GRADED' || s.status === 'REVIEWED').length;
      const rejected = submissions.filter(s => s.status === 'REJECTED').length;
      const students = getStoredStudents();

      const courses = getStoredCourses();
      return {
        totalStudents: students.length,
        activeStudents: students.length,
        pendingSubmissions: pending,
        approvedToday: approved,
        rejectedToday: rejected,
        chaptersUnlocked: 4,
        coursesCount: courses.length,
        attendancePercentage: students.length > 0 ? 100.0 : 0.0
      };
    }
  },

  // Submissions Module
  getSubmissions: async () => {
    try {
      const res = await apiClient.get('/admin/submissions');
      const dbData = res.data || [];
      const localData = getStoredSubmissions() || [];

      const map = new Map();
      if (Array.isArray(localData)) localData.forEach(s => map.set(String(s.id), s));
      if (Array.isArray(dbData)) dbData.forEach(s => map.set(String(s.id), s));

      const merged = Array.from(map.values());
      return merged.length > 0 ? merged : localData;
    } catch (err) {
      return getStoredSubmissions();
    }
  },

  approveSubmission: async (id, score, feedback) => {
    try {
      const res = await apiClient.post(`/admin/submissions/${id}/approve`, null, {
        params: { score, feedback }
      });
      return res.data;
    } catch (err) {
      const submissions = getStoredSubmissions();
      const updated = submissions.map(sub => {
        if (sub.id === parseInt(id)) {
          return {
            ...sub,
            status: 'GRADED',
            score: score || 100,
            teacherFeedback: feedback || 'Approved! Chapter unlocked for student.',
            reviewedAt: new Date().toISOString()
          };
        }
        return sub;
      });
      saveStoredSubmissions(updated);
      return updated.find(s => s.id === parseInt(id));
    }
  },

  rejectSubmission: async (id, feedback) => {
    try {
      const res = await apiClient.post(`/admin/submissions/${id}/reject`, null, {
        params: { feedback }
      });
      return res.data;
    } catch (err) {
      const submissions = getStoredSubmissions();
      const updated = submissions.map(sub => {
        if (sub.id === parseInt(id)) {
          return {
            ...sub,
            status: 'REJECTED',
            teacherFeedback: feedback || 'Needs correction. Please re-upload.',
            reviewedAt: new Date().toISOString()
          };
        }
        return sub;
      });
      saveStoredSubmissions(updated);
      return updated.find(s => s.id === parseInt(id));
    }
  },

  // Chapter Unlock
  unlockChapter: async (chapterId, isLocked) => {
    try {
      const res = await apiClient.put(`/admin/chapters/${chapterId}/lock`, null, {
        params: { isLocked }
      });
      return res.data;
    } catch (err) {
      return { id: chapterId, isLocked: isLocked, message: 'Chapter lock updated successfully' };
    }
  },

  // Students Module
  getStudents: async () => {
    try {
      const res = await apiClient.get('/admin/students');
      return res.data;
    } catch (err) {
      return getStoredStudents();
    }
  },

    // Courses Module
  getCourses: async () => {
    const localCourses = getStoredCourses();
    try {
      const res = await apiClient.get('/admin/courses');
      const apiCourses = res.data || [];
      if (Array.isArray(apiCourses) && apiCourses.length > 0) {
        // Merge API courses with local master courses to guarantee all 8 grades show full chapters
        const map = new Map();
        localCourses.forEach(c => map.set(c.gradeNumber, c));
        apiCourses.forEach(c => {
          if (c && c.gradeNumber) {
            const existing = map.get(c.gradeNumber);
            if (existing) {
              map.set(c.gradeNumber, { ...existing, ...c, chapters: (c.chapters && c.chapters.length > 0) ? c.chapters : existing.chapters });
            } else {
              map.set(c.gradeNumber, c);
            }
          }
        });
        return Array.from(map.values());
      }
      return localCourses;
    } catch (err) {
      return localCourses;
    }
  },

  // Admins Module (Super Admin Only)
  getAdmins: async () => {
    try {
      const res = await apiClient.get('/admin/users');
      return res.data;
    } catch (err) {
      return getStoredAdmins();
    }
  },

  createAdmin: async (adminData) => {
    try {
      const res = await apiClient.post('/admin/users', adminData);
      return res.data;
    } catch (err) {
      const admins = getStoredAdmins();
      const newAdmin = {
        id: Date.now(),
        fullName: adminData.fullName,
        email: adminData.email,
        role: adminData.role || 'admin',
        status: 'ACTIVE',
        lastLogin: 'Never'
      };
      admins.push(newAdmin);
      saveStoredAdmins(admins);
      return newAdmin;
    }
  }
};
