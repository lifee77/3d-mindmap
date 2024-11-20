const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mindmap3d', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mindmap Schema
const mindmapSchema = new mongoose.Schema({
  name: String,
  nodes: Array,
  edges: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Mindmap = mongoose.model('Mindmap', mindmapSchema);

// API Routes
app.get('/api/mindmaps', async (req, res) => {
  try {
    const mindmaps = await Mindmap.find().sort({ updatedAt: -1 });
    res.json(mindmaps);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mindmaps' });
  }
});

app.post('/api/mindmaps', async (req, res) => {
  try {
    const mindmap = new Mindmap(req.body);
    await mindmap.save();
    res.json(mindmap);
  } catch (error) {
    res.status(500).json({ error: 'Error creating mindmap' });
  }
});

app.get('/api/mindmaps/:id', async (req, res) => {
  try {
    const mindmap = await Mindmap.findById(req.params.id);
    res.json(mindmap);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mindmap' });
  }
});

app.put('/api/mindmaps/:id', async (req, res) => {
  try {
    const mindmap = await Mindmap.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    res.json(mindmap);
  } catch (error) {
    res.status(500).json({ error: 'Error updating mindmap' });
  }
});

app.delete('/api/mindmaps/:id', async (req, res) => {
  try {
    await Mindmap.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mindmap deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting mindmap' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 