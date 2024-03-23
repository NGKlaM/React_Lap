import React, { useEffect} from 'react'
import { useProductContext } from '../Context/ProductContext';

type Props = {}

const ProductList = (props: Props) => {
    const { state, dispatch } = useProductContext();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {state.products.map(product => (
          <li key={product.id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-auto" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
              <p className="text-gray-700">Category: {product.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default ProductList