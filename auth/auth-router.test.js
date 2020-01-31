const server = require('../api/server');
const request = require('supertest');

const authDb = require('./auth-model');

describe('auth block', () => {

  it ('is  hooked up to server', async () => {
    const res = await request(server).get('/api/auth');

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/i);
    expect(res.body.message).toEqual('auth-router available in server');
  })
})