
// "use client";
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const intervalRef = useRef(null);

//   const images = [
//     "/image/carousel1.webp",
//     "/image/carousel2.webp",
//     "/image/carousel3.webp",
//     "/image/carousel4.webp",
//     "/image/carousel5.webp",
//     "/image/carousel6.webp",
//     "/image/carousel7.webp",
//     "/image/carousel8.webp",
//     "/image/carousel9.webp",
//     "/image/carousel10.webp",
//     "/image/carousel11.webp",
//   ];

//   // Clone the first and last images for smooth transitions
//   const imagesWithClones = [
//     images[images.length - 1], // Clone of the last image
//     ...images,
//     images[0], // Clone of the first image
//   ];

//   useEffect(() => {
//     // Automatically change images every 3 seconds
//     intervalRef.current = setInterval(() => {
//       nextImage();
//     }, 3000);

//     return () => {
//       clearInterval(intervalRef.current);
//     };
//   }, []);

//   const nextImage = () => {
//     setCurrentIndex((prevIndex) => prevIndex + 1);
//   };

//   const handleTransitionEnd = () => {
//     // If at the end of the cloned list, reset to the first image
//     if (currentIndex === imagesWithClones.length - 1) {
//       setIsTransitioning(false);
//       setCurrentIndex(1); // Move back to the first image
//     }

//     // If at the start of the cloned list, reset to the last image
//     if (currentIndex === 0) {
//       setIsTransitioning(false);
//       setCurrentIndex(images.length);
//     }
//   };

//   // Restart transitions when index is reset
//   useEffect(() => {
//     if (!isTransitioning) {
//       setTimeout(() => {
//         setIsTransitioning(true);
//       }, 50);
//     }
//   }, [isTransitioning]);

//   const goToImage = (index) => {
//     setIsTransitioning(true);
//     setCurrentIndex(index + 1); // Adjust for the cloned images
//   };

//   return (
//     <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-xl">
//       <div
//         className={`w-full h-full flex ${
//           isTransitioning
//             ? "transition-transform duration-1000 ease-in-out"
//             : ""
//         }`}
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         {imagesWithClones.map((image, index) => (
//           <div key={index} className="w-full h-full flex-shrink-0 relative">
//             <Image
//               src={image}
//               alt={`Carousel Image ${index + 1}`}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Fixed Explore Now Button */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <Link
//           href="/products"
//           className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 pointer-events-auto"
//         >
//           Explore Now
//         </Link>
//       </div>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             className={`h-3 w-3 rounded-full transition-colors duration-300 ${
//               index + 1 === currentIndex ? "bg-white" : "bg-gray-400"
//             }`}
//             onClick={() => goToImage(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;


"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  const images = [
    "/image/carousel1.webp",
    "/image/carousel2.webp",
    "/image/carousel3.webp",
    "/image/carousel4.webp",
    "/image/carousel5.webp",
    "/image/carousel6.webp",
    "/image/carousel7.webp",
    "/image/carousel8.webp",
    "/image/carousel9.webp",
    "/image/carousel10.webp",
    "/image/carousel11.webp",
  ];

  // Clone the first and last images for smooth transitions
  const imagesWithClones = [
    images[images.length - 1], // Clone of the last image
    ...images,
    images[0], // Clone of the first image
  ];

  useEffect(() => {
    // Automatically change images every 3 seconds
    intervalRef.current = setInterval(() => {
      nextImage();
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTransitionEnd = () => {
    // If at the end of the cloned list, reset to the first image
    if (currentIndex === imagesWithClones.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1); // Move back to the first image
    }

    // If at the start of the cloned list, reset to the last image
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(images.length);
    }
  };

  // Restart transitions when index is reset
  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [isTransitioning]);

  const goToImage = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // Adjust for the cloned images
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-xl">
      <div
        className={`w-full h-full flex ${
          isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {imagesWithClones.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={image}
              alt={`Carousel Image ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Fixed Explore Now Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Link
          href="/products"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 pointer-events-auto"
        >
          Explore Now
        </Link>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index + 1 === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
