import React, { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { state, addToCart } = useContext(StoreContext);

  // Produits populaires (les 4 premiers)
  const featured = state.products.slice(0, 4);

  // Marques disponibles
  const brandsList = [
    'Samsung',
    'LG',
    'Bosch',
    'Whirlpool',
    'Philips',
    'Sony'
  ];

  // Extraire catégories uniques depuis les produits
  const categories = Array.from(new Set(state.products.map(p => p.category)));

  // States pour filtres
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Gestion checkbox
  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Produits filtrés
  const filteredProducts = useMemo(() => {
    return state.products.filter(p => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      return matchCategory && matchBrand;
    });
  }, [state.products, selectedCategories, selectedBrands]);

  return (
    <div className="container mt-5">

      {/* Hero Section */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-danger mb-3">Bienvenue chez Tangerois</h1>
        <p className="text-muted">Les meilleurs appareils électroménagers aux meilleurs prix.</p>
        <Link to="/products" className="btn btn-red mt-3">Découvrir nos produits</Link>
      </div>

      {/* Filtres sous le header */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="p-3 bg-white rounded shadow-sm">
            <h5 className="text-danger mb-3">Filtrer par catégorie</h5>
            {categories.map(cat => (
              <div className="form-check" key={cat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${cat}`}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <label className="form-check-label" htmlFor={`cat-${cat}`}>
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="p-3 bg-white rounded shadow-sm">
            <h5 className="text-danger mb-3">Filtrer par marque</h5>
            {brandsList.map(brand => (
              <div className="form-check" key={brand}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <label className="form-check-label" htmlFor={`brand-${brand}`}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marques */}
      <h3 className="text-center mb-4">Nos marques</h3>
      <div className="d-flex justify-content-center flex-wrap gap-4 mb-5">
        {brandsList.map((brand, i) => (
          <div key={i} className="brand-card text-center p-3">
            <img
              src={`https://via.placeholder.com/100x50?text=${brand}`}
              alt={brand}
              className="brand-img"
            />
            <p className="mt-2 mb-0 brand-name">{brand}</p>
          </div>
        ))}
      </div>

      {/* Produits populaires / filtrés */}
      <h3 className="text-center mb-4">Produits populaires</h3>
      {filteredProducts.length === 0 ? (
        <p className="text-center">Aucun produit trouvé pour ces filtres.</p>
      ) : (
        <div className="row g-3">
          {filteredProducts.map(p => (
            <div key={p.id} className="col-md-6 col-lg-4">
              <ProductCard product={p} onAdd={addToCart} />
            </div>
          ))}
        </div>
      )}

      {/* Contact */}
      <section className="mt-5 p-4 bg-white rounded shadow-sm text-center">
        <h4 className="text-danger mb-3">Contactez-nous</h4>
        <p><strong>Adresse :</strong> Avenue Moulay Ismail, Tanger, Maroc</p>
        <p><strong>Téléphone :</strong> +212 5 39 33 44 55</p>
        <p><strong>Email :</strong> contact@tangerois.ma</p>
        <div className="mt-3">
          <Link to="/products" className="btn btn-red">Voir nos offres</Link>
        </div>
      </section>
    </div>
  );
}
