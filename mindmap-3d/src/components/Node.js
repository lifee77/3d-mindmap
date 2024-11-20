// src/components/Node.js
import React, { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';

function Node({ position, label, onClick, onDrag, isSelected, isConnecting }) {
  const [dragging, setDragging] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState(position);

  useEffect(() => {
    // Ensure dragged position is updated if the position prop changes
    setDraggedPosition(position);
  }, [position]);

  const handlePointerDown = (e) => {
    if (isConnecting) {
      e.stopPropagation();
      onClick();
      return;
    }
    e.stopPropagation();
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragging || isConnecting) return;
    e.stopPropagation();
    
    // Calculate the new position in Three.js coordinates
    const newPosition = [e.point.x, e.point.y, e.point.z];

    // Apply tighter movement limits
    const limitedPosition = [
      Math.max(Math.min(newPosition[0], 3), -3), // Limit x within [-3, 3]
      Math.max(Math.min(newPosition[1], 3), -3), // Limit y within [-3, 3]
      Math.max(Math.min(newPosition[2], 3), -3), // Limit z within [-3, 3]
    ];

    setDraggedPosition(limitedPosition);
    if (onDrag) onDrag(limitedPosition);
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
      onClick={(e) => {
        e.stopPropagation();
        if (!dragging) onClick();
      }}
    >
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={isSelected ? "orange" : "skyblue"} />
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
