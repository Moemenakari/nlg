import { useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

/**
 * Custom hook for authentication management
 * Handles login, logout, and token persistence
 * Validates stored tokens on app load
 */
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper function to validate stored user data
  const isValidUserData = (userData) => {
    return userData && 
           userData.id && 
           userData.username && 
           userData.role === 'admin'; // Must have admin role
  };

  // Helper function to clear auth data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  // Check for saved authentication on mount
  useEffect(() => {
    const validateAndLoadAuth = async () => {
      const savedToken = localStorage.getItem('adminToken');
      const savedUser = localStorage.getItem('adminUser');

      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          
          // Validate that user has admin role
          if (!isValidUserData(parsedUser)) {
            console.log('⚠️ Invalid or outdated auth data - clearing');
            clearAuthData();
            setLoading(false);
            return;
          }

          // Optionally verify token with backend (uncomment if you have /api/auth/verify endpoint)
          // try {
          //   await authAPI.verifyToken(savedToken);
          // } catch (err) {
          //   console.log('⚠️ Token verification failed - clearing');
          //   clearAuthData();
          //   setLoading(false);
          //   return;
          // }

          setToken(savedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (err) {
          // Clear invalid data
          console.log('⚠️ Error parsing auth data - clearing');
          clearAuthData();
        }
      }
      setLoading(false);
    };

    validateAndLoadAuth();
  }, [clearAuthData]);

  // Login function
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError('');

    try {
      const data = await authAPI.login(credentials);

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));

      setUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    isAuthenticated,
    user,
    token,
    loading,
    error,
    login,
    logout,
    clearError,
  };
};

export default useAuth;
