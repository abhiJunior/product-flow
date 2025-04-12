import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  Background,
} from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';

// Custom node component import
import CustomNode from './CustomNode'; 

// Custom node type
const nodeTypes = {
  custom: CustomNode, // Use CustomNode as the custom node type
};

const FlowEditor = ({ selectedProduct }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Add a node whenever a product is selected
  useEffect(() => {
    if (selectedProduct) {
      const newNode = {
        id: uuidv4(), // Unique ID for the node
        type: 'custom', // Set to 'custom' to render CustomNode
        position: {
          x: Math.random() * 300, // Random position
          y: Math.random() * 300,
        },
        data: {
           // Product price
          title: selectedProduct.title, // Product title
          price: selectedProduct.price, // Product price
          deleteNode: handleDeleteNode, // Pass deleteNode function
          
        },
      };

      console.log('Adding node:', newNode); // Debugging
      setNodes((prev) => [...prev, newNode]);
    }
  }, [selectedProduct]);

  // Delete node function
  const handleDeleteNode = (id) => {
    console.log(`Deleting node with ID: ${id}`); // Debugging
    setNodes((prev) => prev.filter((node) => node.id !== id)); // Remove node
    setEdges((prev) => prev.filter((edge) => edge.source !== id && edge.target !== id)); // Remove connected edges
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // Use custom node type
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;



// import React, { useCallback, useEffect, useState } from 'react';
// import ReactFlow, {
//   addEdge,
//   applyEdgeChanges,
//   applyNodeChanges,
//   Controls,
//   MiniMap,
//   Background,
// } from 'react-flow-renderer';
// import { v4 as uuidv4 } from 'uuid'; // ✅ Import uuid

// const FlowEditor = ({ selectedProduct }) => {
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);

//   // ✅ Add a node when product is selected
//   useEffect(() => {
//     if (selectedProduct) {
//       const newNode = {
//         id: uuidv4(), // ✅ Unique ID
//         type: 'default',
//         position: {
//           x: Math.random() * 300,
//           y: Math.random() * 300,
//         },
//         data: {
//           label: `${selectedProduct.title} - ₹${selectedProduct.price}`,
//         },
//       };

//       console.log('Adding node:', newNode); // ✅ Debug
//       setNodes((prev) => [...prev, newNode]);
//     }
//   }, [selectedProduct]);

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       console.log('Connecting:', connection); // ✅ Debug
//       setEdges((eds) => {
//         const updated = addEdge(connection, eds);
//         console.log('Edges:', updated); // ✅ Debug
//         return updated;
//       });
//     },
//     []
//   );

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// };

// export default FlowEditor;
