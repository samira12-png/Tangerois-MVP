import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { state } = useStore();
  const featuredProducts = state.products.slice(0, 4); // Show first 4 as featured

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col">
          <div className="card hero text-center bg-primary text-white border-0 shadow">
            <div className="card-body">
              <h1 className="card-title display-4">Welcome to Tangerois</h1>
              <p className="card-text lead">Discover the latest in electronics and gadgets.</p>
              <Link to="/products">
                <button className="btn btn-light btn-lg">Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-3 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;