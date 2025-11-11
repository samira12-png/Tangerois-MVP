export default function reducer(state, action) {
  switch(action.type) {
    case 'ADD_TO_CART':
      const exists = state.cart.find(i => i.productId === action.payload);
      if(exists) {
        return {
          ...state,
          cart: state.cart.map(i => i.productId === action.payload ? {...i, quantity: i.quantity + 1} : i)
        };
      }
      const product = state.products.find(p => p.id === action.payload);
      return { ...state, cart: [...state.cart, { productId: product.id, product, quantity: 1 }] };

    case 'UPDATE_CART':
      return {
        ...state,
        cart: state.cart.map(i => i.productId === action.payload.id ? {...i, quantity: action.payload.quantity} : i)
      };

    case 'REMOVE_CART':
      return { ...state, cart: state.cart.filter(i => i.productId !== action.payload) };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };

    case 'UPDATE_PRODUCT':
      return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };

    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };

    default:
      return state;
  }
}
