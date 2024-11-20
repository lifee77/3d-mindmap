// src/components/MindMap.js
import React, { useState } from 'react';
import Node from './Node';
import Edge from './Edge';

function MindMap() {
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

  const addEdge = (startNode, endNode) => {
    setEdges([...edges, { start: startNode.position, end: endNode.position }]);
  };

  return (
    <>
      <button
        onClick={addNode}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 100,
        }}
      >
        Add Node
      </button>
      {edges.map((edge, idx) => (
        <Edge key={idx} start={edge.start} end={edge.end} />
      ))}
      {nodes.map((node) => (
        <Node
          key={node.id}
          position={node.position}
          label={node.label}
          onUpdateLabel={(newLabel) => {
            const updatedNodes = nodes.map((n) =>
              n.id === node.id ? { ...n, label: newLabel } : n
            );
            setNodes(updatedNodes);
          }}
        />
      ))}
    </>
  );
}

export default MindMap;
