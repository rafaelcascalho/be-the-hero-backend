const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const connection = require('../../../../database/connection');

afterAll(async () => {
  await connection('ongs').del();
});

describe('POST /ongs', () => {
  const newOng = ongFactory.build();

  context('when a new ong is sent', () => {
    it('returns the new ong data', async () => {
      const response = await request(api)
        .post('/api/v1/ongs')
        .send(newOng)
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(201);
      expect(response.body.status).toEqual('success');
      expect(typeof response.body.id).toBe('string');
    });
  });

  context('when the ong already exists', () => {
    it('returns ong already exists', async () => {
      const response = await request(api)
        .post('/api/v1/ongs')
        .send(newOng)
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(409);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('ONG Already Exists');
    });
  });
});
