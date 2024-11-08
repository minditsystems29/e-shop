

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateCart } from "@/redux/slices/cartSlice";
import "@/app/globals.css";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isClient, setIsClient] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("Standard Delivery - $5.00");

  // Handle client-side rendering and update cart from localStorage
  useEffect(() => {
    setIsClient(true);

    // If cartItems are empty, load from localStorage
    if (cartItems.length === 0) {
      const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      storedCartItems.forEach((item) => {
        dispatch(addToCart(item));
      });
    }

    // Load quantities from localStorage
    const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || {};
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.id] = storedQuantities[item.id] || 1; // Use stored quantity or default to 1
      return acc;
    }, {});
    setQuantities(initialQuantities);
    updateCartTotals(cartItems, initialQuantities); // Update totals
  }, [dispatch, cartItems]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(cartItems)); // Update localStorage on cart change
      localStorage.setItem("quantities", JSON.stringify(quantities)); // Save quantities to localStorage
      updateCartTotals(cartItems, quantities); // Recalculate totals when cart updates
    }
  }, [cartItems, isClient, quantities]); // Add quantities to dependencies

  const handleShippingChange = (event) => {
    const selectedShipping = event.target.value;
    setShippingMethod(selectedShipping);
    const cost = selectedShipping.includes("Fast Delivery") ? 10 : 5;
    setShippingCost(cost);
  };

  const totalPrice = subtotal + shippingCost;

  const removeItem = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const increaseQuantity = (itemId) => {
    const newQuantity = (quantities[itemId] || 1) + 1; // Increase quantity
    setQuantities({ ...quantities, [itemId]: newQuantity });
    updateCartTotals(cartItems, { ...quantities, [itemId]: newQuantity });
  };

  const decreaseQuantity = (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1; // Decrease quantity
      setQuantities({ ...quantities, [itemId]: newQuantity });
      updateCartTotals(cartItems, { ...quantities, [itemId]: newQuantity });
    }
  };

  const updateCartTotals = (updatedCartItems, updatedQuantities) => {
    const newSubtotal = updatedCartItems.reduce(
      (acc, item) => acc + item.price * (updatedQuantities[item.id] || 1), // Default quantity is 1
      0
    );
    setSubtotal(newSubtotal);
    setTotalItems(
      Object.values(updatedQuantities).reduce((acc, quantity) => acc + quantity, 0)
    );
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 text-gray-800 p-8 rounded-lg shadow-lg">
      <div className="w-full md:w-2/3 pr-4">
        <h2 className="text-3xl font-bold mb-6">Your Shopping Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white rounded-lg shadow-md p-4"
            >
              <Link href={`/products/${item.id}`} passHref>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4 cursor-pointer" // Added cursor pointer to indicate it's clickable
                />
              </Link>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <span className="text-gray-500">
                  Price: ${item.price.toFixed(2)}
                </span>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                    disabled={(quantities[item.id] || 1) <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{quantities[item.id] || 1}</span>{" "}
                  {/* Display current quantity */}
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <span className="ml-4 text-lg font-bold">
                  ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  aria-label="Remove item"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/products"
          className="text-blue-600 hover:underline transition duration-200 ease-in-out transform hover:scale-105 mt-4 inline-block"
        >
          ← Back to shop
        </Link>
      </div>

      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md mt-6 md:mt-0">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <select
            value={shippingMethod}
            onChange={handleShippingChange}
            className="bg-gray-100 text-gray-700 rounded p-1 transition duration-200 ease-in-out focus:ring focus:ring-primary"
          >
            <option>Standard Delivery - $5.00</option>
            <option>Fast Delivery - $10.00</option>
          </select>
        </div>
        <div className="flex justify-between font-bold mb-4 border-t pt-2">
          <span>Total Price:</span>
          <span>$ {totalPrice.toFixed(2)}</span>
        </div>
        <Link
          href="/payment"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-blue-700 transition duration-200"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}



