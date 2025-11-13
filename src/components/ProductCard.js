import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { dispatch } = useStore();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="card h-100 product-card">
      <img className="card-img-top" src={product.image} alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product.name}</h5>
        <p className="card-text text-muted">{product.marque}</p>
        <p className="card-text fw-bold text-primary">${product.price}</p>
        <div className="mt-auto">
          <button className="btn btn-primary me-2" onClick={addToCart}>Add to Cart</button>
          <Link to={`/products/${product.id}`}>
            <button className="btn btn-outline-secondary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;