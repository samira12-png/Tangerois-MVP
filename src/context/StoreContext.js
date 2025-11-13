import React, { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/reducer';
import productsData from '../data/products.json';

const StoreContext = createContext();

const initialState = {
  products: [],
  filteredProducts: [],
  cart: [],
  searchQuery: '',
  filters: { category: '', minPrice: '', maxPrice: '' },
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: productsData });
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);