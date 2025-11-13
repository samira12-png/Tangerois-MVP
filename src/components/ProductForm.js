import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

const ProductForm = ({ show, onHide, product }) => {
  const { dispatch } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    marque: '',
    description: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        image: '',
        marque: '',
        description: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      dispatch({ type: 'EDIT_PRODUCT', payload: { ...formData, id: product.id } });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: formData });
    }
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product ? 'Edit Product' : 'Add Product'}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input type="url" className="form-control" name="image" value={formData.image} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Marque</label>
                <input type="text" className="form-control" name="marque" value={formData.marque} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {product ? 'Update' : 'Add'} Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;