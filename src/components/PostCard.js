import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../store/slices/postSlice';
import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(
    post.likes.some((like) => like === currentUser?._id)
  );

  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikePost(post._id));
    } else {
      dispatch(likePost(post._id));
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">{post.author.username.charAt(0).toUpperCase()}</div>
        <div>
          <Link to={`/profile/${post.author._id}`} className="post-author-name">
            {post.author.username}
          </Link>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      {post.image && <img src={post.image} alt="Post" className="post-image" />}
      <div className="post-actions">
        <button className="post-action-btn" onClick={handleLike}>
          {isLiked ? '❤️' : '🤍'} {post.likes.length}
        </button>
      </div>
    </div>
  );
}

export default PostCard;