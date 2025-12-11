import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api'; // Import backend service
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Handle the Checkout Process
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    // 1. Confirm the action
    const confirmCheckout = window.confirm(`Complete order for KSh ${totalPrice}?`);
    
    if (confirmCheckout) {
      try {
        // 2. Prepare data to match Backend Schema (server/models/Order.js)
        const orderData = {
          orderItems: cartItems.map(item => ({
            product: item._id, // Backend expects 'product' as the ID
            name: item.name,
            qty: item.qty,
            price: item.price
          })),
          totalPrice: totalPrice
        };

        // 3. Send to Server
        await createOrder(orderData);

        // 4. Success Handling
        toast('Order Placed Successfully! You can view it in your Dashboard.');
        clearCart(); // Empty the global cart
        navigate('/dashboard'); // Redirect to User Dashboard
      } catch (error) {
        console.error("Checkout Error:", error);
        // Better error handling: Check if it's a 401 (Not Logged In)
        if (error.response && error.response.status === 401) {
          toast('You must be logged in to place an order.');
          navigate('/login');
        } else {
          toast('Checkout Failed. Please try again.');
        }
      }
    }
  };

  // Smart Image Logic (Consistent with ProductCard)
  // Inside Cart.jsx
    const getDisplayImage = (item) => {
        // 1. Check if item has a valid image link
        if (item.image && item.image.startsWith('http')) return item.image;
        
        // 2. Fallback based on category
        switch (item.category) {
            case 'Vegetables': return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80";
            case 'Fruits': return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80";
            case 'Dairy': return "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80";
            default: return "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80";
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-500 font-medium">{cartItems.length} Items</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          /* EMPTY STATE UI */
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center flex flex-col items-center">
            <div className="bg-green-50 p-6 rounded-full mb-6">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Looks like you haven't added any fresh produce yet. Browse our marketplace to find the best local items.
            </p>
            <Link 
              to="/" 
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg transform hover:-translate-y-1"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* TWO COLUMN LAYOUT */
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            
            {/* LEFT COLUMN: Cart Items List */}
            <section className="lg:col-span-7">
              <ul className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <li key={item._id} className="flex p-6 sm:py-8 transition hover:bg-gray-50">
                    {/* Item Image */}
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={getDisplayImage(item)}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="ml-6 flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">KSh {item.price * item.qty}</p>
                      </div>
                      
                      <div className="flex items-end justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                           <span className="px-4 py-1 text-gray-600 font-medium text-sm">Qty: {item.qty}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id)}
                          className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <Link to="/" className="text-green-600 font-medium hover:text-green-500 flex items-center gap-2">
                  <span>&larr;</span> Continue Shopping
                </Link>
              </div>
            </section>

            {/* RIGHT COLUMN: Order Summary Card */}
            <section className="lg:col-span-5 mt-16 lg:mt-0 bg-white rounded-xl shadow-lg border border-gray-100 p-8 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">KSh {totalPrice}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Tax / VAT</dt>
                  <dd className="font-medium text-green-600 text-sm">Included</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-xl font-bold text-gray-900">Total</dt>
                  <dd className="text-2xl font-extrabold text-green-600">KSh {totalPrice}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 border border-transparent rounded-lg py-4 px-4 text-center font-bold text-white shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all transform active:scale-95 flex justify-center items-center gap-2"
                >
                  <span>Checkout Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
                <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Secure Checkout Process
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;