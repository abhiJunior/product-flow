import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Product = ({ onSelectProduct }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Optional: to show loading state
  const [error, setError] = useState(null);      // Optional: to catch errors

  const getProductData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setData(response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center my-6">Product List</h1>
      <div className="p-5 bg-gray-100 overflow-y-auto max-h-[80vh]">
        {data.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="bg-white text-black flex w-full px-6 py-4 rounded shadow hover:bg-gray-200 cursor-pointer mb-4 transition"
          >
            <img className="h-32 w-32 object-cover rounded" src={product.thumbnail} alt={product.title} />
            <div className="ml-4 flex flex-col justify-between w-full">
              <h1 className="font-bold text-xl">{product.title}</h1>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-2">
                <h3 className="text-sm font-medium text-gray-500">{product.category}</h3>
                <h2 className="text-lg font-bold text-green-600">₹{product.price}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;



// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const Product = ({onSelectProduct}) => {
//   const [data, setData] = useState([])
//   const getProductdata = async ()=>{
//     const response = await axios.get("https://dummyjson.com/products")
//     setData(response.data.products)
    
//   }
//   useEffect(() => {
//     getProductdata()
//   }, [])
  
//   return (
//     <div className='flex flex-col ' >
//       <h1 className=' text-7xl font-bold  '>Product List</h1>
//       <div className='p-5 mt-5 bg-gray-950'>
//         {data.map(function(elem){
//           return <div key={elem.id} onClick={()=> onSelectProduct(elem)} className='bg-gray-50 text-black  flex  w-full px-7 py-6 rounded mb-3'>
//               <img className='h-40' src={elem.thumbnail} alt="" />
//               <div className='w-full  flex flex-col'>
//                   <h1 className='px-5 font-bold text-2xl '>{elem.title}</h1>
//                   <p className='text-gray-500 text-sm px-5 py-4 '>{elem.description}</p>
//                   <h3 className='px-5 font-bold text-xl text-gray-600'>{elem.category}</h3>
//                   <h2 className='px-5 py-4 font-bold text-2xl '>₹{elem.price}</h2>
//               </div>
              
//           </div>
//         })}
//       </div>
//     </div>
//   )
// }

// export default Product