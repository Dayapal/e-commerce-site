import { useState } from "react";

const Filter = ({ sortByPrice, filterCategory, handleSearch, currentCategory = "all", currentSort = null }) => {
  // States for UI feedback
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Category mapping for display names
  const categoryMap = {
    "all": "All Categories",
    "Clothing-Innerwear": "👚 Innerwear",
    "Clothing-Outerwear": "🧥 Outerwear",
    "Electronics": "📱 Electronics",
    "Footwear": "👟 Footwear",
    "Accessories": "👜 Accessories",
    "Home-Appliances": "🏠 Home Appliances",
    "Beauty": "💄 Beauty",
    "Sports": "⚽ Sports",
    "Books": "📚 Books",
    "Furniture": "🛋️ Furniture"
  };

  // Handle focus states for better UX
  const handleFocus = () => setIsSearchFocused(true);
  const handleBlur = () => setIsSearchFocused(false);

  // Get current category display name
  const getCategoryDisplayName = () => {
    return categoryMap[currentCategory] || currentCategory;
  };

  return (
    <div className="filter-container">
      {/* Section Header with Psychological Affordance */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Refine Your Search
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        
        {/* 🔍 Search Input with Visual Feedback & Micro-interactions */}
        <div className="flex-1 w-full lg:max-w-md">
          <div className="relative">
            {/* Search Icon with Animation */}
            <svg 
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                isSearchFocused ? 'text-blue-500 scale-110' : 'text-gray-400'
              }`}
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            <input
              type="text"
              placeholder="Search for products, brands, or features..."
              className={`w-full pl-12 pr-4 py-3.5 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                isSearchFocused 
                  ? 'border-blue-400 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Action Group Container */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          
          {/* 📊 Sort Buttons Group with Visual Hierarchy */}
          <div className="flex flex-col sm:flex-row gap-2">
          
            <div className="flex rounded-xl bg-gray-100 p-1.5">
              <button
                className={`px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  currentSort === 'low' 
                    ? 'bg-white text-blue-600 shadow-md ring-2 ring-blue-100' 
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
                onClick={() => sortByPrice("low")}
                aria-label="Sort by price: low to high"
                aria-pressed={currentSort === 'low'}
              >
                <svg 
                  className={`transition-transform duration-300 ${currentSort === 'low' ? 'text-blue-500' : 'text-gray-500'}`}
                  width="18" 
                  height="18" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path d="M5 15l7-7 7 7" />
                </svg>
                <span>Low to High</span>
              </button>
              
              <button
                className={`px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  currentSort === 'high' 
                    ? 'bg-white text-blue-600 shadow-md ring-2 ring-blue-100' 
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
                onClick={() => sortByPrice("high")}
                aria-label="Sort by price: high to low"
                aria-pressed={currentSort === 'high'}
              >
                <svg 
                  className={`transition-transform duration-300 ${currentSort === 'high' ? 'text-blue-500' : 'text-gray-500'}`}
                  width="18" 
                  height="18" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
                <span>High to Low</span>
              </button>
            </div>
          </div>

          {/* 📂 Category Dropdown with Enhanced Visuals */}
          <div className="relative flex-1 sm:flex-none">
            <div className="relative">
              <select
                className="w-full appearance-none bg-white pl-4 pr-10 py-3.5 rounded-xl border-2 border-gray-200 text-gray-800 transition-all duration-300 hover:border-blue-300 hover:shadow-md focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 cursor-pointer"
                onChange={(e) => filterCategory(e.target.value)}
                value={currentCategory}
                aria-label="Filter by category"
              >
                {Object.entries(categoryMap).map(([value, label]) => (
                  <option key={value} value={value} className="py-2">
                    {label}
                  </option>
                ))}
              </select>
              
              {/* Custom Dropdown Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <svg 
                  className="text-gray-500 transition-transform duration-300"
                  width="20" 
                  height="20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display - Now working correctly */}
      {(currentCategory !== 'all' || currentSort) && (
        <div className="mt-6 pt-4 border-t border-gray-100 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {/* Category Filter Badge */}
            {currentCategory !== 'all' && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100 animate-slideIn">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className="font-medium">Category:</span> {getCategoryDisplayName()}
                </span>
                <button 
                  onClick={() => filterCategory('all')}
                  className="ml-1 text-blue-500 hover:text-blue-700 transition-colors duration-200 p-0.5 rounded-full hover:bg-blue-100"
                  aria-label="Clear category filter"
                  title="Clear category"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                  </svg>
                </button>
              </span>
            )}
            
            {/* Sort Filter Badge */}
            {currentSort && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm border border-green-100 animate-slideIn">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  <span className="font-medium">Sort:</span> {currentSort === 'low' ? 'Low to High' : 'High to Low'}
                </span>
                <button 
                  onClick={() => sortByPrice(null)}
                  className="ml-1 text-green-500 hover:text-green-700 transition-colors duration-200 p-0.5 rounded-full hover:bg-green-100"
                  aria-label="Clear sort filter"
                  title="Clear sort"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                  </svg>
                </button>
              </span>
            )}
            
            {/* Clear All Filters Button */}
            {(currentCategory !== 'all' && currentSort) && (
              <button
                onClick={() => {
                  filterCategory('all');
                  sortByPrice(null);
                }}
                className="ml-2 text-sm text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center gap-1"
                aria-label="Clear all filters"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;