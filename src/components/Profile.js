import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // 1. Önce localStorage'dan kullanıcıyı al
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // 2. Bu kullanıcının postlarını MongoDB'den getir
          const postsResponse = await axios.get('http://localhost:5000/api/posts');
          setPosts(postsResponse.data.posts || []);
        } else {
          // 3. Eğer kullanıcı yoksa, test kullanıcısı oluştur
          setUser({
            name: 'MongoDB Kullanıcısı',
            email: 'test@mongodb.com',
            bio: 'Bu kullanıcı MongoDB veritabanından geliyor!'
          });
        }
      } catch (error) {
        console.error('Profil verisi alınamadı:', error);
        setUser({
          name: 'Demo Kullanıcı',
          email: 'demo@example.com',
          bio: 'MongoDB bağlantısı kurulamadı, demo veri gösteriliyor.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const createTestPost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        title: 'Profil Sayfasından Post',
        content: 'Bu post profil sayfasından MongoDB\'ye eklendi!'
      });
      
      alert('Post oluşturuldu! MongoDB\'ye kaydedildi.');
      console.log('Yeni post:', response.data);
      
      // Post listesini yenile
      const postsResponse = await axios.get('http://localhost:5000/api/posts');
      setPosts(postsResponse.data.posts || []);
    } catch (error) {
      console.error('Post oluşturma hatası:', error);
      alert('Post oluşturulamadı: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>MongoDB'den veriler yükleniyor...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        borderRadius: '15px',
        color: 'white',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5em' }}>👤 MongoDB Profil</h1>
        <p style={{ opacity: 0.9, marginTop: '10px', fontSize: '1.1em' }}>
          Gerçek veritabanı bağlantılı profil sayfası
        </p>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Sol Taraf - Profil Bilgileri */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#4f46e5',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5em',
                fontWeight: 'bold',
                marginRight: '20px'
              }}>
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{user?.name}</h2>
                <p style={{ color: '#666', margin: '0 0 5px 0' }}>
                  📧 {user?.email}
                </p>
                <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>
                  🗓️ {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '25px' }}>
              <h3 style={{ 
                color: '#333', 
                borderBottom: '2px solid #f0f0f0', 
                paddingBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>📝</span> Hakkımda
              </h3>
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6', 
                marginTop: '15px',
                background: '#f9f9f9',
                padding: '15px',
                borderRadius: '8px'
              }}>
                {user?.bio || 'MongoDB veritabanı bağlantılı sosyal medya profilim.'}
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              marginTop: '30px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={createTestPost}
                style={{
                  padding: '12px 25px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>📝</span> MongoDB'ye Post Ekle
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '12px 25px',
                  background: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                🏠 Ana Sayfa
              </button>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - MongoDB Postları */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>🗂️</span> MongoDB Postları ({posts.length})
            </h3>
            
            {posts.length > 0 ? (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {posts.map((post, index) => (
                  <div key={index} style={{
                    background: '#f8fafc',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    borderLeft: '4px solid #4f46e5'
                  }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>
                      {post.title}
                    </h4>
                    <p style={{ 
                      margin: '0 0 10px 0', 
                      color: '#475569',
                      fontSize: '14px'
                    }}>
                      {post.content}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#64748b'
                    }}>
                      <span>👤 {post.author?.name || 'Anonim'}</span>
                      <span>
                        {post.createdAt ? 
                          new Date(post.createdAt).toLocaleDateString('tr-TR') : 
                          'Yeni'
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📭</div>
                <p>Henüz MongoDB'de post bulunmuyor.</p>
                <p style={{ fontSize: '14px', marginTop: '10px' }}>
                  "MongoDB'ye Post Ekle" butonuna tıklayarak ilk postunu oluşturabilirsin!
                </p>
              </div>
            )}
          </div>

          {/* MongoDB Status */}
          <div style={{
            background: '#f0f9ff',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '20px',
            border: '1px solid #bae6fd'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '10px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: posts.length > 0 ? '#10b981' : '#3b82f6',
                animation: posts.length > 0 ? 'pulse 2s infinite' : 'none'
              }}></div>
              <h4 style={{ margin: 0, color: '#0369a1' }}>
                🗄️ MongoDB Bağlantı Durumu
              </h4>
            </div>
            <p style={{ margin: '5px 0', color: '#0c4a6e', fontSize: '14px' }}>
              <strong>Database:</strong> socialmedia
            </p>
            <p style={{ margin: '5px 0', color: '#0c4a6e', fontSize: '14px' }}>
              <strong>Post Sayısı:</strong> {posts.length} kayıt
            </p>
            <p style={{ margin: '5px 0', color: '#0c4a6e', fontSize: '14px' }}>
              <strong>Bağlantı:</strong> localhost:27017
            </p>
            <style>{`
              @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
