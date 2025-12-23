import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  // Otomatik benzersiz email üret
  const generateUniqueEmail = () => {
    return `user${Date.now()}${Math.floor(Math.random() * 1000)}@test.com`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasyon
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır!');
      return;
    }

    // Email boşsa otomatik oluştur, doluysa kullan
    const userEmail = formData.email.trim() === '' ? generateUniqueEmail() : formData.email;
    
    const userData = {
      name: formData.name || 'Test User',
      email: userEmail,
      password: formData.password,
    };

    console.log('📤 Gönderilen veri:', userData);
    console.log('🎯 API URL:', 'http://localhost:5000/api/auth/register');
    console.log('📧 Kullanılan email:', userEmail);
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('✅ Başarılı yanıt:', response.data);
      setSuccess(true);
      setLoading(false);
      
      alert(`🎉 Kayıt başarılı!\nEmail: ${userEmail}\nŞifre: ${formData.password}`);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err) {
      console.error('❌ Hata detayı:', err);
      setLoading(false);
      
      if (err.response) {
        console.log('📊 Hata durumu:', err.response.status);
        console.log('📊 Hata verisi:', err.response.data);
        
        setError(
          err.response.data?.message || 
          err.response.data?.error || 
          `Sunucu hatası (${err.response.status})`
        );
      } else if (err.request) {
        console.log('🌐 Ağ hatası:', err.request);
        setError('Sunucuya bağlanılamadı. Backend çalışıyor mu?');
      } else {
        console.log('🔥 Beklenmeyen hata:', err.message);
        setError('Beklenmeyen bir hata oluştu: ' + err.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Kayıt Ol</h2>
        
        <div style={styles.infoBox}>
          <p>💡 <strong>İpucu:</strong> Email boş bırakılırsa otomatik benzersiz email oluşturulur.</p>
          <p>Örnek: <code>user1703236000000@test.com</code></p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <p style={styles.errorText}>❌ {error}</p>
            <button 
              onClick={() => setError(null)}
              style={styles.closeButton}
            >
              ✕
            </button>
          </div>
        )}

        {success && (
          <div style={styles.successBox}>
            <p style={styles.successText}>✅ Kayıt başarılı! Ana sayfaya yönlendiriliyorsunuz...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Ad Soyad (opsiyonel)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Adınız ve soyadınız"
              disabled={loading || success}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              E-posta (opsiyonel - boş bırakılırsa otomatik oluşturulur)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="ornek@email.com veya BOŞ BIRAKIN"
              disabled={loading || success}
              // REQUIRED ÖZELLİĞİNİ KALDIRDIK!
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Şifre *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="En az 6 karakter"
              minLength="6"
              disabled={loading || success}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Şifre Tekrar *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Şifreyi tekrar girin"
              minLength="6"
              disabled={loading || success}
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            style={{
              ...styles.submitButton,
              ...((loading || success) && styles.disabledButton),
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}></span>
                Kayıt yapılıyor...
              </>
            ) : success ? (
              '✅ Kayıt Başarılı!'
            ) : (
              'Kayıt Ol'
            )}
          </button>

          <p style={styles.loginLink}>
            Zaten hesabınız var mı?{' '}
            <a href="/login" style={styles.link}>
              Giriş yapın
            </a>
          </p>
        </form>

        <div style={styles.debugInfo}>
          <h4>🔍 Debug Bilgisi:</h4>
          <p><strong>Backend URL:</strong> <code>http://localhost:5000</code></p>
          <p><strong>Endpoint:</strong> <code>/api/auth/register</code></p>
          <p><strong>Otomatik Email:</strong> {formData.email || generateUniqueEmail()}</p>
          <p><strong>Durum:</strong> {loading ? 'Yükleniyor...' : success ? 'Başarılı' : 'Hazır'}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#0f1419',
    padding: '20px',
  },
  formContainer: {
    backgroundColor: '#192734',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid #38444d',
  },
  title: {
    color: '#e7e9ea',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: '#22303c',
    border: '1px solid #38444d',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#8b98a5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#e7e9ea',
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#22303c',
    border: '1px solid #38444d',
    borderRadius: '8px',
    color: '#e7e9ea',
    fontSize: '16px',
    transition: 'border-color 0.2s',
  },
  submitButton: {
    backgroundColor: '#1da1f2',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '24px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '20px',
  },
  disabledButton: {
    backgroundColor: '#1a8cd8',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid #ffffff',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#8b98a5',
    fontSize: '14px',
  },
  link: {
    color: '#1da1f2',
    textDecoration: 'none',
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    border: '1px solid #dc3545',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#dc3545',
    margin: '0',
    fontSize: '14px',
  },
  successBox: {
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
    border: '1px solid #28a745',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
  },
  successText: {
    color: '#28a745',
    margin: '0',
    fontSize: '14px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#dc3545',
    fontSize: '18px',
    cursor: 'pointer',
  },
  debugInfo: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#22303c',
    borderRadius: '8px',
    border: '1px solid #38444d',
    fontSize: '12px',
    color: '#8b98a5',
  },
};

// CSS animation ekle
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default Register;