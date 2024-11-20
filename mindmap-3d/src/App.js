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
  const [isConnecting, setIsConnecting] = useState(false);
  const [firstNode, setFirstNode] = useState(null);

  const addNode = () => {
    const newNode = {
      id: nodes.length + 1,
      position: [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2],
      label: `Node ${nodes.length + 1}`,
    };
    setNodes([...nodes, newNode]);
  };

  const startConnecting = () => {
    setIsConnecting(true);
    setFirstNode(null);
  };

  return (
    <>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        <button 
          onClick={addNode}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Node
        </button>
        <button 
          onClick={startConnecting}
          style={{
            padding: '8px 16px',
            backgroundColor: isConnecting ? '#f44336' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isConnecting ? 'Cancel Connection' : 'Add Edge'}
        </button>
      </div>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MindMap 
          nodes={nodes} 
          edges={edges} 
          setNodes={setNodes} 
          setEdges={setEdges}
          isConnecting={isConnecting}
          setIsConnecting={setIsConnecting}
          firstNode={firstNode}
          setFirstNode={setFirstNode}
        />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
