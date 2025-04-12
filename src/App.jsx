import React, { useState } from 'react';
import Product from './components/Product';
import FlowEditor from './components/FlowEditor';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Product List Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto">
        <Product onSelectProduct={setSelectedProduct} />
      </div>

      {/* Flow Area */}
      <div className="w-2/3">
        <FlowEditor selectedProduct={selectedProduct} />
      </div>
    </div>
  );
};

export default App;
