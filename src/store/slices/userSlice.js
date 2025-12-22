import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './authSlice';

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/users/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error');
    }
  }
);

export const followUser = createAsyncThunk(
  'users/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      await API.post(`/users/${userId}/follow`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error');
    }
  }
);

const initialState = {
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        if (state.selectedUser) {
          state.selectedUser.followers.push(action.payload);
        }
      });
  },
});

export default userSlice.reducer;