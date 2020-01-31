const server = require('../api/server');
const request = require('supertest');

describe('authZ jokes', () => {
  it ('tests sanely', () => {
    expect(true).toBe(true);
  })

  describe('GET dadjokes endpoint', () => {

    it ('fails without jwt', async () => {
      const res = await request(server).get('/api/jokes')

      expect(res.status).toBe(400);
    })
  })
})