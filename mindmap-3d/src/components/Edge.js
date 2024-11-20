// src/components/Edge.js
import React from 'react';

function Edge({ start, end }) {
  const positions = new Float32Array([...start, ...end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="gray" />
    </line>
  );
}

export default Edge;
