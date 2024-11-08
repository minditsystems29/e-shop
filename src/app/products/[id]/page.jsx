
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faArrowRight,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { fetchProductById } from "@/services/productService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice"; // Import your addToCart action
import { toast } from "react-toastify"; // Import toast for notifications
import "@/app/globals.css";
import Link from "next/link";
import Head from "next/head";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch(); // Initialize dispatch
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [magnifierStyle, setMagnifierStyle] = useState({ display: "none" });
  const [isPincodeValid, setIsPincodeValid] = useState(false); // Pincode validation state
  const [deliveryMessage, setDeliveryMessage] = useState("");

  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux state

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    // Load quantity from localStorage when the product ID changes
    const storedQuantities =
      JSON.parse(localStorage.getItem("quantities")) || {};
    const storedQuantity = storedQuantities[id] || 1; // Default to 1 if no quantity is set
    setQuantity(storedQuantity);
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, e.target.value); // Ensures quantity stays >= 1
    setQuantity(value);
    // Load current quantities from localStorage
    const storedQuantities =
      JSON.parse(localStorage.getItem("quantities")) || {};
    // Update the specific product's quantity
    storedQuantities[id] = value;
    // Save the updated quantities object back to localStorage
    localStorage.setItem("quantities", JSON.stringify(storedQuantities));
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleCheckPincode = () => {
    // Validate if the pincode is a valid Indian pincode (6 digits)
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (pinRegex.test(pincode)) {
      setIsPincodeValid(true);
      setDeliveryMessage("Delivered within 4-5 days");
    } else {
      setIsPincodeValid(false);
      setDeliveryMessage(
        "Invalid pincode. Please enter a valid 6-digit Indian pincode."
      );
    }
  };

  const handleMouseEnter = (e) => {
    const magnifier = document.getElementById("magnifier");
    const zoomedImage = document.getElementById("zoomed-image");
    magnifier.style.display = "block"; // Show magnifier
    zoomedImage.style.display = "block"; // Show zoomed image
    updateMagnifier(e);
  };

  const handleMouseLeave = () => {
    const magnifier = document.getElementById("magnifier");
    const zoomedImage = document.getElementById("zoomed-image");
    magnifier.style.display = "none"; // Hide magnifier
    zoomedImage.style.display = "none"; // Hide zoomed image
  };

  const updateMagnifier = (e) => {
    const magnifier = document.getElementById("magnifier");
    const zoomedImage = document.getElementById("zoomed-image");
    const img = e.target;

    const imgRect = img.getBoundingClientRect();
    const x = e.clientX - imgRect.left; // Get x position within the image
    const y = e.clientY - imgRect.top; // Get y position within the image

    magnifier.style.left = `${e.clientX}px`;
    magnifier.style.top = `${e.clientY}px`;

    // Update the position and background position of the zoomed image
    zoomedImage.style.left = `${x}px`;
    zoomedImage.style.top = `${y}px`;
    zoomedImage.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
  };

  const handleAddToCart = () => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    const storedQuantities =
      JSON.parse(localStorage.getItem("quantities")) || {};
    const quantityToAdd = storedQuantities[id] || quantity; // Use the stored quantity

    if (!isProductInCart) {
      dispatch(addToCart({ ...product, quantity: quantityToAdd })); // Add product with quantity
      toast.dark(`${product.title} added to cart!`); // Show toast notification
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  // Check if the product belongs to clothing categories
  const isClothing = product.category.includes("clothing");

  return (
    <>
    <Head>
        <title>{product.title} - Shop Now</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.title}, ${product.category}, Buy ${product.title}`} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={window.location.href} />
      </Head>
    <div className="product-container">
      <div
        className="image-section image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={updateMagnifier}
      >
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg object-cover"
        />
        <div id="magnifier" className="magnifier"></div>
        <div
          id="zoomed-image"
          className="zoomed-image"
          style={{
            backgroundImage: `url(${product.image})`,
            width: "200px", // Adjust zoomed image size as necessary
            height: "200px", // Adjust zoomed image size as necessary
            display: "none", // Initially hidden
            backgroundSize: "200%", // Adjust for zoom level
          }}
        ></div>
      </div>
      <div className="description-section">
        <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
        <p className="text-lg text-muted-foreground">{product.category}</p>
        <p className="text-xl font-semibold text-primary">$ {product.price}</p>
        <p className="text-sm text-muted-foreground">MRP Incl. of all taxes</p>

        {isClothing && (
          <>
            <label className="block mt-4 text-muted-foreground">
              Please select a size:
            </label>
            <select
              className="mt-2 p-2 border border-border rounded-md"
              aria-label="Select size"
            >
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
              <option>XXXL</option>
            </select>
          </>
        )}

        <label className="block mt-4 text-muted-foreground">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="mt-2 p-2 border border-border rounded-md w-16"
          aria-label="Select quantity"
        />

        <div className="mt-4 flex items-center">
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-green-200 via-blue-800 to-blue-400 text-white font-normal px-4 py-2 rounded-full transition-transform duration-300 hover:bg-gradient-to-r hover:from-green-300 hover:via-blue-400 hover:to-blue-500 hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl"
            style={{
              background:
                "linear-gradient(to right, #a0eac4, #7fd1f7, #57c1eb)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              border: "none",
            }}
          >
            {cartItems.some((item) => item.id === product.id) ? (
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

        <div className="mt-6 flex">
          <input
            type="text"
            value={pincode}
            onChange={handlePincodeChange}
            placeholder="Enter Pincode"
            className="mt-2 p-2 border border-border rounded-md w-40"
          />
          <button
            onClick={handleCheckPincode}
            className="ml-2 bg-primary text-white rounded-md px-4 py-2"
          >
            Check
          </button>
        </div>

        <div className="mt-2">
          {isPincodeValid ? (
            <div className="flex items-center text-green-600">
              <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
              <span>{deliveryMessage}</span>
            </div>
          ) : (
            <p className="text-red-600">{deliveryMessage}</p>
          )}
        </div>

        <h2 className="mt-6 font-semibold text-lg">Product Description</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
    </div>
    </>
  );
}









