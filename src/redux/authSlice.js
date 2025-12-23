import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL - BACKEND ÇALIŞTIĞINA GÖRE BU DOĞRU
const API_URL = 'http://localhost:5000/api';

// Async Thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('🔵 Sending register request to:', `${API_URL}/auth/register`);
      console.log('📦 Data:', userData);
      
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });
      
      console.log('🟢 Register response:', response.data);
      
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
      
    } catch (error) {
      console.error('🔴 Register error:');
      console.error('Error message:', error.message);
      
      if (error.response) {
        // Server responded with error
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        
        const errorMessage = error.response.data?.message 
          || error.response.data?.error 
          || `Server error: ${error.response.status}`;
        
        return rejectWithValue(errorMessage);
      } else if (error.request) {
        // Request made but no response
        console.error('No response received');
        return rejectWithValue('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        // Something else
        console.error('Error setting up request:', error.message);
        return rejectWithValue('Bir hata oluştu: ' + error.message);
      }
    }
  }
);

// Login async thunk
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('🔵 Sending login request...');
      
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('🔴 Login error:', error.response?.data);
      
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || 'Giriş başarısız';
      
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;