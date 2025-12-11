import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add token to headers if it exists
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchProducts = () => API.get('/products');
export const fetchMyProducts = () => API.get('/products/myproducts');
export const createProduct = (productData) => API.post('/products', productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getMyOrders = () => API.get('/orders/myorders');
