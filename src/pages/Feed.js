import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed, createPost } from '../store/slices/postSlice';
import './Feed.css';

function Feed() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const [content, setContent] = React.useState('');

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await dispatch(createPost({ content, image: '' }));
    setContent('');
    dispatch(fetchFeed());
  };

  return (
    <div style={{ marginLeft: '280px', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Home Feed</h2>
      
      <form onSubmit={handlePost} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          style={{ width: '100%', height: '100px', padding: '10px', fontSize: '14px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#1da1f2', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
          Post
        </button>
      </form>

      <div>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => (
          <div key={post._id} style={{ padding: '15px', border: '1px solid #ddd', marginBottom: '15px', borderRadius: '8px' }}>
            <strong>{post.author?.name}</strong>
            <p>{post.content}</p>
            <button onClick={() => dispatch(likePost(post._id))} style={{ marginRight: '10px' }}>
              ❤️ {post.likes?.length || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;