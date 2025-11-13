import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

const ProductList = () => {
  const { state } = useStore();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-3">
          <Filter />
        </div>
        <div className="col-md-9">
          <h2 className="mb-4">All Products</h2>
          <div className="row">
            {state.filteredProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {state.filteredProducts.length === 0 && (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;