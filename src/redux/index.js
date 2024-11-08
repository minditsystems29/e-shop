
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/redux/slices/productSlice'
import cartReducer from '@/redux/slices/cartSlice';
import { loadState, saveState } from '@/utility/localStorage';

const persistedCart = loadState('cart');

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    
    cart: persistedCart ? { items: persistedCart } : undefined,
  },
});

store.subscribe(() => {
  saveState('cart', store.getState().cart.items);
});
