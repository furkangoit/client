import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from './authSlice';

export const fetchFeed = createAsyncThunk('posts/fetchFeed', async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get('/posts/feed');
    return data.posts || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error');
  }
});

export const createPost = createAsyncThunk('posts/createPost', async ({ content, image }, { rejectWithValue }) => {
  try {
    const { data } = await API.post('/posts', { content, image });
    return data.post;
  } catch (error) {
    console.error('Create post error:', error);
    return rejectWithValue(error.response?.data?.message || 'Error');
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (postId, { rejectWithValue }) => {
  try {
    const { data } = await API.post(`/posts/${postId}/like`);
    return data.post;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error');
  }
});

export const unlikePost = createAsyncThunk('posts/unlikePost', async (postId, { rejectWithValue }) => {
  try {
    const { data } = await API.post(`/posts/${postId}/unlike`);
    return data.post;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error');
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
  try {
    await API.delete(`/posts/${postId}`);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Error');
  }
});

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload || [];
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p._id === action.payload._id);
        if (post) post.likes = action.payload.likes;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p._id === action.payload._id);
        if (post) post.likes = action.payload.likes;
      });
  },
});

export default postSlice.reducer;