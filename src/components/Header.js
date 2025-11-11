import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

export default function Header() {
  const { state } = useContext(StoreContext);
  const totalItems = state.cart.reduce((s, i) => s + i.quantity, 0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: '#c62828' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={""} alt="Tangerois" height="40" className="me-2" />
          <span className="fw-bold">Tangerois</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Produits</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
          </ul>

          {/* Champ de recherche */}
          <form className="d-flex ms-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 220 }}
            />
            <button className="btn btn-light" type="submit">🔍</button>
          </form>

          {/* Panier */}
          <Link to="/cart" className="btn btn-light ms-3 position-relative">
            🛒
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
