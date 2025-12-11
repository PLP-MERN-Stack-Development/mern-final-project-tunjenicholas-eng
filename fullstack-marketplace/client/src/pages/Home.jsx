import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar'; // <--- USING THE NEW SMART NAVBAR
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch products on load
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Filter Logic: Matches Search Term AND Category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Vegetables", "Fruits", "Dairy", "Grains", "Seeds"];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      
      {/* 1. REUSABLE SMART NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <div className="relative bg-gray-900 text-white py-32 px-6">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80" 
            alt="Farm Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative container mx-auto text-center z-10">
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">
            100% Organic & Fresh
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            From the Farm, <br/> Straight to Your Table.
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto font-light drop-shadow-md">
            Support local farmers in Kenya and enjoy fresh produce delivered within 24 hours.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for sukuma wiki, milk, maize..." 
              className="w-full py-4 pl-12 pr-4 rounded-full text-gray-800 shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 3. TRUST INDICATORS */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4 hover:bg-gray-50 rounded-xl transition">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">🚜</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Direct from Farmers</h3>
            <p className="text-gray-500 text-sm leading-relaxed">No middlemen. Farmers get paid more, and you get the best market prices.</p>
          </div>
          <div className="p-4 hover:bg-gray-50 rounded-xl transition">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">🌱</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">100% Organic</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Certified organic products grown with care, free from harmful chemicals.</p>
          </div>
          <div className="p-4 hover:bg-gray-50 rounded-xl transition">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">🚚</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Fast Delivery</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Fresh produce delivered to your doorstep the same day you order.</p>
          </div>
        </div>
      </div>

      {/* 4. MARKETPLACE SECTION */}
      <main className="container mx-auto px-6 py-16 flex-grow">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Fresh Harvest</h2>
            <p className="text-gray-500 mt-2">Explore the best products listed today.</p>
          </div>
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                  activeCategory === cat 
                    ? 'bg-green-600 text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-green-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🥕</div>
            <h3 className="text-xl font-bold text-gray-800">No products found</h3>
            <p className="text-gray-500 mt-2 mb-6">
              We couldn't find any items matching "{searchTerm}" in {activeCategory}.
            </p>
            <Link to="/" onClick={() => {setSearchTerm(''); setActiveCategory('All')}} className="text-green-600 font-bold hover:underline">
              Clear Filters
            </Link>
          </div>
        )}
      </main>

      {/* 5. FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">🌿 AgriSmart</h3>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              AgriSmart is a digital marketplace connecting small-scale farmers directly with consumers. We believe in fair trade, fresh food, and sustainable agriculture for a better future.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-green-400 transition">Browse Products</Link></li>
              <li><Link to="/cart" className="hover:text-green-400 transition">My Cart</Link></li>
              <li><Link to="/login" className="hover:text-green-400 transition">My Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Nairobi, Kenya</li>
              <li>support@agrismart.com</li>
              <li>+254 700 123 456</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} AgriSmart Marketplace. Built for the Future of Farming.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;