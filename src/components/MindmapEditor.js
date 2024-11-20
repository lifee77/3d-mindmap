import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MindMap from './MindMap';

function MindmapEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firstNode, setFirstNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [edgeDescription, setEdgeDescription] = useState('');
  const [showEdgeHint, setShowEdgeHint] = useState(false);
  const [nodeColor, setNodeColor] = useState('skyblue');
  const [mindmapName, setMindmapName] = useState('');

  // Fetch mindmap data
  useEffect(() => {
    fetchMindmap();
  }, [id]);

  const fetchMindmap = async () => {
    try {
      console.log('Fetching mindmap with ID:', id);
      const response = await fetch(`http://localhost:3001/api/mindmaps/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched mindmap:', data);
      setNodes(data.nodes);
      setEdges(data.edges);
      setMindmapName(data.name);
    } catch (error) {
      console.error('Error fetching mindmap:', error);
    }
  };

  // Save mindmap data
  const saveMindmap = async () => {
    try {
      await fetch(`http://localhost:3001/api/mindmaps/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
          name: mindmapName,
        }),
      });
    } catch (error) {
      console.error('Error saving mindmap:', error);
    }
  };

  // Auto-save when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      saveMindmap();
    }
  }, [nodes, edges]);

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      position: [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2],
      label: `Node ${nodes.length + 1}`,
      color: nodeColor,
      size: 0.3,
    };
    setNodes([...nodes, newNode]);
  };

  const handleNodeClick = (node) => {
    if (isConnecting) {
      if (!firstNode) {
        setFirstNode(node);
      } else if (node.id !== firstNode.id) {
        handleEdgeCreation({
          id: Date.now(),
          startId: firstNode.id,
          endId: node.id,
          start: firstNode.position,
          end: node.position,
          description: ''
        });
        setIsConnecting(false);
        setFirstNode(null);
      }
    } else if (isEditing) {
      setSelectedNode(node);
      setNewLabel(node.label);
    }
  };

  const handleEdgeCreation = (newEdge) => {
    setEdges([...edges, newEdge]);
  };

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setEdges(edges.filter(edge => 
      edge.startId !== nodeId && edge.endId !== nodeId
    ));
    setSelectedNode(null);
    setIsEditing(false);
  };

  const handleNodeEdit = (nodeId, updates) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === nodeId ? { ...node, ...updates } : node
      )
    );
  };

  // Add this function to save changes to the server
  const saveChanges = async () => {
    try {
      await fetch(`http://localhost:3001/api/mindmaps/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: mindmapName,
          nodes,
          edges,
        }),
      });
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Add useEffect to save changes when nodes or edges change
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      saveChanges();
    }
  }, [nodes, edges]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Top Navigation */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        background: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Home
        </button>
        <h2 style={{ margin: 0 }}>{mindmapName}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={addNode}
            style={{
              padding: '8px 16px',
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
            onClick={() => {
              setIsConnecting(!isConnecting);
              setIsEditing(false);
              setFirstNode(null);
              setSelectedNode(null);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: isConnecting ? '#ff9800' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isConnecting ? 'Cancel Connection' : 'Add Edge'}
          </button>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setIsConnecting(false);
              setFirstNode(null);
              setSelectedNode(null);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: isEditing ? '#ff9800' : '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isEditing ? 'Done Editing' : 'Edit Node'}
          </button>
        </div>
      </div>

      {/* Node Editing UI */}
      {selectedNode && isEditing && (
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          width: '250px'
        }}>
          <h3 style={{ margin: '0 0 15px 0' }}>Edit Node</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Label Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Label:</label>
              <input
                type="text"
                value={selectedNode.label}
                onChange={(e) => handleNodeEdit(selectedNode.id, { label: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </div>

            {/* Color Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Color:</label>
              <input
                type="color"
                value={selectedNode.color}
                onChange={(e) => handleNodeEdit(selectedNode.id, { color: e.target.value })}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>

            {/* Size Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Size:</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={selectedNode.size}
                onChange={(e) => handleNodeEdit(selectedNode.id, { size: parseFloat(e.target.value) })}
                style={{ width: '100%' }}
              />
              <span>{selectedNode.size}</span>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => {
                setNodes(prevNodes => prevNodes.filter(n => n.id !== selectedNode.id));
                setSelectedNode(null);
                setIsEditing(false);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Delete Node
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {isConnecting && (
        <div style={{
          position: 'absolute',
          top: '80px',
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
          handleEdgeCreation={handleEdgeCreation}
          handleNodeClick={handleNodeClick}
        />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default MindmapEditor; 