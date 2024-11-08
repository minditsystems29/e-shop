import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],  // Initialize as an empty array
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;  // Ensure payload is an array
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
