import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useStore();
  const product = state.products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="container py-5"><p>Product not found.</p></div>;
  }

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (



<div className="container mt-5 pt-5">
  <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '900px', margin: 'auto', background: '#ffffff' }}>
    <div className="row g-0 align-items-center">
      
      {/* Image du cours */}
      <div className="col-md-5 text-center">
       <img src={product.image} alt={product.name} className="img-fluid rounded shadow" />

      </div>

      {/* Contenu du cours */}
      <div className="col-md-7">
        <div className="card-body">
          <h2 className="card-title text-primary fw-bold">{product.name}</h2>
          <p className="mb-1"><strong>Marque:</strong> {product.marque}</p>
          <p className="mb-3"><strong>Price:</strong> ${product.price}</p>
          <p className="card-text text-muted">{product.description}</p>

         <button className="btn btn-primary btn-lg" onClick={addToCart}>Add to Cart</button>

        </div>
      </div>

    </div>
  </div>
</div>










  );
};

export default ProductDetails;