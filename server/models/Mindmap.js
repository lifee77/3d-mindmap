const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  id: String,
  position: [Number],
  label: String,
  color: String,
  size: Number
});

const edgeSchema = new mongoose.Schema({
  id: String,
  startId: String,
  endId: String,
  start: [Number],
  end: [Number],
  description: String
});

const mindmapSchema = new mongoose.Schema({
  name: String,
  nodes: [nodeSchema],
  edges: [edgeSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mindmap', mindmapSchema); 