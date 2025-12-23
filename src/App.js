// client/src/App.js - GÜNCELLENMİŞ
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={navStyles}>
          <Link to="/" style={linkStyles}>Ana Sayfa</Link> | 
          <Link to="/register" style={linkStyles}>Kayıt Ol</Link> | 
          <Link to="/login" style={linkStyles}>Giriş Yap</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>MERN Stack Uygulaması</h1>
      <p>Backend ve Frontend başarıyla çalışıyor!</p>
      <p>Kayıt olmak için "Kayıt Ol", giriş yapmak için "Giriş Yap" bağlantısını kullanın.</p>
    </div>
  );
}

const navStyles = {
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #dee2e6',
  textAlign: 'center'
};

const linkStyles = {
  margin: '0 10px',
  textDecoration: 'none',
  color: '#007bff',
  fontWeight: '600'
};

export default App;