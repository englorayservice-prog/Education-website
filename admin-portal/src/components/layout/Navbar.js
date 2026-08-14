import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { apiService } from '../../services/api';

export const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchRealNotifications();
    const interval = setInterval(fetchRealNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRealNotifications = async () => {
    try {
      const [submissions, stats] = await Promise.all([
        apiService.getSubmissions().catch(() => []),
        apiService.getDashboardStats().catch(() => ({}))
      ]);

      const realList = [];

      // Submissions notifications from DB
      if (Array.isArray(submissions) && submissions.length > 0) {
        submissions.forEach((sub) => {
          if (sub.status === 'SUBMITTED') {
            realList.push({
              id: `sub-${sub.id}`,
              text: `New submission from ${sub.studentName} (Class ${sub.gradeNumber})`,
              time: sub.submittedAt ? new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
              type: 'info'
            });
          } else if (sub.status === 'GRADED' || sub.status === 'REVIEWED') {
            realList.push({
              id: `sub-${sub.id}`,
              text: `Submission #${sub.id} approved for ${sub.studentName}`,
              time: sub.submittedAt ? new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
              type: 'success'
            });
          } else if (sub.status === 'REJECTED') {
            realList.push({
              id: `sub-${sub.id}`,
              text: `Submission #${sub.id} rejected for ${sub.studentName}`,
              time: sub.submittedAt ? new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
              type: 'warning'
            });
          }
        });
      }

      // Add DB status system alerts
      if (stats.totalStudents !== undefined) {
        realList.push({
          id: 'sys-students',
          text: `Current DB: ${stats.totalStudents} Registered Student(s), ${stats.chaptersUnlocked || 1} Unlocked Chapter(s)`,
          time: 'Active',
          type: 'success'
        });
      }

      realList.push({
        id: 'sys-conn',
        text: `Live Backend: ${API_BASE_URL}`,
        time: 'Connected',
        type: 'info'
      });

      setNotifications(realList);
      setUnreadCount(realList.length);
    } catch (err) {
      console.error('Error fetching real notifications:', err);
    }
  };

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="top-navbar" style={{ justifyContent: 'flex-end' }}>
      <div className="navbar-right">
        {/* Theme Switcher Button */}
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Light/Dark Theme">
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

        {/* Real Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) fetchRealNotifications();
            }}
            title="Real-Time Alerts"
          >
            <i className="fa-solid fa-bell"></i>
            {unreadCount > 0 && <span className="notification-badge"></span>}
          </button>

          {showNotifications && (
            <div
              className="panel-card"
              style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                width: '340px',
                padding: '16px',
                zIndex: 60,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', fontWeight: '700' }}>
                <span>Real-Time DB Notifications</span>
                {unreadCount > 0 && (
                  <span
                    onClick={handleMarkAllRead}
                    style={{ fontSize: '11px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Mark all read
                  </span>
                )}
              </div>

              {notifications.length === 0 ? (
                <div style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                  No new notifications in database.
                </div>
              ) : (
                <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {notifications.map((n) => (
                    <div key={n.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', fontSize: '12px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <i
                          className={`fa-solid ${
                            n.type === 'success'
                              ? 'fa-circle-check'
                              : n.type === 'warning'
                              ? 'fa-triangle-exclamation'
                              : 'fa-circle-info'
                          }`}
                          style={{ color: n.type === 'success' ? 'var(--success)' : n.type === 'warning' ? 'var(--warning)' : 'var(--primary)' }}
                        ></i>
                        {n.text}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '4px', marginLeft: '18px' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div className="user-profile-badge">
          <div className="avatar">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.fullName || 'Admin User'}</span>
            <span className={`user-role-badge ${user?.role || 'admin'}`}>
              {user?.role === 'super_admin' ? 'SUPER ADMIN' : 'ADMIN'}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="btn btn-outline btn-sm"
          onClick={logoutUser}
          title="Sign out of Admin Portal"
          style={{ marginLeft: '8px' }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
