import React from 'react';
import { Menu, Close, Logout } from '@mui/icons-material';

/**
 * Sidebar Navigation Component
 * Handles tab navigation and mobile menu
 */
const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onLogout,
  unreadMessages 
}) => {
  const tabs = [
    { id: 'analytics', label: '📊 Analytics', icon: '📊' },
    { id: 'games', label: '🎮 Games', icon: '🎮' },
    { id: 'bookings', label: '📋 Bookings', icon: '📋' },
    { id: 'contacts', label: '📩 Messages', icon: '📩', badge: unreadMessages },
    { id: 'testimonials', label: '⭐ Testimonials', icon: '⭐' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="dashboard-nav">
      <h1 className="nav-title">🎮 Admin Dashboard</h1>

      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <Close /> : <Menu />}
      </button>

      <div className={`nav-tabs ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            {tab.badge > 0 && <span className="badge">{tab.badge}</span>}
          </button>
        ))}

        <button className="logout-btn" onClick={onLogout}>
          <Logout /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
