import React, { useState } from 'react';
import { useAddProductMutation } from '../../app/services/products';

const AddProduct = () => {
  const [addProduct] = useAddProductMutation();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(product).unwrap();
      setProduct({ title: '', description: '', price: 0 });
    } catch (err) {
      console.error('Failed to save the product: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: parseFloat(e.target.value) })
        }
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
