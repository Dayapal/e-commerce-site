import { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset the "added" state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ease-out
        ${isHovered ? 'shadow-2xl transform -translate-y-1' : 'shadow-lg'} 
        bg-linear-to-br from-white to-blue-50 border border-blue-100`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Visual accent */}
      <div className="absolute top-0 right-0 w-14 h-14 bg-linear-to-br from-blue-100 to-blue-50 rounded-full transform translate-x-8 -translate-y-8"></div>
      
      {/* Product image with enhanced styling */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-linear-to-b from-white to-blue-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-48 object-cover transition-transform duration-500 ease-out
            ${isHovered ? 'scale-105' : 'scale-100'}`}
          loading="lazy"
        />
        {/* Product category badge */}
        {product.category && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-blue-700">
            {product.category}
          </div>
        )}
        
        {/* Rating display (if available) */}
        {product.rating && (
          <div className="absolute bottom-3 right-3 flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
          </div>
        )}
      </div>
      
      {/* Product name with improved hierarchy */}
      <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
        {product.name}
      </h2>
      
      {/* Product description with better readability */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
        {product.description}
      </p>
      
      {/* Price display with enhanced visual treatment */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="font-bold text-2xl text-blue-700">
            ₹{product.price}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </p>
          )}
        </div>
        
        {/* Stock indicator */}
        {product.inStock !== undefined && (
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        )}
      </div>
      
      {/* Add to Cart button with enhanced psychology */}
      <button
        onClick={handleAddToCart}
        disabled={product.inStock === false}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center
          ${isAdded 
            ? 'bg-green-600 text-white' 
            : product.inStock === false
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-linear-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 active:scale-[0.98]'
          }
          shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        aria-label={isAdded ? `Added ${product.name} to cart` : `Add ${product.name} to cart`}
      >
        {isAdded ? (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Added to Cart
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
          </>
        )}
      </button>
      
      {/* Favorite button (additional functionality) */}
      <button 
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label={`Add ${product.name} to favorites`}
      >
        <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
      
      {/* Hover effect indicator */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-blue-300 transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
    </div>
  );
};

export default ProductCard;