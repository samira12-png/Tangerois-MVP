import React, { createContext, useReducer } from 'react';
import productsData from '../data/products.json';
import reducer from '../reducers/reducer';

const initialState = {
  products: productsData,
  cart: []
};

export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id) => {
    dispatch({ type: 'ADD_TO_CART', payload: id });
  };

  const updateCartQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_CART', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  return (
    <StoreContext.Provider value={{
      state,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
}
