import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

const Filter = () => {
  const { state, dispatch } = useStore();
  const [filters, setFilters] = useState(state.filters);

  useEffect(() => {
    setFilters(state.filters);
  }, [state.filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearFilters = () => {
    const cleared = { category: '', minPrice: '', maxPrice: '' };
    setFilters(cleared);
    dispatch({ type: 'SET_FILTERS', payload: cleared });
  };

  const categories = [...new Set(state.products.map(p => p.category))];

  return (
    <div className="bg-light p-3 rounded mb-4">
      <h5>Filters</h5>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={filters.category} onChange={handleChange}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">Min Price</label>
            <input type="number" className="form-control" name="minPrice" value={filters.minPrice} onChange={handleChange} placeholder="0" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <label className="form-label">Max Price</label>
            <input type="number" className="form-control" name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="10000" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={applyFilters}>Apply Filters</button>
        <button className="btn btn-secondary" onClick={clearFilters}>Clear Filters</button>
      </div>
    </div>
  );
};

export default Filter;