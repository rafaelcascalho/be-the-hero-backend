const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const connection = require('../../../../database/connection');

beforeAll(async () => {
  await connection.migrate.rollback();
  await connection.migrate.latest();
});

afterAll(async () => {
  await connection('ongs').del();

  await connection.destroy();
});

describe('GET /ongs', () => {
  context('given no ongs exist', () => {
    it('returns an empty array', async () => {
      const response = await request(api).get('/api/v1/ongs');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.ongs).toEqual([]);
    });
  });

  context('given one or more ongs exist', () => {
    it('returns an array of ongs', async () => {
      const ongs = await ongFactory.createMany(3);

      const response = await request(api).get('/api/v1/ongs');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.ongs).toMatchObject(ongs);
    });
  });
});
