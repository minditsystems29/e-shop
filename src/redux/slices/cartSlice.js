import { createSlice } from "@reduxjs/toolkit";
import { saveState } from "@/utility/localStorage";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveState('cart', state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      saveState('cart', state.items);
    },
    updateCart: (state, action) => {
      state.items = action.payload; // This updates the cart with the new items array
      saveState('cart', state.items); // Save updated cart to local storage
    },
    clearCart: (state) => {
      state.items = [];
      saveState('cart', state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;


