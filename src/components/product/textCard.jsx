"use client"
import { useState } from "react";
import "@/app/globals.css"

export default function TestCard() {
  const [cardDetails] = useState({
    cardNumber: "4111 1111 1111 1111", // Example Visa card number
    expiry: "12/24",
    cvv: "123",
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 border border-muted">
      <h2 className="text-xl font-bold mb-4">Test Card Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Card Number</label>
          <button
            onClick={() => copyToClipboard(cardDetails.cardNumber)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Copy
          </button>
        </div>
        <input
          type="text"
          value={cardDetails.cardNumber}
          readOnly
          className="bg-gray-100 text-slate-700 block w-full px-4 py-2 border border-input rounded-md"
        />

        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Expiry Date</label>
          <button
            onClick={() => copyToClipboard(cardDetails.expiry)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Copy
          </button>
        </div>
        <input
          type="text"
          value={cardDetails.expiry}
          readOnly
          className="bg-gray-100 text-slate-700 block w-full px-4 py-2 border border-input rounded-md"
        />

        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">CVV</label>
          <button
            onClick={() => copyToClipboard(cardDetails.cvv)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Copy
          </button>
        </div>
        <input
          type="text"
          value={cardDetails.cvv}
          readOnly
          className="bg-gray-100 text-slate-700 block w-full px-4 py-2 border border-input rounded-md"
        />
      </div>
    </div>
  );
}
