// src/components/Node.js
import React, { useState } from 'react';
import { Text } from '@react-three/drei';

function Node({ position, label, onUpdateLabel }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleLabelChange = (e) => {
    setNewLabel(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onUpdateLabel(newLabel);
      setIsEditing(false);
    }
  };

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      {isEditing ? (
        <input
          style={{
            position: 'absolute',
            left: `${position[0] * 100 + 200}px`,
            top: `${-position[1] * 100 + 200}px`,
            zIndex: 100,
          }}
          value={newLabel}
          onChange={handleLabelChange}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
          onClick={handleLabelClick}
        >
          {label}
        </Text>
      )}
    </group>
  );
}

export default Node;
