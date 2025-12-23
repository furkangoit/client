import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// TOKEN VARSA HEADER'A EKLE
const token = localStorage.getItem('token');
if (token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
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
      // TOKEN HEADER'A EKLE
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error');
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = true;
  API.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
})
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export { API };