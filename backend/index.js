const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 5000;

app.use(cors());

app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.get('/api/gallery', async (req, res) => {
  const { type } = req.query;

  try {
    if (type === 'pictures') {
      const picturesData = await fs.readFile(path.join(__dirname, 'pictures.json'), 'utf8');
      res.json(JSON.parse(picturesData));
    } else if (type === 'videos') {
      const videosData = await fs.readFile(path.join(__dirname, 'videos.json'), 'utf8');
      res.json(JSON.parse(videosData));
    } else {
      res.status(400).json({ error: 'Invalid gallery type. Use "pictures" or "videos".' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading gallery data', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});