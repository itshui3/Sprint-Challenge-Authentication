const server = require('../api/server');
const request = require('supertest');

const authDb = require('./auth-model');
const jwt = require('jsonwebtoken');

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

  describe('POST login /api/auth/login', () => {
    it ('requires credentials', async () => {
      const res = await request(server).post('/api/auth/login');
      expect(res.status).toBe(400);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toBe(`check credentials or URL, needs a username and password to login`);
    })

    it ('logs user in', async () => {
      const res = await request(server).post('/api/auth/login')
        .send({
          username: 'hooi',
          password: 'booi'
        }); // with the assumption that previous test ramifications persist on db

      const secret = process.env.SECRET;
      const payload = {
        username: 'hooi'
      }

      const token = jwt.sign(payload, secret);

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toMatch(`ok ok, I see you`);
      expect(res.body.token).toEqual(token);
    })
  })
})