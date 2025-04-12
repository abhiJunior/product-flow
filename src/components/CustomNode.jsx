import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data, id }) => {
  return (
    <div className="bg-white border shadow-md rounded p-4 text-sm w-60 relative">
      {/* Handle to connect edges */}
      <Handle type="target" position="top" />

      {/* Product Info */}
      <div className="font-bold text-md">{data.title}</div> {/* Display product title */}
      <div className="text-gray-600 text-sm">₹{data.price}</div> {/* Display product price */}

      {/* ❌ Delete button */}
      <button
        className="absolute top-1 right-2 text-red-500 text-lg"
        onClick={() => data.deleteNode(id)} // Call delete function on click
      >
        ✖
      </button>

      {/* Handle to connect edges */}
      <Handle type="source" position="bottom" />
    </div>
  );
};

export default CustomNode;
