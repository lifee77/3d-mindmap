// src/App.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MindMap from './components/MindMap';

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <MindMap />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
