import React, { useState } from 'react';

import { Product, useUpdateProductMutation } from '../../app/services/products';

type UpdateProductProps = {
  product: Product;
  onClose: () => void;
};

const UpdateProduct = ({ product, onClose }: UpdateProductProps) => {
  const [updateProduct, { data, error, isLoading }] =
    useUpdateProductMutation();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct({ id: product.id, updatedProduct: updatedProduct });
      onClose();
    } catch (err) {
      console.error('Failed to update the product: ', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Product</h2>
      <input
        type="text"
        placeholder="Title"
        value={updatedProduct.title}
        onChange={(e) =>
          setUpdatedProduct({ ...updatedProduct, title: e.target.value })
        }
      />
      <textarea
        placeholder="Description"
        value={updatedProduct.description}
        onChange={(e) =>
          setUpdatedProduct({ ...updatedProduct, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={updatedProduct.price}
        onChange={(e) =>
          setUpdatedProduct({
            ...updatedProduct,
            price: parseFloat(e.target.value),
          })
        }
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default UpdateProduct;
