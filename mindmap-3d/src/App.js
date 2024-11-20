// src/App.js
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MindMap from './components/MindMap';

function App() {
  const [nodes, setNodes] = useState([
    { id: 1, position: [0, 0, 0], label: 'Central Node' },
  ]);
  const [edges, setEdges] = useState([]);

  const addNode = () => {
    const newNode = {
      id: nodes.length + 1,
      position: [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2],
      label: `Node ${nodes.length + 1}`,
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        <button onClick={addNode}>Add Node</button>
      </div>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <MindMap nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
