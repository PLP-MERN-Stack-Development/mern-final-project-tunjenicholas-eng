import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // Check Login Status directly from LocalStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Force refresh to clear state
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-green-700 flex items-center gap-2">
          🌿 AgriSmart
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-green-600 font-medium">Home</Link>
          
          {/* Cart Icon (Visible to everyone) */}
          <Link to="/cart" className="relative text-gray-600 hover:text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* CONDITIONAL RENDERING BASED ON ROLE */}
          {user ? (
            /* LOGGED IN USER VIEW */
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-green-600 font-medium">
                Dashboard
              </Link>
              <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700">
                  Logout
                </button>
              </div>
            </>
          ) : (
            /* GUEST VIEW */
            <>
              <Link to="/login" className="text-gray-600 hover:text-green-600 font-medium">Login</Link>
              <Link to="/register" className="bg-green-600 text-white px-5 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-md">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;