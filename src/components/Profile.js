// client/src/components/Profile.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Lütfen giriş yapın</h2>
        <button onClick={() => navigate('/login')}>
          Giriş Yap
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h2>👤 Profilim</h2>
        <div style={styles.info}>
          <p><strong>Ad Soyad:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Kullanıcı ID:</strong> {user.id}</p>
          <p><strong>Kayıt Tarihi:</strong> {new Date().toLocaleDateString()}</p>
        </div>
        <button style={styles.logoutButton}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px',
  },
  profileCard: {
    backgroundColor: '#192734',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid #38444d',
    color: '#e7e9ea',
  },
  info: {
    margin: '30px 0',
    lineHeight: '2',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Profile;