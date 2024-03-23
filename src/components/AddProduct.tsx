import React, { useState } from 'react'
import Product from '../types';
import { useProductContext } from '../Context/ProductContext';

type Props = {}

const AddProduct = (props: Props) => {
    const { dispatch } = useProductContext();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: Product = {
      id: Math.floor(Math.random() * 1000),
      name,
      image,
      description,
      price: parseFloat(price),
      category,
    };
    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'ADD_PRODUCT', payload: data });
        // Reset form fields after successfully adding product
        setName('');
        setImage('');
        setDescription('');
        setPrice('');
        setCategory('');
      })
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">Name:</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="image">Image URL:</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="text" id="image" value={image} onChange={e => setImage(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">Description:</label>
          <textarea className="w-full px-3 py-2 border rounded-lg" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="price">Price:</label>
          <input className="w-full px-3 py-2 border rounded-lg" type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="category">Category:</label>
          <select className="w-full px-3 py-2 border rounded-lg" id="category" value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="">Select category</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Mouse">Mouse</option>
            <option value="Headset">Headset</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" type="submit">Add Product</button>
      </form>
    </div>

  )
}

export default AddProduct