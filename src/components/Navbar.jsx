import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = ({ cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add scroll effect for depth perception
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart count animation
  useEffect(() => {
    if (cartCount > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ease-out ${isScrolled
          ? 'bg-linear-to-r from-blue-700 via-blue-600 to-indigo-600 shadow-lg backdrop-blur-md bg-opacity-95'
          : 'bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500 shadow-md'
        }`}>
        <div className="max-w-5xl mx-auto px-1 sm:px-4 md:px-6 lg:px-4">
          <div className="flex justify-between items-center h-12 sm:h-16 md:h-18">

            <Link
              to="/"
              className="group flex items-center space-x-2 md:space-x-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-1 sm:p-2 transition-all duration-200"
              aria-label="SmartShop Home"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative w-4 h-4 sm:w-9 sm:h-9 md:w-8 md:h-8 bg-linear-to-br from-white to-blue-100 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-lg sm:text-xl md:text-2xl">🛍️</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight">SmartShop</h1>
                <span className="text-blue-100 text-xs sm:text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity hidden sm:block">
                  Smart shopping starts here
                </span>
              </div>
            </Link>

            {/* Cart - Right side with improved icon */}
            <div className="relative">
              <Link
                to="/cart"
                className={`group flex items-center justify-center space-x-2 bg-white bg-opacity-10 hover:bg-opacity-20 
                  rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 transition-all duration-300 ease-out 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 
                  ${cartPulse ? 'animate-pulse-subtle' : ''}
                  transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl`}
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <h2 className="text-2xl font-bold ">🛒 Cart</h2>
                {/* Modern Cart Icon with 3D effect */}
                <div className="relative">
                  {/* Cart body with depth effect */}
                  <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transform transition-all duration-300 group-hover:scale-110">
                    {/* Main cart body */}
                    <div className="absolute inset-0">
                      {/* Cart handle - top arch */}
                      <svg viewBox="0 0 24 24" className="w-full h-full">

                        {/* Cart body */}
                        <path
                          d="M4 8L6 6H18L20 8V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V8Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-white opacity-90"
                        />




                      </svg>
                    </div>

                    {/* Shopping items inside cart - appears on hover or when cart has items */}
                    <div className={`absolute inset-0 transition-all duration-300 ${cartCount > 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        {/* Shopping bag item 1 */}
                        <rect
                          x="9"
                          y="9"
                          width="10"
                          height="10"
                          rx="1"
                          fill="currentColor"
                          className="text-blue-700 opacity-80"
                        />
                        {/* Shopping bag item 2 */}
                        <rect
                          x="7"
                          y="11"
                          width="4"
                          height="3"
                          rx="0.8"
                          fill="currentColor"
                          className="text-indigo-200 opacity-90"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Animated cart items indicator */}
                  {cartCount > 0 && (
                    <>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-10">
                        <div className="relative">
                          {/* Glowing halo effect */}
                          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${cartPulse ? 'bg-red-400 animate-ping' : 'bg-red-300'
                            } opacity-20`}></div>

                          {/* Main badge with 3D effect */}
                          <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-linear-to-br from-red-500 via-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                            {/* Inner shine */}
                            <div className="absolute top-0 left-1/4 w-2 h-1 bg-linear-to-r from-red-100 to-transparent rounded-full opacity-60"></div>

                            {/* Count text with white shadow for readability */}
                            <span className="text-xs font-bold text-white relative">
                              {cartCount > 99 ? '99+' : cartCount}
                              <span className="absolute inset-0 text-white opacity-30 blur-[1px]">
                                {cartCount > 99 ? '99+' : cartCount}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Subtle glow effect on cart icon when updated */}
                      <div className={`absolute -inset-1 bg-linear-to-r from-red-400/20 to-transparent rounded-full blur transition-all duration-300 ${cartPulse ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                    </>
                  )}
                </div>

                {/* Cart text - Hidden on mobile, visible on tablet+ */}
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-white font-medium text-sm sm:text-base opacity-90 group-hover:opacity-100 transition-opacity">
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full opacity-50"></div>
                      <span className="text-blue-100 text-xs font-semibold px-2 py-1 bg-linear-to-r from-blue-700/50 to-indigo-700/50 rounded-full transition-all duration-200 group-hover:bg-opacity-70 backdrop-blur-sm">
                        {cartCount} item{cartCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Animated arrow - Hidden on mobile */}
                <div className="hidden sm:block ml-1">
                  <svg
                    className="w-4 h-4 text-white opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-70 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              {/* Enhanced Tooltip for mobile */}
              {isMobile && cartCount > 0 && (
                <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-blue-800 to-indigo-800 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-blue-700/50 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-linear-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                    <span>{cartCount} item{cartCount !== 1 ? 's' : ''} ready</span>
                  </div>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-linear-to-r from-blue-800 to-indigo-800 rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress indicator for page scroll */}
        <div className="h-1 w-full bg-linear-to-r from-transparent via-blue-300 to-transparent opacity-30">
          <div
            className="h-full bg-linear-to-r from-blue-200 to-white transition-all duration-150 ease-out"
            style={{
              width: `${Math.min((typeof window !== 'undefined' ? window.scrollY / 300 : 0) * 100, 100)}%`
            }}
          ></div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;