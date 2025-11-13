const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
        filteredProducts: state.products.filter(product =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case 'SET_FILTERS':
      const { category, minPrice, maxPrice } = action.payload;
      let filtered = state.products.filter(product => {
        const matchesCategory = !category || product.category === category;
        const matchesPrice = (!minPrice || product.price >= minPrice) &&
                             (!maxPrice || product.price <= maxPrice);
        return matchesCategory && matchesPrice;
      });
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      return {
        ...state,
        filters: action.payload,
        filteredProducts: filtered,
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'ADD_PRODUCT':
      const newProduct = { ...action.payload, id: Date.now() };
      return {
        ...state,
        products: [...state.products, newProduct],
        filteredProducts: [...state.filteredProducts, newProduct],
      };
    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        filteredProducts: state.filteredProducts.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        filteredProducts: state.filteredProducts.filter(product => product.id !== action.payload),
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;