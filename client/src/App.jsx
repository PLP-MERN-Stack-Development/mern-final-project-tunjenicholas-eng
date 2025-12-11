import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Import toast
import io from 'socket.io-client'; // Import Socket Client

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';

// Initialize Socket outside component to prevent multiple connections
const socket = io('http://localhost:5000');

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  
  // NEW: Global Listener for Real-Time Events
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Real-Time Server');
    });

    // Listen for "new-order" event from backend
    socket.on('new-order', (data) => {
      // Play a notification sound (optional)
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
      audio.play().catch(e => console.log("Audio play failed"));

      // Show the Toast
      toast.success(data.message, {
        duration: 5000,
        icon: '🔔',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    });

    // Cleanup listener on unmount
    return () => {
      socket.off('new-order');
    };
  }, []);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        
        <Route 
          path="/add-product" 
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;