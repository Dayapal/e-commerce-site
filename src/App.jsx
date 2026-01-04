import { useState, useMemo, useCallback, useRef, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import productsData from "./data/products";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";

// 🔥 Lazy Loaded Components
const ProductList = lazy(() => import("./components/ProductList"));
const Cart = lazy(() => import("./components/Cart"));

function App() {
  // 🛒 Cart State
  const [cart, setCart] = useState([]);

  // 🔹 Filter States
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentSort, setCurrentSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 🧠 CACHE (key → filtered products)
  const cacheRef = useRef(new Map());

  // 🧠 FILTER + CACHE LOGIC
  const filteredProducts = useMemo(() => {
    const cacheKey = `${currentCategory}|${currentSort}|${searchQuery}`;

    // ✅ Return cached result if exists
    if (cacheRef.current.has(cacheKey)) {
      return cacheRef.current.get(cacheKey);
    }

    let result = [...productsData];

    // Category
    if (currentCategory !== "all") {
      result = result.filter(
        (product) => product.category === currentCategory
      );
    }

    // Search
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (currentSort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    // ✅ Save to cache
    cacheRef.current.set(cacheKey, result);

    return result;
  }, [currentCategory, currentSort, searchQuery]);

  // 🛒 Cart Handlers
  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // 🔹 Filter Handlers
  const filterCategory = useCallback((category) => {
    setCurrentCategory(category);
  }, []);

  const sortByPrice = useCallback((type) => {
    setCurrentSort(type);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />

      <Suspense
        fallback={
          <div className="text-center p-10 text-gray-500">
            Loading content...
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto p-4">
                <Filter
                  sortByPrice={sortByPrice}
                  filterCategory={filterCategory}
                  handleSearch={handleSearch}
                  currentCategory={currentCategory}
                  currentSort={currentSort}
                />

                <ProductList
                  products={filteredProducts}
                  addToCart={addToCart}
                />
              </div>
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
