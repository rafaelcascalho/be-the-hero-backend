const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const connection = require('../../../../database/connection');

afterAll(async () => {
  await connection('ongs').del();
});

describe('GET /ongs', () => {
  context('when there are no ongs', () => {
    it('returns an empty array', async () => {
      const response = await request(api).get('/api/v1/ongs');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.ongs).toEqual([]);
    });
  });

  context('when there are one or more ongs', () => {
    it('returns an array of ongs', async () => {
      await ongFactory.createMany(3);

      const response = await request(api).get('/api/v1/ongs');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.ongs.length).toBeGreaterThan(0);
    });
  });
});
