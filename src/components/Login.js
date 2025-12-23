import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    console.log('📤 Giriş verisi:', formData);
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      console.log('✅ Giriş başarılı:', response.data);
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert('🎉 Giriş başarılı!');
      navigate('/profile'); // Profil sayfasına yönlendir
      
    } catch (err) {
      console.error('❌ Giriş hatası:', err);
      
      if (err.response) {
        setError(err.response.data?.message || 'Giriş başarısız');
      } else if (err.request) {
        setError('Sunucuya bağlanılamadı');
      } else {
        setError('Beklenmeyen bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Giriş Yap</h2>
        
        {error && (
          <div style={styles.errorBox}>
            <p style={styles.errorText}>❌ {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="ornek@email.com"
              disabled={loading}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Şifreniz"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading && styles.disabledButton),
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}></span>
                Giriş yapılıyor...
              </>
            ) : (
              'Giriş Yap'
            )}
          </button>

          <p style={styles.registerLink}>
            Hesabınız yok mu?{' '}
            <Link to="/register" style={styles.link}>
              Kayıt Olun
            </Link>
          </p>
        </form>
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
    maxWidth: '400px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    border: '1px solid #38444d',
  },
  title: {
    color: '#e7e9ea',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
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
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#22303c',
    border: '1px solid #38444d',
    borderRadius: '8px',
    color: '#e7e9ea',
    fontSize: '16px',
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
    marginTop: '10px',
  },
  disabledButton: {
    backgroundColor: '#1a8cd8',
    cursor: 'not-allowed',
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
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#8b98a5',
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
  },
  errorText: {
    color: '#dc3545',
    margin: '0',
  },
};

export default Login;