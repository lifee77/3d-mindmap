require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Mindmap = require('./models/Mindmap');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindmap-db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/api/mindmaps', async (req, res) => {
  try {
    console.log('Fetching all mindmaps');
    const mindmaps = await Mindmap.find();
    console.log('Found mindmaps:', mindmaps);
    res.json(mindmaps);
  } catch (error) {
    console.error('Error fetching mindmaps:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mindmaps/:id', async (req, res) => {
  try {
    console.log('Fetching mindmap:', req.params.id);
    const mindmap = await Mindmap.findById(req.params.id);
    if (!mindmap) {
      console.log('Mindmap not found');
      return res.status(404).json({ error: 'Mindmap not found' });
    }
    console.log('Found mindmap:', mindmap);
    res.json(mindmap);
  } catch (error) {
    console.error('Error fetching mindmap:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/mindmaps', async (req, res) => {
  try {
    console.log('Creating new mindmap:', req.body);
    const mindmap = new Mindmap(req.body);
    await mindmap.save();
    console.log('Created mindmap:', mindmap);
    res.status(201).json(mindmap);
  } catch (error) {
    console.error('Error creating mindmap:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/mindmaps/:id', async (req, res) => {
  try {
    console.log('Updating mindmap:', req.params.id);
    const mindmap = await Mindmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!mindmap) {
      console.log('Mindmap not found');
      return res.status(404).json({ error: 'Mindmap not found' });
    }
    console.log('Updated mindmap:', mindmap);
    res.json(mindmap);
  } catch (error) {
    console.error('Error updating mindmap:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 