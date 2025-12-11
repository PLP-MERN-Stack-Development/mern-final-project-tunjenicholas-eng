import { useCart } from '../context/CartContext'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Hook to access global cart state

  // Smart Image Logic: Picks a fallback image based on category if no user image is provided
  const getDisplayImage = () => {
    if (product.image) return product.image;

    switch (product.category) {
      case 'Vegetables':
        return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80";
      case 'Fruits':
        return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80";
      case 'Dairy':
        return "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80";
      case 'Grains':
        return "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80";
      case 'Seeds':
        return "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80";
      default:
        return "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80"; // Generic farm
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full border border-gray-100">
      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        <img 
          src={getDisplayImage()} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
          {product.category || "Fresh"}
        </span>
      </div>
      
      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1 capitalize">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        {/* Price & Action */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-gray-400 text-xs block">Price per unit</span>
            <span className="text-xl font-bold text-green-600">KSh {product.price}</span>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition shadow-sm active:scale-95 flex items-center gap-1"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;