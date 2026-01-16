import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

// Custom Hooks
import useAuth from '../hooks/useAuth';
import useApi from '../hooks/useApi';

// Components
import {
  LoginPage,
  Sidebar,
  SuccessMessage,
  ErrorMessage,
  LoadingSpinner,
  AnalyticsDashboard,
  GamesList,
  BookingsList,
  ContactsList,
  TestimonialsList,
} from '../components';

/**
 * Admin Dashboard Page
 * Main admin panel that orchestrates all sub-components
 * 
 * This component has been refactored from a 956-line monolith into:
 * - Reusable components (games, bookings, contacts, testimonials)
 * - Custom hooks for auth and API management
 * - Centralized API service
 * 
 * Architecture:
 * ├── hooks/
 * │   ├── useAuth.js - Authentication logic
 * │   └── useApi.js - API calls and state management
 * ├── services/
 * │   └── api.js - Centralized API endpoints
 * └── components/
 *     ├── auth/LoginPage.jsx
 *     ├── common/Sidebar.jsx, UIComponents.jsx
 *     ├── analytics/AnalyticsDashboard.jsx
 *     ├── games/GamesList.jsx, GameCard.jsx, GameForm.jsx
 *     ├── bookings/BookingsList.jsx, BookingDetails.jsx
 *     ├── contacts/ContactsList.jsx
 *     └── testimonials/TestimonialsList.jsx, TestimonialForm.jsx
 */
const AdminPage = () => {
  // ==================== HOOKS ====================
  const {
    isAuthenticated,
    token,
    loading: authLoading,
    error: authError,
    login,
    logout,
  } = useAuth();

  const {
    games,
    bookings,
    contacts,
    testimonials,
    loading: dataLoading,
    error,
    successMessage,
    loadAllData,
    createGame,
    updateGame,
    deleteGame,
    updateBookingStatus,
    updateContactStatus,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    getAnalytics,
  } = useApi(token, logout); // Pass logout to handle auth errors

  // ==================== LOCAL STATE ====================
  const [activeTab, setActiveTab] = useState('analytics');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ==================== EFFECTS ====================
  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      loadAllData();
    }
  }, [isAuthenticated, token, loadAllData]);

  // ==================== HANDLERS ====================
  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    return result;
  };

  const handleLogout = () => {
    logout();
    setActiveTab('analytics');
  };

  // ==================== RENDER ====================
  
  // Loading state
  if (authLoading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // Login page (not authenticated)
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={handleLogin}
        loading={authLoading}
        error={authError}
      />
    );
  }

  // Get analytics data
  const analytics = getAnalytics();

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard analytics={analytics} />;
      
      case 'games':
        return (
          <GamesList
            games={games}
            onCreateGame={createGame}
            onUpdateGame={updateGame}
            onDeleteGame={deleteGame}
          />
        );
      
      case 'bookings':
        return (
          <BookingsList
            bookings={bookings}
            onStatusChange={updateBookingStatus}
          />
        );
      
      case 'contacts':
        return (
          <ContactsList
            contacts={contacts}
            onStatusChange={updateContactStatus}
          />
        );
      
      case 'testimonials':
        return (
          <TestimonialsList
            testimonials={testimonials}
            onCreateTestimonial={createTestimonial}
            onUpdateTestimonial={updateTestimonial}
            onDeleteTestimonial={deleteTestimonial}
          />
        );
      
      default:
        return <AnalyticsDashboard analytics={analytics} />;
    }
  };

  // Main dashboard view
  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          onLogout={handleLogout}
          unreadMessages={analytics.unreadMessages}
        />

        {/* Alert Messages */}
        <ErrorMessage message={error} />
        <SuccessMessage message={successMessage} />

        {/* Loading Overlay */}
        {dataLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        )}

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPage;
