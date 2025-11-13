import React from 'react';
import { useStore } from '../context/StoreContext';

const Cart = () => {
  const { state, dispatch } = useStore();

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
      {state.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group list-group-flush">
              {state.cart.map(item => (
                <li key={item.id} className="list-group-item d-flex align-items-center">
                  <img src={item.image} alt={item.name} className="me-3" style={{ width: '80px', height: '60px', objectFit: 'cover' }} />
                  <div className="flex-grow-1">
                    <h5>{item.name}</h5>
                                        <p className="mb-1">${item.price}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn btn-danger btn-sm ms-3" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Total: ${total.toFixed(2)}</h5>
                <button className="btn btn-primary btn-lg w-100">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;