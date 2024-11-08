"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons"; // Import the arrow icon
import { toast } from "react-toastify";
import "@/app/globals.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  // Get cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isProductInCart) {
      dispatch(addToCart(product)); // Only add if not already in cart
      toast.dark(`${product.title} added to cart!`); // Show toast notification
    } 
  };

  // Shorten the product description and add ellipsis if it's too long
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  // Render only after the component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white text-gray-800 p-4 rounded-3xl shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105 w-full sm:w-80 lg:w-96 h-auto mx-auto">
      <div className="relative overflow-hidden rounded-2xl h-44">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </Link>
      </div>
      <div className="mt-4">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-lg font-semibold truncate">{product.title}</h2>
          <p className="text-sm text-gray-500 mt-2">
            {truncateDescription(product.description, 60)}
          </p>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <span className="text-grey-600 font-semibold">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-200 via-blue-800 to-blue-400 text-white font-normal px-4 py-2 rounded-full transition-transform duration-300 hover:bg-gradient-to-r hover:from-green-300 hover:via-blue-400 hover:to-blue-500 hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl"
            style={{
              background: "linear-gradient(to right, #a0eac4, #7fd1f7, #57c1eb)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              border: "none",
            }}
          >
            {isProductInCart ? (
              <Link href="/cart">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            ) : (
              <FontAwesomeIcon icon={faShoppingCart} />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="bg-yellow-300 text-yellow-800 px-2 py-1 rounded-full text-xs">
            ⭐ {product.rating.rate}
          </span>
          <span className="text-gray-500 text-xs">
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
