// src/App.js
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MindMap from './components/MindMap';

function App() {
  const [nodes, setNodes] = useState(() => {
    // Load nodes from local storage if available
    const savedNodes = localStorage.getItem('nodes');
    return savedNodes ? JSON.parse(savedNodes) : [
      { id: 1, position: [0, 0, 0], label: 'Central Node', color: 'skyblue', size: 0.3 },
    ];
  });
  const [edges, setEdges] = useState(() => {
    // Load edges from local storage if available
    const savedEdges = localStorage.getItem('edges');
    return savedEdges ? JSON.parse(savedEdges) : [];
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [firstNode, setFirstNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [edgeDescription, setEdgeDescription] = useState('');
  const [showEdgeHint, setShowEdgeHint] = useState(false);
  const [nodeColor, setNodeColor] = useState('skyblue');

  useEffect(() => {
    // Save nodes and edges to local storage whenever they change
    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [nodes, edges]);

  const addNode = () => {
    const newNode = {
      id: nodes.length + 1,
      position: [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2],
      label: `Node ${nodes.length + 1}`,
      color: nodeColor,
      size: 0.3, // Default size for new nodes
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
    setNewLabel(newNode.label);
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
      setSelectedNode({ ...selectedNode, label: newLabel.trim() }); // Update selected node state
      setNewLabel(''); // Clear the input after submission
    }
    setSelectedNode(null); // Hide the editing UI after submission
  };

  const handleNodeColorChange = (e) => {
    if (selectedNode) {
      const updatedNodes = nodes.map((n) =>
        n.id === selectedNode.id ? { ...n, color: e.target.value } : n
      );
      setNodes(updatedNodes);
      setSelectedNode({ ...selectedNode, color: e.target.value }); // Update selected node state
    }
  };

  const handleNodeSizeChange = (e) => {
    if (selectedNode) {
      const newSize = parseFloat(e.target.value);
      const updatedNodes = nodes.map((n) =>
        n.id === selectedNode.id ? { ...n, size: newSize } : n
      );
      setNodes(updatedNodes);
      setSelectedNode({ ...selectedNode, size: newSize }); // Update selected node state
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

  const handleFirstEdge = () => {
    if (edges.length === 1) {
      setShowEdgeHint(true);
      setTimeout(() => setShowEdgeHint(false), 5000);
    }
  };

  const handleEdgeCreation = (newEdge) => {
    setEdges([...edges, newEdge]);
    handleFirstEdge();
  };

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setEdges(edges.filter(edge => 
      edge.startId !== nodeId && edge.endId !== nodeId
    ));
    setSelectedNode(null);
  };

  const handleNodeClick = (node) => {
    if (selectedNode && selectedNode.id === node.id) {
      // If the same node is clicked again, deselect it
      setSelectedNode(null);
    } else {
      setSelectedNode(node);
      setNewLabel(node.label); // Set the current label for editing
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
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="color"
          value={nodeColor}
          onChange={(e) => setNodeColor(e.target.value)}
          style={{
            width: '40px',
            height: '40px',
            padding: '0',
            border: '2px solid white',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
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
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isConnecting ? 'Cancel Connection' : 'Add Edge'}
        </button>
      </div>

      {/* Node Editing UI */}
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
          <div style={{ marginBottom: '5px' }}>Edit Node:</div>
          <div style={{ display: 'flex', gap: '10px' }}>
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
            <input
              type="color"
              value={selectedNode.color}
              onChange={handleNodeColorChange}
              style={{
                width: '40px',
                height: '40px',
                padding: '0',
                border: '2px solid white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            />
            <input
              type="number"
              value={selectedNode.size}
              onChange={handleNodeSizeChange}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                width: '60px'
              }}
              min="0.1"
              step="0.1"
            />
            <button
              onClick={() => deleteNode(selectedNode.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
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
          <div style={{ marginBottom: '5px' }}>Enter edge description:</div>
          <input
            type="text"
            value={edgeDescription}
            onChange={handleEdgeDescriptionChange}
            onBlur={handleEdgeDescriptionSubmit}
            onKeyPress={(e) => e.key === 'Enter' && handleEdgeDescriptionSubmit()}
            placeholder="Describe the connection"
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

      {/* Edge Hint */}
      {showEdgeHint && (
        <div style={{
          position: 'absolute',
          top: '210px',
          left: '10px',
          zIndex: 1000,
          background: '#e3f2fd',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s'
        }}>
          Tip: Click on any edge to add a description!
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
          handleEdgeCreation={handleEdgeCreation}
          handleNodeClick={handleNodeClick} // Pass the click handler
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;