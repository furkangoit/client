import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, followUser } from '../store/slices/userSlice';
import './Profile.css';

function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { selectedUser, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [userId, dispatch]);

  const isFollowing = selectedUser?.followers.includes(currentUser?._id);

  const handleFollow = () => {
    dispatch(followUser(userId));
  };

  if (loading) {
    return <div style={{ marginLeft: '280px', paddingTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar">{selectedUser?.username.charAt(0).toUpperCase()}</div>
          <h1>{selectedUser?.username}</h1>
          <p className="profile-bio">{selectedUser?.bio || 'No bio'}</p>
          <div className="profile-stats">
            <div><strong>{selectedUser?.followers.length || 0}</strong> Followers</div>
            <div><strong>{selectedUser?.following.length || 0}</strong> Following</div>
          </div>
          {currentUser?._id !== userId && (
            <button className="btn btn-primary" onClick={handleFollow}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;