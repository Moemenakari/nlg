import React from 'react';

/**
 * Analytics Dashboard Component
 * Displays overview statistics cards
 */
const AnalyticsDashboard = ({ analytics }) => {
  const cards = [
    {
      icon: '🎮',
      color: '#4CAF50',
      value: analytics.totalGames,
      label: 'Total Games',
    },
    {
      icon: '📋',
      color: '#2196F3',
      value: analytics.totalBookings,
      label: 'Total Bookings',
    },
    {
      icon: '⏳',
      color: '#FF9800',
      value: analytics.pendingBookings,
      label: 'Pending',
    },
    {
      icon: '✅',
      color: '#4CAF50',
      value: analytics.confirmedBookings,
      label: 'Confirmed',
    },
    {
      icon: '💰',
      color: '#E53935',
      value: `$${analytics.totalRevenue.toFixed(2)}`,
      label: 'Confirmed Revenue',
      className: 'revenue',
    },
    {
      icon: '📩',
      color: '#9C27B0',
      value: analytics.unreadMessages,
      label: 'Unread Messages',
    },
  ];

  return (
    <div className="tab-content">
      <h2>📊 Dashboard Overview</h2>
      <div className="analytics-grid">
        {cards.map((card, index) => (
          <div key={index} className={`analytics-card ${card.className || ''}`}>
            <div 
              className="analytics-icon" 
              style={{ backgroundColor: card.color }}
            >
              {card.icon}
            </div>
            <div className="analytics-info">
              <h3>{card.value}</h3>
              <p>{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <h3>📌 Quick Stats</h3>
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Conversion Rate</span>
            <span className="stat-value">
              {analytics.totalBookings > 0 
                ? ((analytics.confirmedBookings / analytics.totalBookings) * 100).toFixed(1) 
                : 0}%
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Order Value</span>
            <span className="stat-value">
              ${analytics.confirmedBookings > 0 
                ? (analytics.totalRevenue / analytics.confirmedBookings).toFixed(2) 
                : '0.00'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Response Rate</span>
            <span className="stat-value">
              {/* Placeholder - you can calculate actual response rate */}
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
