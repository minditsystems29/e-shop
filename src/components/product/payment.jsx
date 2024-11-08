"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux"; // Import useDispatch
import { clearCart } from "@/redux/slices/cartSlice"; // Adjust the path to your cart slice
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

export default function Widget() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch

  const validateCardNumber = (number) => {
    const sanitizedNumber = number.replace(/\D/g, ""); // Remove non-digit characters
    const isValid = /^[0-9]{16}$/.test(sanitizedNumber);
    setErrors((prev) => ({
      ...prev,
      cardNumber: isValid ? "" : "Card number must be 16 digits.",
    }));
    return isValid;
  };

  const validateExpiry = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format with valid month
    const isValid = regex.test(date);
    setErrors((prev) => ({
      ...prev,
      expiry: isValid ? "" : "Expiry date must be in MM/YY format.",
    }));
    return isValid;
  };

  const validateCvv = (code) => {
    const isValid = /^[0-9]{3}$/.test(code); // Only 3 digits allowed
    setErrors((prev) => ({
      ...prev,
      cvv: isValid ? "" : "CVV must be 3 digits.",
    }));
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCardNumberValid = validateCardNumber(cardNumber);
    const isExpiryValid = validateExpiry(expiry);
    const isCvvValid = validateCvv(cvv);

    if (isCardNumberValid && isExpiryValid && isCvvValid) {
      // Simulate payment processing
      toast.success("Your order has been placed successfully!", {
        onClose: () => {
          // Clear cart in Redux store
          dispatch(clearCart());
          // Clear local storage
          localStorage.removeItem("cart"); // Assuming your cart is stored under "cart"
          router.push("/products"); // Navigate to /products after toast closes
        },
        autoClose: 3000, // Close the toast automatically after 3 seconds
      });
    } else {
      console.log("Validation failed");
    }
  };

  const handleCopyCardDetails = () => {
    setCardNumber("1234567812345678");
    setExpiry("12/24");
    setCvv("123");
  };

  return (
    <div className="bg-background text-primary-foreground min-h-screen flex flex-row items-center justify-center space-y-8">
      <ToastContainer />

      {/* Card Details for Testing */}
      <div className="max-w-md w-full bg-card shadow-md rounded-lg overflow-hidden border border-muted p-4">
        <h3 className="text-lg font-semibold text-muted-foreground">Test Card Details</h3>
        <p className="text-sm text-muted-foreground">Card Number: 1234 5678 1234 5678</p>
        <p className="text-sm text-muted-foreground">Expiry Date: 12/24</p>
        <p className="text-sm text-muted-foreground">CVV: 123</p>
        <button
          onClick={handleCopyCardDetails}
          className="mt-4 bg-accent hover:bg-accent/80 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ease-in-out shadow-md"
        >
          Copy Card Details
        </button>
      </div>

      {/* Payment Form */}
      <div className="max-w-md w-full bg-card shadow-xl rounded-lg overflow-hidden border border-muted">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 py-4 px-6">
          <h2 className="text-3xl font-bold text-white">Make a Payment</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Card Number Input */}
          <label htmlFor="card-number" className="block text-sm font-medium text-muted-foreground">
            Card Number
          </label>
          <input
            id="card-number"
            type="text"
            value={cardNumber}
            onChange={(e) => {
              const sanitizedValue = e.target.value.replace(/\D/g, "");
              setCardNumber(sanitizedValue);
            }}
            onBlur={() => validateCardNumber(cardNumber)}
            maxLength="16"
            className="mt-1 text-slate-700 block w-full px-4 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring focus:ring-accent transition duration-200 ease-in-out hover:border-accent"
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

          {/* Expiry Date Input */}
          <label htmlFor="expiry" className="block text-sm font-medium text-muted-foreground">
            Expiry Date
          </label>
          <input
            id="expiry"
            type="text"
            value={expiry}
            onChange={(e) => {
              const sanitizedValue = e.target.value.replace(/[^0-9/]/g, "");
              if (sanitizedValue.length <= 5) {
                setExpiry(sanitizedValue);
              }
            }}
            onBlur={() => validateExpiry(expiry)}
            maxLength="5"
            className="mt-1 text-slate-700 block w-full px-4 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring focus:ring-accent transition duration-200 ease-in-out hover:border-accent"
            placeholder="MM/YY"
          />
          {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}

          {/* CVV Input */}
          <label htmlFor="cvv" className="block text-sm font-medium text-muted-foreground">
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => {
              const sanitizedValue = e.target.value.replace(/\D/g, "");
              if (sanitizedValue.length <= 3) {
                setCvv(sanitizedValue);
              }
            }}
            onBlur={() => validateCvv(cvv)}
            maxLength="3"
            className="mt-1 text-slate-700 block w-full px-4 py-2 border border-input rounded-md shadow-sm focus:outline-none focus:ring focus:ring-accent transition duration-200 ease-in-out hover:border-accent"
            placeholder="123"
          />
          {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-accent hover:bg-accent/80 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ease-in-out shadow-lg transform hover:scale-105"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
