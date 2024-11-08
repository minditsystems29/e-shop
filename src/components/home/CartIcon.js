"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "@/redux/slices/cartSlice";
import Link from "next/link";

const CartIcon = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      storedCart.forEach((item) => dispatch(addToCart(item)));
    }
  }, [dispatch]);

  const displayedCount = isMounted ? items.length : 0;

  return (
    <Link href="/cart" className="relative flex items-center">
      {isMounted && (
        <span className="text-xl sm:text-lg md:text-xl">
          <FontAwesomeIcon icon={faCartShopping} />
        </span>
      )}
      {displayedCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 sm:px-1 sm:text-[10px] md:text-xs md:px-2 py-0.5 shadow-lg">
          {displayedCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;


