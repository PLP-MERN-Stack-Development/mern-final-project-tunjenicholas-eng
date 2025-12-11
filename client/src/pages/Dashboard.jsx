import { useEffect, useState } from 'react';
import { getMyOrders, fetchMyProducts, deleteProduct } from '../services/api';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('buying'); // 'buying' or 'selling'
  const [orders, setOrders] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check Authentication
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      // Load Orders (Buyer Data)
      const orderData = await getMyOrders();
      setOrders(orderData.data.reverse()); // Newest first

      // Load My Products (Seller Data)
      const productData = await fetchMyProducts();
      setMyProducts(productData.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        // Refresh the list immediately without reloading page
        setMyProducts(myProducts.filter(p => p._id !== id));
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  // Helper for Smart Images (Consistent with other pages)
  const getDisplayImage = (product) => {
    if (product.image) return product.image;
    switch (product.category) {
      case 'Vegetables': return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80";
      case 'Fruits': return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80";
      case 'Dairy': return "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80";
      default: return "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80";
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-green-600 font-bold">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar /> 

      <div className="container mx-auto px-6 py-10">
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-2xl font-bold shadow-sm">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-gray-500">Welcome back, <span className="font-semibold text-green-600">{user?.name}</span></p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
             <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wide">
               {user?.isAdmin ? 'Admin' : 'Member'}
             </span>
             <span className="px-3 py-1 bg-green-50 border border-green-100 rounded-full text-xs font-bold text-green-700 uppercase tracking-wide">
               Verified
             </span>
          </div>
        </div>

        {/* TABS (Buying vs Selling) */}
        <div className="flex gap-6 mb-8">
          <button 
            onClick={() => setActiveTab('buying')}
            className={`pb-2 px-2 text-lg font-bold transition-all border-b-4 ${activeTab === 'buying' ? 'text-green-700 border-green-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
          >
            📦 My Orders
          </button>
          <button 
            onClick={() => setActiveTab('selling')}
            className={`pb-2 px-2 text-lg font-bold transition-all border-b-4 ${activeTab === 'selling' ? 'text-green-700 border-green-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
          >
            🏷️ My Store
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white min-h-[400px] rounded-2xl shadow-sm border border-gray-100 p-6">
          
          {/* TAB 1: BUYING (Orders) */}
          {activeTab === 'buying' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 opacity-20">🛒</div>
                  <h3 className="text-xl font-bold text-gray-400">No orders yet</h3>
                  <p className="text-gray-400 mb-6">Start shopping to see your history here.</p>
                  <Link to="/" className="text-green-600 font-bold hover:underline">Browse Marketplace &rarr;</Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition">
                    <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="block text-gray-500 text-xs uppercase font-bold">Date Placed</span>
                          <span className="font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 text-xs uppercase font-bold">Total</span>
                          <span className="font-bold text-green-600">KSh {order.totalPrice}</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 text-xs uppercase font-bold">Order #</span>
                          <span className="font-mono text-gray-500">{order._id.substring(0,8)}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.isPaid ? 'Paid' : 'Processing'}
                      </span>
                    </div>
                    <div className="p-6">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">📦</div>
                            <div>
                              <p className="font-bold text-gray-800">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                            </div>
                          </div>
                          <span className="font-medium text-gray-600">KSh {item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: SELLING (My Products) */}
          {activeTab === 'selling' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-gray-700">Listed Products ({myProducts.length})</h2>
                <Link to="/add-product" className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-lg flex items-center gap-2">
                  <span>+</span> Add New Product
                </Link>
              </div>

              {myProducts.length === 0 ? (
                 <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                   <p className="text-gray-500 text-lg mb-4">You haven't listed any products yet.</p>
                   <Link to="/add-product" className="text-green-600 font-bold hover:underline">List your first item</Link>
                 </div>
              ) : (
                 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                   {myProducts.map((product) => (
                     <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden group hover:shadow-lg transition">
                        {/* Image Container with Delete Overlay */}
                        <div className="h-48 bg-gray-100 relative">
                          <img 
                            src={getDisplayImage(product)} 
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                            alt={product.name} 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="bg-white text-red-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-red-50 transition shadow-lg flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                              Delete
                            </button>
                          </div>
                          <span className="absolute top-2 left-2 bg-white/90 text-gray-800 text-xs font-bold px-2 py-1 rounded-md">
                            {product.category}
                          </span>
                        </div>
                        
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{product.name}</h3>
                          <div className="mt-auto flex justify-between items-center">
                            <p className="text-green-600 font-bold text-lg">KSh {product.price}</p>
                            <p className="text-xs text-gray-400 font-medium">Stock: {product.stock}</p>
                          </div>
                        </div>
                     </div>
                   ))}
                 </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;