import { useState } from 'react';
import { createProduct } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = () => {
  // Added 'image' to the initial state
  const [form, setForm] = useState({ name: '', price: '', category: '', description: '', stock: '', image: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If no image is provided, we send an empty string (the Card will handle the default)
      await createProduct(form);
      toast('Product Listed Successfully!');
      navigate('/');
    } catch (error) {
      toast('Failed to add product.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
        <Link to="/" className="text-green-600 font-medium hover:underline">
          &larr; Back to Marketplace
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">List a New Product</h2>
          <p className="text-green-100">Fill in the details below to add items to the marketplace.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input 
              placeholder="e.g. Sukuma Wiki" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
              onChange={(e) => setForm({...form, name: e.target.value})} 
              required 
            />
          </div>

          {/* NEW IMAGE INPUT FIELD */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL (Optional)</label>
            <input 
              type="text"
              placeholder="Paste a link to your image (https://...)" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
              onChange={(e) => setForm({...form, image: e.target.value})} 
            />
            <p className="text-xs text-gray-500 mt-1">Leave blank to use a default category image.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (KSh)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
              onChange={(e) => setForm({...form, price: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
            <input 
              type="number" 
              placeholder="Available units" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
              onChange={(e) => setForm({...form, stock: e.target.value})} 
              required 
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) => setForm({...form, category: e.target.value})}
              required
            >
              <option value="">Select a Category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Grains">Grains</option>
              <option value="Seeds">Seeds & Equipment</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              rows="4" 
              placeholder="Describe your product..." 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
              onChange={(e) => setForm({...form, description: e.target.value})} 
              required 
            />
          </div>

          <div className="col-span-2 mt-4">
            <button type="submit" className="w-full bg-green-700 text-white p-4 rounded-lg font-bold text-lg hover:bg-green-800 transition shadow-md">
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;