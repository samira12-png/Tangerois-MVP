import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductForm from '../components/ProductForm';

const AdminPanel = () => {
  const { state, dispatch } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h2>Admin Panel</h2>
          <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-hover table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductForm show={showForm} onHide={() => setShowForm(false)} product={editingProduct} />
    </div>
  );
};

export default AdminPanel;