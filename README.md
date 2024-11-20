# 3D Mindmap Application

A dynamic 3D mindmap tool built using React, React Three Fiber, and Three.js. This interactive visualization tool allows users to create, connect, and organize nodes in 3D space with customizable features.

## Features

- **Node Management**:
  - Create nodes with customizable colors
  - Edit node labels
  - Delete nodes and their connected edges
  - Drag and drop nodes in 3D space
  - Color picker for node customization

- **Edge Management**:
  - Create connections between nodes
  - Add and edit edge descriptions
  - Visual feedback for selected edges
  - Automatic edge updates when moving connected nodes

- **Interactive UI**:
  - Intuitive controls for node/edge creation
  - Clear instructions for connecting nodes
  - Helpful tips for new users
  - Visual feedback for selected items

- **3D Navigation**:
  - Orbit controls for rotating the view
  - Zoom in/out functionality
  - Pan across the 3D space
  - Limited movement boundaries to keep nodes organized

## Technologies Used

- [React](https://reactjs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Three.js](https://threejs.org/)
- [React Drei](https://github.com/pmndrs/drei)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lifee77/mindmaps_3d.git
   cd mindmaps_3d
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000/`.

## How to Use

1. **Creating Nodes**:
   - Use the color picker to select a node color
   - Click "Add Node" to create a new node
   - Click on any node to edit its label
   - Use the delete button while editing to remove a node

2. **Creating Connections**:
   - Click "Add Edge" to start connecting mode
   - Click the first node you want to connect
   - Click the second node to complete the connection
   - Click on any edge to add/edit its description

3. **Navigation**:
   - Left click + drag to rotate the view
   - Right click + drag to pan
   - Scroll to zoom in/out
   - Drag nodes to reposition them

## Project Structure

```
src/
├── components/
│   ├── Node.js        # Node component with drag functionality
│   ├── Edge.js        # Edge component with description support
│   └── MindMap.js     # Main 3D scene management
├── App.js             # Application logic and UI controls
└── index.js           # Entry point
```

## Future Enhancements

- Save/load mindmap data
- Multiple mindmap support
- Node grouping and categorization
- Advanced styling options
- Export/import functionality
- Collaboration features
- VR/AR support

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation


---

Happy mindmapping! For questions or support, please create an issue in the repository.
