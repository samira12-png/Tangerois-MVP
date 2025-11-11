import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="col-md-4">
      <div className="card product-card h-100 shadow-sm">
        <img src={product.image} className="card-img-top product-img" alt={product.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-muted mb-1">{product.category}</p>
          <p className="fw-bold text-danger">{product.price} MAD</p>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <Link to={`/products/${product.id}`} className="btn btn-outline-dark btn-sm">Détails</Link>
            <button onClick={() => onAdd(product.id)} className="btn btn-red btn-sm">Ajouter</button>
          </div>
        </div>
      </div>
    </div>
  );
}
