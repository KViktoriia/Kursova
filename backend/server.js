const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes

// 1. GET all news
app.get('/api/news', (req, res) => {
  const query = 'SELECT * FROM news ORDER BY date DESC, id DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 2. POST a news article
app.post('/api/news', (req, res) => {
  const { title, summary, content, category, date, image_url } = req.body;
  
  if (!title || !summary || !content || !category || !date) {
    res.status(400).json({ error: 'Please provide all required fields (title, summary, content, category, date)' });
    return;
  }
  
  const imgUrl = image_url || 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80';
  
  const query = `
    INSERT INTO news (title, summary, content, category, date, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  db.run(query, [title, summary, content, category, date, imgUrl], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: 'News article created successfully',
      id: this.lastID
    });
  });
});

// 3. GET all projects
app.get('/api/projects', (req, res) => {
  const query = 'SELECT * FROM projects ORDER BY start_year DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 4. POST contact form submission
app.post('/api/contacts', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'Please fill out all fields.' });
    return;
  }
  
  const query = `
    INSERT INTO contacts (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(query, [name, email, subject, message], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: 'Contact feedback stored successfully',
      id: this.lastID
    });
  });
});

// 5. GET contact submissions (for Admin panel)
app.get('/api/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 6. PUT mark contact submission as read
app.put('/api/contacts/:id/read', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE contacts SET is_read = 1 WHERE id = ?';
  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Повідомлення позначено як прочитане' });
  });
});

// 7. PUT mark contact submission as unread
app.put('/api/contacts/:id/unread', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE contacts SET is_read = 0 WHERE id = ?';
  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Повідомлення позначено як непрочитане' });
  });
});


// Serve static files from the React frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// For any request that doesn't match an API route, send back the index.html from React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
