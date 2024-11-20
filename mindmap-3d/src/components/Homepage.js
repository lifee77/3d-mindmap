import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [mindmaps, setMindmaps] = useState([]);
  const [newMapName, setNewMapName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing mindmaps from the database
    fetchMindmaps();
  }, []);

  const fetchMindmaps = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/mindmaps');
      const data = await response.json();
      setMindmaps(data);
    } catch (error) {
      console.error('Error fetching mindmaps:', error);
    }
  };

  const createNewMindmap = async () => {
    if (!newMapName.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/api/mindmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newMapName,
          nodes: [{ id: 1, position: [0, 0, 0], label: 'Central Node', color: 'skyblue', size: 0.3 }],
          edges: []
        }),
      });
      const data = await response.json();
      navigate(`/mindmap/${data.id}`);
    } catch (error) {
      console.error('Error creating mindmap:', error);
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>3D Mindmap Creator</h1>
      
      {/* Create New Mindmap */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h2>Create New Mindmap</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newMapName}
            onChange={(e) => setNewMapName(e.target.value)}
            placeholder="Enter mindmap name"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              flex: 1
            }}
          />
          <button
            onClick={createNewMindmap}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create New
          </button>
        </div>
      </div>

      {/* Existing Mindmaps */}
      <div>
        <h2>Your Mindmaps</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {mindmaps.map((mindmap) => (
            <div
              key={mindmap.id}
              onClick={() => navigate(`/mindmap/${mindmap.id}`)}
              style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                ':hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>{mindmap.name}</h3>
              <p style={{ margin: '0', color: '#666' }}>
                Created: {new Date(mindmap.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage; 