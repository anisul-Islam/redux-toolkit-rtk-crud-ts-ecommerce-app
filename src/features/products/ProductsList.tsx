import { useState } from 'react';
import {
  Product,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../app/services/products';
import UpdateProduct from './UpdateProduct';

const ProductsList = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Products List</h2>
      <section className="products">
        {data?.map((product) => (
          <article key={product.id} className="product">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <button onClick={() => setEditingProduct(product)}>Edit</button>
          </article>
        ))}
      </section>

      {editingProduct && (
        <UpdateProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsList;
