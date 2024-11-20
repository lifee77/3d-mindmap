// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import MindmapEditor from './components/MindmapEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/mindmap/:id" element={<MindmapEditor />} />
      </Routes>
    </Router>
  );
}

export default App;