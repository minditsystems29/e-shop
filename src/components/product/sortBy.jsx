import { useState } from "react";

const SortBy = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState("popularity");

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSortChange(selectedValue);
  };

  return (
    <div className="flex justify-end items-center">
      <div className="relative">
        <select
          value={selectedOption}
          onChange={handleSortChange}
          className="appearance-none bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 text-sm shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          <option className="bg-white text-black hover:bg-blue-100" value="popularity">
            Sort by: Popularity
          </option>
          <option className="bg-white text-black hover:bg-blue-100" value="priceLowToHigh">
            Price: Low to High
          </option>
          <option className="bg-white text-black hover:bg-blue-100" value="priceHighToLow">
            Price: High to Low
          </option>
          <option className="bg-white text-black hover:bg-blue-100" value="aToZ">
            Sort: A to Z
          </option>
          <option className="bg-white text-black hover:bg-blue-100" value="zToA">
            Sort: Z to A
          </option>
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortBy;
