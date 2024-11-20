// src/components/Edge.js
import React, { useState } from 'react';
import { Text } from '@react-three/drei';

function Edge({ start, end }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleEdgeClick = () => {
    setIsClicked(!isClicked);
  };

  const positions = new Float32Array([...start, ...end]);
  return (
    <>
      <line onClick={handleEdgeClick}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={isClicked ? 'red' : 'gray'} />
      </line>
      {isClicked && (
        <Text
          position={[
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2,
            (start[2] + end[2]) / 2,
          ]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Edge Info
        </Text>
      )}
    </>
  );
}

export default Edge;
