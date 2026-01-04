import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProductImage } from "../helper/pixels";

const ITEMS_PER_LOAD = 6;

const ProductList = ({ products, addToCart }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  const [productsWithImages, setProductsWithImages] = useState([]);
  const imageCache = useRef({});

  useEffect(() => {
    const loadImages = async () => {
      const visibleProducts = products.slice(0, visibleCount);

      const updated = await Promise.all(
        visibleProducts.map(async (product) => {
          if (imageCache.current[product.id]) {
            return imageCache.current[product.id];
          }

          const image = await fetchProductImage(
            `${product.name} ${product.category}`
          );

          const updatedProduct = { ...product, image };
          imageCache.current[product.id] = updatedProduct;
          return updatedProduct;
        })
      );

      setProductsWithImages(updated);
    };

    loadImages();
  }, [products, visibleCount]);


  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, products.length));
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, products.length]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && visibleCount < products.length) {
          setIsLoading(true);
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [isLoading, visibleCount, products.length]);


  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: ITEMS_PER_LOAD }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
        >

          <div className="relative overflow-hidden">
            <div className="aspect-square bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-10 bg-gray-300 rounded-xl w-28"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );


  const ProgressIndicator = () => (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-gray-700 font-medium">Loading more products</p>
        <p className="text-sm text-gray-500 mt-1">
          Showing {visibleCount} of {products.length} products
        </p>
      </div>
    </div>
  );

  // No products state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-28 h-28 mb-6 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
        <p className="text-gray-600 max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Products Grid */}
        <div className="space-y-8">
          {/* Initial products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsWithImages.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          {/* Loading state - YouTube style skeleton */}
          {isLoading && <SkeletonLoader />}

          {/* Progress indicator when loading more */}
          {isLoading && visibleCount < products.length && <ProgressIndicator />}

          {/* Load more trigger element (hidden) */}
          <div
            ref={loaderRef}
            className="h-1 opacity-0"
            aria-label="Load more products trigger"
          />




        </div>
      </div>


    </div>
  );
};

export default ProductList;