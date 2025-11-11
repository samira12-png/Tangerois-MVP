import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';

export default function AdminPanel() {
  const { state, addProduct, updateProduct, deleteProduct } = useContext(StoreContext);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (product) => {
    addProduct(product);
    setShowForm(false);
  };

  const handleUpdate = (product) => {
    updateProduct(product);
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="container py-5 admin-panel">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-danger mb-3">🧰 Admin Panel</h1>
        <p className="text-muted">Gérez vos produits facilement.</p>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={() => { setEditing(null); setShowForm(s => !s); }}
          className="btn btn-danger px-4 py-2"
        >
          {showForm ? '✖ Fermer' : '➕ Ajouter un produit'}
        </button>
      </div>

      {showForm && (
        <div className="card p-4 mb-5 form-card mx-auto" style={{ maxWidth: '600px' }}>
          <ProductForm initial={editing} onSubmit={editing ? handleUpdate : handleAdd} />
        </div>
      )}

      <div className="row gy-3">
        {state.products.map(p => (
          <div key={p.id} className="col-md-6 col-lg-4">
            <div className="card product-card shadow-sm border-0">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fw-semibold text-dark">{p.name}</h5>
                  <p className="card-text text-muted small mb-2">{p.category}</p>
                  <p className="fw-bold text-danger">{p.price} MAD</p>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <button onClick={() => { setEditing(p); setShowForm(true); }} className="btn btn-outline-primary btn-sm w-50 me-2">✏️ Modifier</button>
                  <button onClick={() => { if(window.confirm('Supprimer ce produit ?')) deleteProduct(p.id); }} className="btn btn-outline-danger btn-sm w-50">🗑️ Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
