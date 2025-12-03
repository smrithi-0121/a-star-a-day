import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cosmica')
  .then(() => console.log('📦 MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// NASA APOD endpoint
app.get('/api/apod', async (req, res) => {
  const { date } = req.query;
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('NASA API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});

// OpenAI Eulogy endpoint
app.post('/api/generate-eulogy', async (req, res) => {
  const { title, explanation } = req.body;
  
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{
          role: 'user',
          content: `Write a poetic, dramatic 3-4 sentence sci-fi eulogy for this cosmic phenomenon: "${title}". Context: ${explanation.substring(0, 200)}`
        }],
        max_tokens: 150,
        temperature: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ eulogy: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).json({ error: 'Failed to generate eulogy' });
  }
});

// Google Translate endpoint
app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  
  if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
    return res.status(500).json({ error: 'Google Translate API key not configured' });
  }

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        q: text,
        target: targetLang
      }
    );
    res.json({ translatedText: response.data.data.translations[0].translatedText });
  } catch (error) {
    console.error('Google Translate Error:', error.message);
    res.status(500).json({ error: 'Failed to translate' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Save notebook
app.post('/api/notebook', async (req, res) => {
  const { userId, notebook } = req.body;
  
  try {
    let user = await User.findOne({ userId });
    
    if (!user) {
      user = new User({ userId, notebook });
    } else {
      user.notebook = notebook;
    }
    
    await user.save();
    res.json({ success: true, notebook: user.notebook });
  } catch (error) {
    console.error('Notebook save error:', error);
    res.status(500).json({ error: 'Failed to save notebook' });
  }
});

// Get notebook
app.get('/api/notebook/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await User.findOne({ userId });
    res.json({ notebook: user?.notebook || '' });
  } catch (error) {
    console.error('Notebook fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch notebook' });
  }
});

// Save favorites
app.post('/api/favorites', async (req, res) => {
  const { userId, favorite } = req.body;
  
  try {
    let user = await User.findOne({ userId });
    
    if (!user) {
      user = new User({ userId, favorites: [favorite] });
    } else {
      user.favorites.push(favorite);
    }
    
    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Cosmica backend running on http://localhost:${PORT}`);
});
