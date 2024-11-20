// src/components/MindMap.js
import React, { useState, useEffect } from 'react';
import Node from './Node';
import Edge from './Edge';
import ReactDOM from 'react-dom';

function MindMap({ 
  nodes, 
  setNodes, 
  edges, 
  setEdges, 
  isConnecting, 
  setIsConnecting, 
  firstNode, 
  setFirstNode 
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [edgeDescription, setEdgeDescription] = useState('');

  const handleNodeClick = (node) => {
    if (isConnecting) {
      if (!firstNode) {
        setFirstNode(node);
      } else if (node.id !== firstNode.id) {
        // Create new edge
        const newEdge = {
          id: `edge-${edges.length + 1}`,
          startId: firstNode.id,
          endId: node.id,
          start: firstNode.position,
          end: node.position,
          description: ''
        };
        setEdges([...edges, newEdge]);
        setIsConnecting(false);
        setFirstNode(null);
      }
    } else {
      setSelectedNode(node);
      setNewLabel(node.label);
    }
  };

  // Handle edge click for description
  const handleEdgeClick = (edge) => {
    setSelectedEdge(edge);
    setEdgeDescription(edge.description || '');
  };

  // Handle label change for nodes
  const handleLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleLabelSubmit = () => {
    if (selectedNode) {
      const updatedNodes = nodes.map((n) =>
        n.id === selectedNode.id ? { ...n, label: newLabel } : n
      );
      setNodes(updatedNodes);
      setSelectedNode(null); // Deselect the node after updating
    }
  };

  // Handle description change for edges
  const handleEdgeDescriptionChange = (e) => {
    setEdgeDescription(e.target.value);
  };

  const handleEdgeDescriptionSubmit = () => {
    if (selectedEdge) {
      const updatedEdges = edges.map((e) =>
        e.id === selectedEdge.id ? { ...e, description: edgeDescription } : e
      );
      setEdges(updatedEdges);
      setSelectedEdge(null); // Deselect the edge after updating
    }
  };

  // Update edges dynamically when nodes move
  useEffect(() => {
    const updatedEdges = edges.map((edge) => {
      const startNode = nodes.find((n) => n.id === edge.startId);
      const endNode = nodes.find((n) => n.id === edge.endId);
      return {
        ...edge,
        start: startNode ? startNode.position : edge.start,
        end: endNode ? endNode.position : edge.end,
      };
    });
    setEdges(updatedEdges);
  }, [nodes, edges, setEdges]);

  // Handle node drag (if implemented in Node component)
  const handleNodeDrag = (nodeId, newPosition) => {
    const updatedNodes = nodes.map((n) =>
      n.id === nodeId ? { ...n, position: newPosition } : n
    );
    setNodes(updatedNodes);
  };

  return (
    <>
      {/* 3D Scene Elements */}
      {edges.map((edge) => (
        <Edge
          key={edge.id}
          start={edge.start}
          end={edge.end}
          description={edge.description}
          onClick={() => handleEdgeClick(edge)}
        />
      ))}
      {nodes.map((node) => (
        <Node
          key={node.id}
          position={node.position}
          label={node.label}
          onClick={() => handleNodeClick(node)}
          onDrag={(newPosition) => handleNodeDrag(node.id, newPosition)}
          isSelected={firstNode?.id === node.id}
          isConnecting={isConnecting}
        />
      ))}
    </>
  );
}

// Create a new component for UI overlays
function MindMapUI({ 
  isConnecting, 
  firstNode, 
  selectedNode, 
  selectedEdge,
  newLabel,
  edgeDescription,
  handleLabelChange,
  handleLabelSubmit,
  handleEdgeDescriptionChange,
  handleEdgeDescriptionSubmit 
}) {
  return ReactDOM.createPortal(
    <>
      {isConnecting && (
        <div style={{
          position: 'fixed',
          top: '50px',
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
      {selectedNode && (
        <div style={{
          position: 'fixed',
          top: '50px',
          left: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '5px',
          borderRadius: '4px'
        }}>
          <input
            type="text"
            value={newLabel}
            onChange={handleLabelChange}
            onBlur={handleLabelSubmit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLabelSubmit();
              }
            }}
            autoFocus
          />
        </div>
      )}
      {selectedEdge && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '10px',
          zIndex: 1000,
          background: 'white',
          padding: '5px',
          borderRadius: '4px'
        }}>
          <input
            type="text"
            placeholder="Edge Description"
            value={edgeDescription}
            onChange={handleEdgeDescriptionChange}
            onBlur={handleEdgeDescriptionSubmit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleEdgeDescriptionSubmit();
              }
            }}
            autoFocus
          />
        </div>
      )}
    </>,
    document.body
  );
}

export default MindMap;
