const server = require('../api/server');
const request = require('supertest');
const authDb = require('../auth/auth-model');
const bcryptjs = require('bcryptjs');

describe('authZ jokes', () => {
  let token;
  beforeAll(async () => {
    const removal = await authDb.removeAllUsers();

    await request(server).post('/api/auth/register').send({ username: 'hooii', password: 'booii' });
  })

  beforeEach(async () => {
    const res = await request(server).post('/api/login').send({ username: 'hooii', password: 'booii' })

    console.log(res.body.message);

    token = res.body.token;
  })

  it ('tests sanely', () => {
    expect(true).toBe(true);
  })

  describe('GET dadjokes endpoint', () => {

    it ('fails without jwt', async () => {
      const res = await request(server).get('/api/jokes')

      expect(res.status).toBe(400);
    })

    it ('succeeds with jwt', async () => {
      const res = await request(server).get('/api/jokes')
        .set("authorization", 'testing');

      
    })
  })
})