import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';

// Basit Home Component
function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🏠 Sosyal Medya Uygulaması</h1>
      <p>Uygulama başarıyla çalışıyor!</p>
      <div style={{ marginTop: '30px' }}>
        <a 
          href="/profile" 
          style={{
            display: 'inline-block',
            padding: '12px 30px',
            background: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          Profil Sayfasına Git →
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;