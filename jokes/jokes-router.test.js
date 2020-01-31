require('dotenv').config();
const server = require('../api/server');
const request = require('supertest');
const authDb = require('../auth/auth-model');
const jwt = require('jsonwebtoken');

describe('authZ jokes', () => {
  let token;
  beforeAll(async () => {
    const removal = await authDb.removeAllUsers();
  })

  it ('tests sanely', () => {
    expect(true).toBe(true);
  })

  describe('GET dadjokes endpoint',() => {

    it ('fails without jwt', async () => {
      const res = await request(server).get('/api/jokes')

      expect(res.status).toBe(400);
    })

    it ('succeeds with jwt', async () => {
      const regRes = await request(server).post('/api/auth/register').send({ username: 'hooii', password: 'booii' });
      console.log(regRes.body);

      // const logRes = await request(server).post('/api/login').send({ username: 'hooii', password: 'booii' });
      // console.log(logRes.body);

      const payload = {
        username: 'hooii'
      }
      const secret = process.env.SECRET;
      const token = jwt.sign(payload, secret);

      const res = await request(server).get('/api/jokes')
        .set("authorization", token);

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect.arrayContaining(res.body);
    })
  })
})