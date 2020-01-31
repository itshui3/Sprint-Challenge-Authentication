const server = require('../api/server');
const request = require('supertest');

const authDb = require('./auth-model');

describe('auth block', () => {
  beforeAll(async () => {
    const res = await authDb.removeAllUsers();

    console.log(res);
  })

  it ('is  hooked up to server', async () => {
    const res = await request(server).get('/api/auth');

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/i);
    expect(res.body.message).toEqual('auth-router available in server');
  })

  it ('registers user with hashed password', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'hooi', password: 'booi' });
    //check that username is the same but that password is NOT

    expect(res.status).toBe(201);
    expect(res.type).toMatch(/json/i);
    expect(res.body.resource.username).toBe('hooi');
    expect(res.body.resource.password).not.toBe('booi');
  })

  describe('it logs user in', () => {
    
  })
})