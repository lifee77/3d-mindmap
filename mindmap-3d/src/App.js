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
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [edgeDescription, setEdgeDescription] = useState('');

  const addNode = () => {
    const newNode = {
      id: nodes.length + 1,
      position: [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2],
      label: `Node ${nodes.length + 1}`,
    };
    setNodes([...nodes, newNode]);
  };

  const startConnecting = () => {
    setIsConnecting(!isConnecting);
    setFirstNode(null);
  };

  const handleLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleLabelSubmit = () => {
    if (selectedNode && newLabel.trim()) {
      const updatedNodes = nodes.map((n) =>
        n.id === selectedNode.id ? { ...n, label: newLabel.trim() } : n
      );
      setNodes(updatedNodes);
      setSelectedNode(null);
    }
  };

  const handleEdgeDescriptionChange = (e) => {
    setEdgeDescription(e.target.value);
  };

  const handleEdgeDescriptionSubmit = () => {
    if (selectedEdge) {
      const updatedEdges = edges.map((e) =>
        e.id === selectedEdge.id ? { ...e, description: edgeDescription } : e
      );
      setEdges(updatedEdges);
      setSelectedEdge(null);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* UI Controls */}
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          onClick={addNode}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
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
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isConnecting ? 'Cancel Connection' : 'Add Edge'}
        </button>
      </div>

      {/* Node Edit UI */}
      {selectedNode && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          <input
            type="text"
            value={newLabel}
            onChange={handleLabelChange}
            onBlur={handleLabelSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleLabelSubmit()}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '200px'
            }}
            autoFocus
          />
        </div>
      )}

      {/* Edge Edit UI */}
      {selectedEdge && (
        <div style={{
          position: 'absolute',
          top: '110px',
          left: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          <input
            type="text"
            value={edgeDescription}
            onChange={handleEdgeDescriptionChange}
            onBlur={handleEdgeDescriptionSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleEdgeDescriptionSubmit()}
            placeholder="Enter edge description"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '200px'
            }}
            autoFocus
          />
        </div>
      )}

      {/* Connection Instructions */}
      {isConnecting && (
        <div style={{
          position: 'absolute',
          top: '160px',
          left: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {!firstNode ? 
            "Click on the first node to connect" : 
            "Now click on the second node to create connection"
          }
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MindMap 
          nodes={nodes} 
          setNodes={setNodes}
          edges={edges} 
          setEdges={setEdges}
          isConnecting={isConnecting}
          setIsConnecting={setIsConnecting}
          firstNode={firstNode}
          setFirstNode={setFirstNode}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          selectedEdge={selectedEdge}
          setSelectedEdge={setSelectedEdge}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
