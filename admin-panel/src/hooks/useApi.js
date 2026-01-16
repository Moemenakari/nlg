import { useState, useCallback } from 'react';
import { gamesAPI, bookingsAPI, contactsAPI, testimonialsAPI } from '../services/api';

/**
 * Custom hook for API data management
 * Handles loading states, errors, and CRUD operations
 */
const useApi = (token, onAuthError = null) => {
  const [games, setGames] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Show success message temporarily
  const showSuccess = useCallback((message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  }, []);

  // Show error message temporarily
  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  }, []);

  // Handle auth errors (401/403)
  const handleApiError = useCallback((err) => {
    if (err.message.includes('401') || err.message.includes('403') || 
        err.message.includes('Admin access required') || 
        err.message.includes('Token') ||
        err.message.includes('Authentication')) {
      // Auth error - trigger logout
      if (onAuthError) {
        onAuthError();
      }
      showError('Session expired. Please login again.');
      return true;
    }
    return false;
  }, [onAuthError, showError]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setError('');
    setSuccessMessage('');
  }, []);

  // ==================== LOAD ALL DATA ====================
  const loadAllData = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const [gamesData, bookingsData, contactsData, testimonialsData] = await Promise.all([
        gamesAPI.getAll(),
        bookingsAPI.getAll(token),
        contactsAPI.getAll(token),
        testimonialsAPI.getAll(),
      ]);

      setGames(gamesData);
      setBookings(bookingsData);
      setContacts(contactsData);
      setTestimonials(testimonialsData);
    } catch (err) {
      if (!handleApiError(err)) {
        showError(`Failed to load data: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [token, showError, handleApiError]);

  // ==================== GAMES OPERATIONS ====================
  const createGame = useCallback(async (formData) => {
    try {
      const result = await gamesAPI.create(formData, token);
      await loadAllData();
      showSuccess(result.message || '✅ Game added successfully!');
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  const updateGame = useCallback(async (id, formData) => {
    try {
      const result = await gamesAPI.update(id, formData, token);
      await loadAllData();
      showSuccess(result.message || '✅ Game updated successfully!');
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  const deleteGame = useCallback(async (id) => {
    try {
      await gamesAPI.delete(id, token);
      await loadAllData();
      showSuccess('✅ Game deleted successfully!');
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  // ==================== BOOKINGS OPERATIONS ====================
  const updateBookingStatus = useCallback(async (id, status) => {
    try {
      await bookingsAPI.updateStatus(id, status, token);
      await loadAllData();
      showSuccess(`✅ Booking status updated to ${status}!`);
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  // ==================== CONTACTS OPERATIONS ====================
  const updateContactStatus = useCallback(async (id, status) => {
    try {
      await contactsAPI.updateStatus(id, status, token);
      await loadAllData();
      showSuccess(`✅ Message marked as ${status}!`);
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  // ==================== TESTIMONIALS OPERATIONS ====================
  const createTestimonial = useCallback(async (data) => {
    try {
      await testimonialsAPI.create(data, token);
      await loadAllData();
      showSuccess('✅ Testimonial created successfully!');
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  const updateTestimonial = useCallback(async (id, data) => {
    try {
      await testimonialsAPI.update(id, data, token);
      await loadAllData();
      showSuccess('✅ Testimonial updated successfully!');
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  const deleteTestimonial = useCallback(async (id) => {
    try {
      await testimonialsAPI.delete(id, token);
      await loadAllData();
      showSuccess('✅ Testimonial deleted successfully!');
      return { success: true };
    } catch (err) {
      showError(`❌ ${err.message}`);
      return { success: false, error: err.message };
    }
  }, [token, loadAllData, showSuccess, showError]);

  // ==================== ANALYTICS ====================
  const getAnalytics = useCallback(() => {
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (parseFloat(b.totalPrice) || 0), 0);
    const totalGames = games.length;
    const unreadMessages = contacts.filter(c => c.status === 'new').length;
    const totalTestimonials = testimonials.length;

    return {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue,
      totalGames,
      unreadMessages,
      totalTestimonials,
    };
  }, [bookings, games, contacts, testimonials]);

  return {
    // Data
    games,
    bookings,
    contacts,
    testimonials,
    
    // State
    loading,
    error,
    successMessage,
    
    // Actions
    loadAllData,
    clearMessages,
    
    // Games
    createGame,
    updateGame,
    deleteGame,
    
    // Bookings
    updateBookingStatus,
    
    // Contacts
    updateContactStatus,
    
    // Testimonials
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    
    // Analytics
    getAnalytics,
  };
};

export default useApi;
