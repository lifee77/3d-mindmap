// src/components/Edge.js
import React, { useState } from 'react';
import { Text, Line } from '@react-three/drei';

function Edge({ start, end, description, onClick, isSelected }) {
  const points = [start, end];
  
  return (
    <group onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}>
      <Line 
        points={points}
        color={isSelected ? "#ff9800" : "black"}
        lineWidth={2}
      />
      {isSelected && description && (
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
