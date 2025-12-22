import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed } from '../store/slices/postSlice';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import './Feed.css';

function Feed() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  return (
    <div className="feed-wrapper">
      <div className="feed-container">
        <div className="feed-header">
          <h2>Home</h2>
        </div>
        <PostForm />
        <div className="feed-posts">
          {loading && <p>Loading posts...</p>}
          {posts.length === 0 && !loading && <p>No posts yet. Be the first!</p>}
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;