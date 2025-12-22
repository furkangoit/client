import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navigation from './components/Navigation';
import Feed from './pages/Feed';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile';
import { getCurrentUser } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser(token));
    }
  }, [dispatch]);

  if (loading) {
    return <div style={{ textAlign: 'center', paddingTop: '50px' }}>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navigation />}
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={isAuthenticated ? <Feed /> : <Navigate to="/login" />} />
          <Route path="/profile/:userId" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;