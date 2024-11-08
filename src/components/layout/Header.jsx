"use client";

import Link from "next/link";
import CartIcon from "../home/CartIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-gradient-to-r from-[#c1e1c5] via-[#a8d8b9] to-[#c1e1c5] text-gray-800 shadow-lg sm:p-2 md:p-4">
      {/* Logo Section */}
      <Link href="/">
        <h1 className="text-2xl sm:text-xl md:text-3xl font-extrabold text-gray-800 hover:text-green-600 transition-colors">
          E-Shopify
        </h1>
      </Link>
      {/* Right Section (Profile, Wishlist, Cart Icons) */}
      <div className="flex items-center space-x-4 sm:space-x-2 md:space-x-6">
        {/* Profile Icon */}
        {isMounted && (
          <div className="flex flex-col items-center text-sm sm:text-xs md:text-base">
            <span className="text-xl">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
        )}
        {/* Wishlist Icon */}

        {/* Cart Icon */}
        <div className="flex flex-col items-center">
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
