import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, fetchFeed } from '../store/slices/postSlice';
import './PostForm.css';

function PostForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await dispatch(createPost({ content, image: '' }));
      setContent('');
      dispatch(fetchFeed());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>What's happening!?</h3>
      <textarea
        className="form-textarea"
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={500}
      />
      <span className="char-count">{content.length}/500</span>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading || !content.trim()}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}

export default PostForm;