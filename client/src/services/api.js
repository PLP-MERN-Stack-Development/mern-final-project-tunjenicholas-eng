import axios from 'axios';

// 1. SMART URL SELECTION
// If we are in production (Vercel), use the Render URL.
// If we are in development (Localhost), use the Local URL.
const BACKEND_URL = import.meta.env.PROD 
  ? "https://agrismart-api-dzfi.onrender.com/api"  
  : "http://localhost:5000/api";

const API = axios.create({ baseURL: BACKEND_URL });

// 2. Add Token to headers if it exists (Middleware)
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// 3. API Endpoints
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchProducts = () => API.get('/products');
export const fetchMyProducts = () => API.get('/products/myproducts');
export const createProduct = (productData) => API.post('/products', productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getMyOrders = () => API.get('/orders/myorders');