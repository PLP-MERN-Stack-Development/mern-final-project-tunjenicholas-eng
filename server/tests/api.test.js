const request = require('supertest');
const app = require('../server'); // Import the app we just exported
const mongoose = require('mongoose');

// Generate a random email so tests don't fail on "User already exists"
const randomEmail = `testuser${Math.floor(Math.random() * 10000)}@example.com`;
let userToken = '';

describe('AgriSmart API Integration Tests', () => {

  // Test 1: Can we register a user?
  it('POST /api/auth/register - Should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: randomEmail,
        password: 'password123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    
    // Save token for next tests
    userToken = res.body.token;
  });

  // Test 2: Can we fetch products?
  it('GET /api/products - Should return list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test 3: Can we access a protected route?
  it('GET /api/orders/myorders - Should allow access with token', async () => {
    const res = await request(app)
      .get('/api/orders/myorders')
      .set('Authorization', `Bearer ${userToken}`); // Send the token
    
    expect(res.statusCode).toEqual(200);
  });

  // Cleanup: Close DB connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });
});