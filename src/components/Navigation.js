import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import './Navigation.css';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navigation">
      <Link to="/" className="nav-logo">
        💬 SocialHub
      </Link>
      <div className="nav-menu">
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to={`/profile/${user?._id}`} className="nav-link">👤 Profile</Link>
        <button className="nav-link btn-logout" onClick={handleLogout}>🚪 Logout</button>
      </div>
    </nav>
  );
}

export default Navigation;