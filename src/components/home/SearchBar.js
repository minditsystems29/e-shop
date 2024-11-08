
"use client";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        className="p-2 pl-4 rounded-l-full w-64 focus:outline-none text-black bg-white focus:ring-0 transition-all duration-300 ease-in-out"
        placeholder="Search products..."
      />
      <button
        onClick={handleSearchClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-full transition-all duration-300 ease-in-out hover:shadow-md"
      >
       <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
