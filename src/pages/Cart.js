import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

export default function Cart() {
  const { state, updateCartQuantity, removeFromCart, clearCart } = useContext(StoreContext);
  const subtotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Panier</h1>
      {state.cart.length === 0 ? (
        <div className="text-center">
          <p>Ton panier est vide.</p>
          <Link to="/products" className="btn btn-red">Voir les produits</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map(item => (
                <tr key={item.productId}>
                  <td>{item.product.name}</td>
                  <td>{item.product.price} MAD</td>
                  <td>
                    <input type="number" min="1" value={item.quantity}
                      onChange={(e) => updateCartQuantity(item.productId, Number(e.target.value))}
                      className="form-control" style={{width: '80px'}} />
                  </td>
                  <td>{item.product.price * item.quantity} MAD</td>
                  <td>
                    <button onClick={() => removeFromCart(item.productId)} className="btn btn-outline-danger btn-sm">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
            <p className="fw-bold mb-0">Sous-total: {subtotal} MAD</p>
            <button onClick={clearCart} className="btn btn-outline-danger">Vider le panier</button>
            <button className="btn btn-red">Passer commande</button>
          </div>
        </div>
      )}
    </div>
  );
}
