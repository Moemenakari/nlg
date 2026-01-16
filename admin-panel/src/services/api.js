// Centralized API Service for Admin Panel
// All API calls are managed here for consistency and maintainability

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

// Helper function to handle response
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }
  return data;
};

// ==================== AUTH API ====================
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  verifyToken: async (token) => {
    const response = await fetch(`${API_URL}/api/auth/verify`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
};

// ==================== GAMES API ====================
export const gamesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/games`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/api/games/${id}`);
    return handleResponse(response);
  },

  create: async (formData, token) => {
    const response = await fetch(`${API_URL}/api/games`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: formData, // FormData for file upload
    });
    return handleResponse(response);
  },

  update: async (id, formData, token) => {
    const response = await fetch(`${API_URL}/api/games/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: formData, // FormData for file upload
    });
    return handleResponse(response);
  },

  delete: async (id, token) => {
    const response = await fetch(`${API_URL}/api/games/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
};

// ==================== BOOKINGS API ====================
export const bookingsAPI = {
  getAll: async (token) => {
    const response = await fetch(`${API_URL}/api/bookings`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  getById: async (id, token) => {
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  updateStatus: async (id, status, token) => {
    const response = await fetch(`${API_URL}/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(token),
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  delete: async (id, token) => {
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
};

// ==================== CONTACTS API ====================
export const contactsAPI = {
  getAll: async (token) => {
    const response = await fetch(`${API_URL}/api/contact`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  updateStatus: async (id, status, token) => {
    const response = await fetch(`${API_URL}/api/contact/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(token),
      },
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  delete: async (id, token) => {
    const response = await fetch(`${API_URL}/api/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
};

// ==================== TESTIMONIALS API ====================
export const testimonialsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/api/testimonials`);
    return handleResponse(response);
  },

  create: async (data, token) => {
    const response = await fetch(`${API_URL}/api/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(token),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  update: async (id, data, token) => {
    const response = await fetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(token),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id, token) => {
    const response = await fetch(`${API_URL}/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
};

// Export API URL for use in components (e.g., for image URLs)
export { API_URL };

// Default export with all APIs
const api = {
  auth: authAPI,
  games: gamesAPI,
  bookings: bookingsAPI,
  contacts: contactsAPI,
  testimonials: testimonialsAPI,
  API_URL,
};

export default api;
