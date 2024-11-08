
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "@/services/productService";
import ProductCard from "@/components/product/productCard";
import SortBy from "@/components/product/SortBy";
import SearchBar from "@/components/home/SearchBar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/app/globals.css";
import Head from "next/head";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [sortOption, setSortOption] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(""); // Track selected category
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [isLoading, setIsLoading] = useState(false);

  // Function to load products (with or without category)
  const loadProducts = async (selectedCategory = "") => {
    setIsLoading(true);
    setCategory(selectedCategory); // Update category state
    let fetchedProducts;

    if (selectedCategory) {
      // Fetch products by category
      fetchedProducts = await fetchProductsByCategory(selectedCategory);
    } else {
      // Fetch all products if no category is selected
      fetchedProducts = await fetchProducts();
    }

    dispatch(setProducts(fetchedProducts));
    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts(category); // Load products based on category change
  }, [category]);


    // Update page title when component is mounted or search/category changes
  useEffect(() => {
    const pageTitle = searchTerm
      ? `Search results for "${searchTerm}" - Best Deals`
      : category
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Best Deals`
      : "Home - Best Deals on Electronics, Clothing, and More";
    document.title = pageTitle; // Update browser title dynamically
  }, [category, searchTerm]);

  // Handle category change
  const handleCategoryClick = (selectedCategory) => {
    setSearchTerm(""); // Clear search when a category is clicked
    setCurrentPage(1); // Reset pagination
    loadProducts(selectedCategory); // Fetch new data from API
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getFilteredProducts = () => {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getSortedProducts = (filteredProducts) => {
    const sortedProducts = [...filteredProducts];
    switch (sortOption) {
      case "priceLowToHigh":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "aToZ":
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      case "zToA":
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      case "popularity":
      default:
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  };

  const filteredProducts = getFilteredProducts();
  const sortedProducts = getSortedProducts(filteredProducts);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Custom pagination component
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          &lt;
        </button>
        {pageNumbers.map((number) => {
          if (
            number === 1 ||
            number === totalPages ||
            (number >= currentPage - 1 && number <= currentPage + 1)
          ) {
            return (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded ${
                  number === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            );
          } else if (number === currentPage - 2 || number === currentPage + 2) {
            return <span key={number}>...</span>;
          }
          return null;
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200"
          }`}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <>
    
    <Head>
         <meta
          name="description"
          content="Discover the best deals on products across categories like electronics, jewelry, and clothing. Shop now to get great discounts and offers."
        />
        <meta name="keywords" content="electronics, jewelry, clothing, discounts, best deals" />
        <meta name="author" content="Your Company Name" />
        <meta property="og:title" content="Best Deals - Home" />
        <meta
          property="og:description"
          content="Find amazing discounts on products across various categories. Shop electronics, jewelry, and clothing at unbeatable prices."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://www.yourwebsite.com" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header />
      <div className="pt-28 px-4 pb-16 min-h-screen">
        {/* Search and Sort Bar - fixed to the top */}
        <div className="fixed top-16 left-0 right-0 z-40 flex flex-wrap justify-between items-center bg-white px-6 py-4 shadow-md">
          {/* Navigation Bar on the left - visible only on medium screens and larger */}
          <nav className="hidden md:flex flex-wrap space-x-4 mb-4 sm:mb-0">
            <button
              onClick={() => handleCategoryClick("")} // For all products
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
            >
              All Products
            </button>
            <button
              onClick={() => handleCategoryClick("electronics")}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
            >
              Electronics
            </button>
            <button
              onClick={() => handleCategoryClick("jewelery")}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
            >
              Jewellery
            </button>
            <button
              onClick={() => handleCategoryClick("men's clothing")}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
            >
              Men's Clothing
            </button>
            <button
              onClick={() => handleCategoryClick("women's clothing")}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
            >
              Women's Clothing
            </button>
          </nav>

          {/* Search Bar and Sort By on the right - always visible */}
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <SearchBar onSearch={handleSearch} />
            <SortBy onSortChange={handleSortChange} />
          </div>
        </div>

        {/* Loading Message */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-screen absolute top-0 left-0 right-0">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-gray-700">Loading products...</p>
          </div>
        )}

        {/* Product grid - spaced below the fixed Search and Sort Bar */}
        {!isLoading && (
          <div className="mt-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {paginatedProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                  No products found.
                </p>
              )}
            </div>

            {/* Custom Pagination - below the product grid */}
            <div className="flex justify-center mt-10">
              {renderPagination()}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;


// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setProducts } from "@/redux/slices/productSlice";
// import {
//   fetchProducts,
//   fetchProductsByCategory,
// } from "@/services/productService";
// import ProductCard from "@/components/product/productCard";
// import SortBy from "@/components/product/SortBy";
// import SearchBar from "@/components/home/SearchBar";
// import Footer from "@/components/layout/Footer";
// import Header from "@/components/layout/Header";
// import Head from "next/head"; // Import Next.js Head component
// import "@/app/globals.css";

// const Home = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);
//   const [sortOption, setSortOption] = useState("popularity");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState(""); // Track selected category
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to load products (with or without category)
//   const loadProducts = async (selectedCategory = "") => {
//     setIsLoading(true);
//     setCategory(selectedCategory); // Update category state
//     let fetchedProducts;

