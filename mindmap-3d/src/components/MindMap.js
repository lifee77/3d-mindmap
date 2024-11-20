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
  setFirstNode,
  selectedNode,
  setSelectedNode,
  selectedEdge,
  setSelectedEdge
}) {
  const handleNodeClick = (node) => {
    if (isConnecting) {
      if (!firstNode) {
        setFirstNode(node);
      } else if (node.id !== firstNode.id) {
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
        setSelectedEdge(newEdge);
      }
    } else {
      setSelectedNode(node);
      setSelectedEdge(null);
    }
  };

  const handleEdgeClick = (edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const handleNodeDrag = (nodeId, newPosition) => {
    const updatedNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, position: newPosition } : node
    );
    setNodes(updatedNodes);

    const updatedEdges = edges.map((edge) => {
      if (edge.startId === nodeId) {
        return { ...edge, start: newPosition };
      }
      if (edge.endId === nodeId) {
        return { ...edge, end: newPosition };
      }
      return edge;
    });
    setEdges(updatedEdges);
  };

  return (
    <group>
      {edges.map((edge) => (
        <Edge
          key={edge.id}
          start={edge.start}
          end={edge.end}
          description={edge.description}
          onClick={() => handleEdgeClick(edge)}
          isSelected={selectedEdge?.id === edge.id}
        />
      ))}
      {nodes.map((node) => (
        <Node
          key={node.id}
          position={node.position}
          label={node.label}
          onClick={() => handleNodeClick(node)}
          onDrag={(newPosition) => handleNodeDrag(node.id, newPosition)}
          isSelected={selectedNode?.id === node.id || firstNode?.id === node.id}
          isConnecting={isConnecting}
        />
      ))}
    </group>
  );
}

export default MindMap;
