import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

export default function ProductDetails() {
  const { state, addToCart } = useContext(StoreContext);
  const { id } = useParams();
  const product = state.products.find(p => p.id === parseInt(id));

  if (!product) return <p className="text-center mt-5">Produit non trouvé.</p>;

  return (
    <div className="container mt-5">
      <div className="card product-card-horizontal mx-auto shadow-sm" style={{ maxWidth: '800px' }}>
        <div className="row g-0">
          <div className="col-md-5">
            <img src={product.image} alt={product.name} className="img-fluid product-img" />
          </div>
          <div className="col-md-7 p-4 d-flex flex-column justify-content-between">
            <div>
              <h3 className="fw-bold">{product.name}</h3>
              <p className="text-muted mb-1">{product.category}</p>
              <p className="card-price text-danger">{product.price} MAD</p>
              <p>{product.description}</p>
            </div>
            <div>
              <button onClick={() => addToCart(product.id)} className="btn btn-red mt-3 w-100">Ajouter au panier</button>
              <Link to="/products" className="btn btn-outline-dark mt-2 w-100">Retour aux produits</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
