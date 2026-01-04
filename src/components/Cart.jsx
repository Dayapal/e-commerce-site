import { useState, useEffect } from 'react';

const Cart = ({ cart, removeFromCart }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [removedItem, setRemovedItem] = useState(null);
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const gst = total * 0.18;
  const finalAmount = total + gst;

  // Handle item removal with animation
  const handleRemoveItem = (index, item) => {
    setIsAnimating(true);
    setRemovedItem(item);
    
    // Small delay for animation to complete
    setTimeout(() => {
      removeFromCart(index);
      setIsAnimating(false);
      setRemovedItem(null);
    }, 300);
  };


 

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with emotional engagement */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </div>

        {/* Empty State with emotional design */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <button 
              className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              onClick={() => window.history.back()}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">Cart Items ({cart.length})</h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cart.map((item, index) => (
                    <div 
                      key={`${item.id || index}-${item.name}`}
                      className={`p-6 transition-all duration-300 ${isAnimating && removedItem?.name === item.name ? 'opacity-0 transform -translate-x-4' : 'opacity-100'}`}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Item Image/Icon with gradient background */}
                        <div className="shrink-0 w-16 h-16 bg-linear-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                          </svg>
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                         
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-blue-600">₹{item.price.toFixed(2)}</span>
                            <button
                              onClick={() => handleRemoveItem(index, item)}
                              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium text-gray-900">₹{gst.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">₹{finalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span>Secure SSL Encryption</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <span>Payment Protected</span>
                  </div>
                </div>

                {/* Primary Action Button with psychological placement */}
                <button 
                  className="mt-8 w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  onClick={() => {
                    // Add haptic/confirmation feedback
                    if (window.navigator.vibrate) window.navigator.vibrate(50);
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>

                {/* Continue Shopping Link */}
                <button 
                  className="mt-4 w-full text-center text-blue-600 hover:text-blue-700 font-medium py-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => window.history.back()}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recently Removed Item Notification */}
        {removedItem && (
          <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl shadow-lg max-w-sm animate-slide-up">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <div>
                <p className="font-medium">Removed from cart</p>
                <p className="text-sm">{removedItem.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Cart;