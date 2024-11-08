
import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data; // Ensure this returns an array
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data; // Ensure this returns the product object
};



const BASE_API_URL = "https://fakestoreapi.com/products/category";



export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_API_URL}/${category}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }

  const data = await response.json();
  return data; // This will return products under the specified category
};
