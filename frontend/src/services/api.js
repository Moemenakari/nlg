// API Service - مركزي لكل استدعاءات الـ API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ==================== GAMES ====================
export const gamesAPI = {
  // الحصول على جميع الألعاب
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/games`);
      if (!response.ok) throw new Error('Failed to fetch games');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching games:', error);
      throw error;
    }
  },

  // الحصول على لعبة واحدة
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${id}`);
      if (!response.ok) throw new Error('Failed to fetch game');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching game:', error);
      throw error;
    }
  },

  // إنشاء لعبة جديدة (Admin فقط)
  create: async (gameData, token) => {
    try {
      const formData = new FormData();
      formData.append('name', gameData.name);
      formData.append('description', gameData.description);
      formData.append('price', gameData.price);
      if (gameData.capacity) formData.append('capacity', gameData.capacity);
      if (gameData.spaceRequired) formData.append('spaceRequired', gameData.spaceRequired);
      if (gameData.powerRequired) formData.append('powerRequired', gameData.powerRequired);
      if (gameData.usesCoins !== undefined) formData.append('usesCoins', gameData.usesCoins);
      if (gameData.image) {
        formData.append('image', gameData.image);
      }

      const response = await fetch(`${API_BASE_URL}/games`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to create game');
      return await response.json();
    } catch (error) {
      console.error('❌ Error creating game:', error);
      throw error;
    }
  },

  // تحديث لعبة (Admin فقط)
  update: async (id, gameData, token) => {
    try {
      const formData = new FormData();
      if (gameData.name) formData.append('name', gameData.name);
      if (gameData.description) formData.append('description', gameData.description);
      if (gameData.price) formData.append('price', gameData.price);
      if (gameData.capacity) formData.append('capacity', gameData.capacity);
      if (gameData.spaceRequired) formData.append('spaceRequired', gameData.spaceRequired);
      if (gameData.powerRequired) formData.append('powerRequired', gameData.powerRequired);
      if (gameData.usesCoins !== undefined) formData.append('usesCoins', gameData.usesCoins);
      if (gameData.image) {
        formData.append('image', gameData.image);
      }

      const response = await fetch(`${API_BASE_URL}/games/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update game');
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating game:', error);
      throw error;
    }
  },

  // حذف لعبة (Admin فقط)
  delete: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete game');
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting game:', error);
      throw error;
    }
  }
};

// ==================== BOOKINGS ====================
export const bookingsAPI = {
  // إنشاء حجز جديد
  create: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create booking');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Error creating booking:', error);
      throw error;
    }
  },

  // الحصول على جميع الحجزات (Admin فقط)
  getAll: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch bookings');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching bookings:', error);
      throw error;
    }
  },

  // الحصول على حجز واحد (Admin فقط)
  getById: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch booking');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching booking:', error);
      throw error;
    }
  },

  // تحديث حالة الحجز (Admin فقط)
  updateStatus: async (id, status, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Failed to update booking status');
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating booking status:', error);
      throw error;
    }
  }
};

// ==================== CONTACT ====================
export const contactAPI = {
  // إرسال رسالة اتصال
  sendMessage: async (contactData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Error sending contact message:', error);
      throw error;
    }
  },

  // الحصول على جميع الرسائل (Admin فقط)
  getAll: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch contact messages');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching contact messages:', error);
      throw error;
    }
  }
};

// ==================== TESTIMONIALS ====================
export const testimonialsAPI = {
  // الحصول على جميع الشهادات
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching testimonials:', error);
      throw error;
    }
  },

  // إنشاء شهادة جديدة
  create: async (testimonialData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testimonialData)
      });

      if (!response.ok) throw new Error('Failed to create testimonial');
      return await response.json();
    } catch (error) {
      console.error('❌ Error creating testimonial:', error);
      throw error;
    }
  },

  // تحديث شهادة (Admin فقط)
  update: async (id, testimonialData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testimonialData)
      });

      if (!response.ok) throw new Error('Failed to update testimonial');
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating testimonial:', error);
      throw error;
    }
  },

  // حذف شهادة (Admin فقط)
  delete: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete testimonial');
      return await response.json();
    } catch (error) {
      console.error('❌ Error deleting testimonial:', error);
      throw error;
    }
  }
};

// ==================== AUTH ====================
export const authAPI = {
  // Login with username (not email)
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to login');
      }
      const data = await response.json();
      // Save token in localStorage
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
      }
      return data;
    } catch (error) {
      console.error('❌ Error during login:', error);
      throw error;
    }
  },

  // تسجيل خروج
  logout: () => {
    localStorage.removeItem('adminToken');
  },

  // الحصول على التوكن المحفوظ
  getToken: () => {
    return localStorage.getItem('adminToken');
  },

  // التحقق من صحة التوكن
  verifyToken: (token) => {
    return token && token.length > 0;
  }
};

// ==================== UTILITY ====================
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;

  // Remove leading /uploads if it exists to prevent duplication
  const cleanPath = imagePath.startsWith('/uploads')
    ? imagePath.substring('/uploads'.length)
    : imagePath;

  return `${API_BASE_URL.replace('/api', '')}/uploads${cleanPath}`;
};
