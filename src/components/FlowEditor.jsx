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
import CustomNode from './CustomNode'; // Import custom node component

// Register custom node
const nodeTypes = {
  custom: CustomNode,
};

const FlowEditor = ({ selectedProduct }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Add node on product selection
  useEffect(() => {
    if (selectedProduct) {
      const newNode = {
        id: uuidv4(),
        type: 'custom',
        position: {
          x: Math.random() * 300,
          y: Math.random() * 300,
        },
        data: {
          title: selectedProduct.title,
          price: selectedProduct.price,
          deleteNode: handleDeleteNode,
        },
      };

      setNodes((prev) => [...prev, newNode]);
    }
  }, [selectedProduct]);

  // Delete node & its connected edges
  const handleDeleteNode = (id) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) => prev.filter((edge) => edge.source !== id && edge.target !== id));
  };

  // Delete edge by ID
  const handleDeleteEdge = useCallback((edgeId) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));
  }, []);

  // Trigger edge deletion on click
  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    handleDeleteEdge(edge.id);
  }, [handleDeleteEdge]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) =>
        addEdge({ ...connection, style: { stroke: '#ccc' }, animated: true }, eds)
      ),
    []
  );
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick} // 👈 edge deletion
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
