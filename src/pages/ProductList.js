import React, { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductList() {
  const { state, addToCart } = useContext(StoreContext);
  const q = useQuery();
  const categoryFilter = q.get('category') || '';
  const search = q.get('search') || '';

  const products = useMemo(() => {
    return state.products.filter(p => {
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [state.products, categoryFilter, search]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Nos produits</h1>
      <div className="row g-4">
        {products.length > 0 ? products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        )) : (
          <p className="text-center">Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
}
