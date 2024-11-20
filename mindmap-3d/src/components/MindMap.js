// src/components/MindMap.js
import React, { useState } from 'react';
import Node from './Node';
import Edge from './Edge';

function MindMap({ nodes, setNodes }) {
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [connectingNode, setConnectingNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);

  // Function to handle connecting nodes
  const handleNodeClick = (node) => {
    if (connectingNode) {
      // Connect nodes and create an edge
      if (connectingNode.id !== node.id) {
        setEdges([...edges, { start: connectingNode.position, end: node.position }]);
      }
      setConnectingNode(null); // Reset connecting node state
    } else {
      setConnectingNode(node); // Set the node to connect
    }
  };

  // Function to handle node drag start
  const handleNodeDragStart = (node) => {
    setDraggedNode(node);
  };

  // Function to handle node drag movement
  const handleNodeDrag = (e) => {
    if (draggedNode) {
      const newPosition = [e.point.x, e.point.y, e.point.z];
      const updatedNodes = nodes.map((n) =>
        n.id === draggedNode.id ? { ...n, position: newPosition } : n
      );
      setNodes(updatedNodes);
    }
  };

  // Function to handle node drag end
  const handleNodeDragEnd = () => {
    setDraggedNode(null);
  };

  return (
    <>
      {edges.map((edge, idx) => (
        <Edge key={idx} start={edge.start} end={edge.end} />
      ))}
      {nodes.map((node) => (
        <Node
          key={node.id}
          position={node.position}
          label={node.label}
          onClick={() => handleNodeClick(node)}
          onDragStart={() => handleNodeDragStart(node)}
          onDrag={handleNodeDrag}
          onDragEnd={handleNodeDragEnd}
        />
      ))}
    </>
  );
}

export default MindMap;
