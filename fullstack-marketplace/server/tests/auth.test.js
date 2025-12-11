const request = require('supertest');
const express = require('express');
const app = express();

app.get('/test', (req, res) => res.status(200).json({ msg: 'Hello' }));

describe('GET /test', () => {
  it('responds with json', async () => {
    await request(app)
      .get('/test')
      .expect(200)
      .then(response => {
        expect(response.body.msg).toBe('Hello');
      });
  });
});