//     if (selectedCategory) {
//       // Fetch products by category
//       fetchedProducts = await fetchProductsByCategory(selectedCategory);
//     } else {
//       // Fetch all products if no category is selected
//       fetchedProducts = await fetchProducts();
//     }

//     dispatch(setProducts(fetchedProducts));
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     loadProducts(category); // Load products based on category change
//   }, [category]);

//   // Update page title when component is mounted or search/category changes
//   useEffect(() => {
//     const pageTitle = searchTerm
//       ? `Search results for "${searchTerm}" - Best Deals`
//       : category
//       ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Best Deals`
//       : "Home - Best Deals on Electronics, Clothing, and More";
//     document.title = pageTitle; // Update browser title dynamically
//   }, [category, searchTerm]);

//   // Handle category change
//   const handleCategoryClick = (selectedCategory) => {
//     setSearchTerm(""); // Clear search when a category is clicked
//     setCurrentPage(1); // Reset pagination
//     loadProducts(selectedCategory); // Fetch new data from API
//   };

//   const handleSortChange = (option) => {
//     setSortOption(option);
//   };

//   const handleSearch = (query) => {
//     setSearchTerm(query);
//     setCurrentPage(1); // Reset to page 1 on new search
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const getFilteredProducts = () => {
//     return products.filter(
//       (product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   const getSortedProducts = (filteredProducts) => {
//     const sortedProducts = [...filteredProducts];
//     switch (sortOption) {
//       case "priceLowToHigh":
//         return sortedProducts.sort((a, b) => a.price - b.price);
//       case "priceHighToLow":
//         return sortedProducts.sort((a, b) => b.price - a.price);
//       case "aToZ":
//         return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
//       case "zToA":
//         return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
//       case "popularity":
//       default:
//         return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
//     }
//   };

//   const filteredProducts = getFilteredProducts();
//   const sortedProducts = getSortedProducts(filteredProducts);

//   // Pagination Logic
//   const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
//   const paginatedProducts = sortedProducts.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   // Custom pagination component
//   const renderPagination = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }

//     return (
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded ${
//             currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
//           }`}
//         >
//           &lt;
//         </button>
//         {pageNumbers.map((number) => {
//           if (
//             number === 1 ||
//             number === totalPages ||
//             (number >= currentPage - 1 && number <= currentPage + 1)
//           ) {
//             return (
//               <button
//                 key={number}
//                 onClick={() => handlePageChange(number)}
//                 className={`px-3 py-1 rounded ${
//                   number === currentPage
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {number}
//               </button>
//             );
//           } else if (number === currentPage - 2 || number === currentPage + 2) {
//             return <span key={number}>...</span>;
//           }
//           return null;
//         })}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 rounded ${
//             currentPage === totalPages
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-gray-200"
//           }`}
//         >
//           &gt;
//         </button>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Head>
//         <meta
//           name="description"
//           content="Discover the best deals on products across categories like electronics, jewelry, and clothing. Shop now to get great discounts and offers."
//         />
//         <meta name="keywords" content="electronics, jewelry, clothing, discounts, best deals" />
//         <meta name="author" content="Your Company Name" />
//         <meta property="og:title" content="Best Deals - Home" />
//         <meta
//           property="og:description"
//           content="Find amazing discounts on products across various categories. Shop electronics, jewelry, and clothing at unbeatable prices."
//         />
//         <meta property="og:image" content="/og-image.jpg" />
//         <meta property="og:url" content="https://www.yourwebsite.com" />
//         <meta name="robots" content="index, follow" />
//       </Head>
//       <Header />
//       <div className="pt-28 px-4 pb-16 min-h-screen">
//         {/* Search and Sort Bar - fixed to the top */}
//         <div className="fixed top-16 left-0 right-0 z-40 flex flex-wrap justify-between items-center bg-white px-6 py-4 shadow-md">
//           {/* Navigation Bar on the left - visible only on medium screens and larger */}
//           <nav className="hidden md:flex flex-wrap space-x-4 mb-4 sm:mb-0">
//             <button
//               onClick={() => handleCategoryClick("")} // For all products
//               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
//             >
//               All Products
//             </button>
//             <button
//               onClick={() => handleCategoryClick("electronics")}
//               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
//             >
//               Electronics
//             </button>
//             <button
//               onClick={() => handleCategoryClick("jewelery")}
//               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
//             >
//               Jewellery
//             </button>
//             <button
//               onClick={() => handleCategoryClick("men's clothing")}
//               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
//             >
//               Men's Clothing
//             </button>
//             <button
//               onClick={() => handleCategoryClick("women's clothing")}
//               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
//             >
//               Women's Clothing
//             </button>
//           </nav>

//           {/* Search Bar and Sort By on the right - always visible */}
//           <div className="flex items-center space-x-4 w-full md:w-auto">
//             <SearchBar onSearch={handleSearch} />
//             <SortBy onSortChange={handleSortChange} />
//           </div>
//         </div>

//         {/* Loading Message */}
//         {isLoading && (
//           <div className="flex justify-center mt-16">
//             <div className="spinner-border" role="status">
//               <span className="sr-only">Loading...</span>
//             </div>
//           </div>
//         )}

//         {/* Displaying Products */}
//         {!isLoading && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
//             {paginatedProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}

//         {/* Pagination Controls */}
//         <div className="mt-8">{renderPagination()}</div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Home;

