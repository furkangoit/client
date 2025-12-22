import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (token, { rejectWithValue }) => {
    try {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { data } = await API.get('/auth/me');
      return data;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue('Session expired');
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      API.defaults.headers.common['Authorization'] = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export { API };