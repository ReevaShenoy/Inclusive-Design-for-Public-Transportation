// js/api-service.js

// Base API configuration
const API_BASE_URL = 'http://localhost:8080/api';
const TOKEN_KEY = 'access_token';

// Helper functions for API requests
const getAuthHeader = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || 'An error occurred';
    
    // Handle authentication errors
    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login.html';
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
};

// API service object
const apiService = {
  // Authentication methods
  auth: {
    login: async (email, password) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await handleResponse(response);
      
      if (data.accessToken) {
        localStorage.setItem(TOKEN_KEY, data.accessToken);
      }
      
      return data;
    },
    
    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      return handleResponse(response);
    },
    
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/index.html';
    },
    
    isAuthenticated: () => {
      return !!localStorage.getItem(TOKEN_KEY);
    }
  },
  
  // Medicine reminder methods
  reminders: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/reminders`, {
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    create: async (reminder) => {
      const response = await fetch(`${API_BASE_URL}/reminders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(reminder)
      });
      
      return handleResponse(response);
    },
    
    update: async (id, reminder) => {
      const response = await fetch(`${API_BASE_URL}/reminders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(reminder)
      });
      
      return handleResponse(response);
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/reminders/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    deleteAll: async () => {
      const response = await fetch(`${API_BASE_URL}/reminders`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    }
  },
  
  // Route planning methods
  routes: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/routes`, {
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    getFavorites: async () => {
      const response = await fetch(`${API_BASE_URL}/routes/favorites`, {
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/routes/${id}`, {
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    save: async (routeData) => {
      const response = await fetch(`${API_BASE_URL}/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(routeData)
      });
      
      return handleResponse(response);
    },
    
    update: async (id, routeData) => {
      const response = await fetch(`${API_BASE_URL}/routes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(routeData)
      });
      
      return handleResponse(response);
    },
    
    toggleFavorite: async (id) => {
      const response = await fetch(`${API_BASE_URL}/routes/${id}/favorite`, {
        method: 'PUT',
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_BASE_URL}/routes/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    }
  },
  
  // SOS methods
  sos: {
    getContacts: async () => {
      const response = await fetch(`${API_BASE_URL}/sos/contacts`, {
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    addContact: async (contactData) => {
      const response = await fetch(`${API_BASE_URL}/sos/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(contactData)
      });
      
      return handleResponse(response);
    },
    
    updateContact: async (id, contactData) => {
      const response = await fetch(`${API_BASE_URL}/sos/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(contactData)
      });
      
      return handleResponse(response);
    },
    
    deleteContact: async (id) => {
      const response = await fetch(`${API_BASE_URL}/sos/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    trigger: async (location) => {
      const response = await fetch(`${API_BASE_URL}/sos/trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ location })
      });
      
      return handleResponse(response);
    }
  },
  
  // Accessibility settings methods
  settings: {
    get: async () => {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    update: async (settings) => {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(settings)
      });
      
      return handleResponse(response);
    }
  },
  
  // User profile methods
  user: {
    getProfile: async () => {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          ...getAuthHeader()
        }
      });
      
      return handleResponse(response);
    },
    
    updateProfile: async (profileData) => {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify(profileData)
      });
      
      return handleResponse(response);
    }
  }
};

// Export the API service
window.apiService = apiService;