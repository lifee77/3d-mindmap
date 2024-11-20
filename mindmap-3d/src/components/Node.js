// src/components/Node.js
import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

function Node({ position, label, onClick }) {
  const { camera } = useThree();
  const [dragging, setDragging] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState(position);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    e.stopPropagation();
    const [x, y, z] = e.unprojectedPoint.toArray(); // Adjust projection as needed
    setDraggedPosition([x, y, z]);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  return (
    <group
      position={draggedPosition}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={onClick}
    >
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export default Node;
