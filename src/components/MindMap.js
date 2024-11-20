// src/components/MindMap.js
import React from 'react';
import Node from './Node';
import Edge from './Edge';

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
  setSelectedEdge,
  handleEdgeCreation,
  handleNodeClick
}) {
  const handleEdgeClick = (edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const handleNodeDrag = (nodeId, newPosition) => {
    if (!setNodes || !setEdges) return;

    setNodes(prevNodes => 
      prevNodes.map(node =>
        node.id === nodeId ? { ...node, position: newPosition } : node
      )
    );

    setEdges(prevEdges => 
      prevEdges.map(edge => {
        if (edge.startId === nodeId) {
          return { ...edge, start: newPosition };
        }
        if (edge.endId === nodeId) {
          return { ...edge, end: newPosition };
        }
        return edge;
      })
    );
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
          color={node.color}
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
