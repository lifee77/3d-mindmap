// src/components/Edge.js
import React from 'react';
import { Text, Line } from '@react-three/drei';

function Edge({ start, end, description, onClick }) {
  const points = [start, end];
  
  return (
    <group onClick={onClick}>
      <Line 
        points={points}
        color="black"
        lineWidth={2}
      />
      {description && (
        <Text
          position={[
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2 + 0.2,
            (start[2] + end[2]) / 2,
          ]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {description}
        </Text>
      )}
    </group>
  );
}

export default Edge;
