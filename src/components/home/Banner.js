
"use client";

import Link from "next/link";

const Banner = () => {
  return (
    <section
      id="Hero"
      className="flex flex-col justify-center items-start p-8 md:p-20 mt-16 bg-white text-center md:text-left
        bg-cover bg-center bg-no-repeat 
        bg-[url('/mobile-banner.jpg')] md:bg-[url('/tablet-banner.jpg')] lg:bg-[url('/desktop-banner.jpg')]"
    >
      {/* Mobile View */}
      <h6 className="pb-4 text-lg md:text-xl font-semibold text-gray-600 hidden md:block">
        Time-For-Mega-Savings
      </h6>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 hidden md:block">
        Super Value Deals
      </h2>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#08815f] mt-2 hidden md:block">
        On all Products
      </h1>
      <p className="text-base md:text-lg text-gray-700 mt-4 hidden md:block">
        Save more with coupons & get up to 75% off!
      </p>

      {/* Shop Now Button, Hidden on Mobile */}
      <Link href="/products">
        <button className="bg-[url('/button.png')] bg-transparent text-[#08815f] font-bold text-base border-0 py-3 px-20 md:px-24 mt-6 bg-no-repeat cursor-pointer transition-transform duration-300 hover:scale-105 hidden sm:block">
          Shop Now
        </button>
      </Link>
    </section>
  );
};

export default Banner;
