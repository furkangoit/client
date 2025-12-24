const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

console.log('🚀 Backend başlatılıyor...');

let posts = [
  { id: 1, title: 'Hoş Geldiniz', content: 'Tailwind denemesi başlıyor!', likes: 5, author: 'System' }
];

// Routes
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend çalışıyor!',
    time: new Date().toLocaleTimeString('tr-TR')
  });
});

app.get('/api/posts', (req, res) => {
  res.json({ success: true, posts });
});

app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    stats: { posts: posts.length, users: 1, status: 'online' }
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body || {};
  const newPost = {
    id: posts.length + 1,
    title: title || 'Yeni Post',
    content: content || 'İçerik',
    author: 'Kullanıcı',
    likes: 0,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.json({ success: true, post: newPost });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log('✅ BACKEND ÇALIŞIYOR!');
  console.log('='.repeat(50));
  console.log(`🌐 http://localhost:${PORT}`);
  console.log('='.repeat(50));
});