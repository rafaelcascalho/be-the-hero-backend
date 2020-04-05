const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const incidentFactory = require('../../../factories/incidentFactory');
const connection = require('../../../../database/connection');

let ongId;

beforeAll(async () => {
  const ong = await ongFactory.create();
  ongId = ong.id;
});

afterAll(async () => {
  await connection('ongs').del();
  await connection('incidents').del();
});

describe('GET /incidents', () => {
  context('when there are no incidents', () => {
    it('returns an empty array', async () => {
      const response = await request(api).get('/api/v1/incidents');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.incidents).toEqual([]);
    });
  });

  context('when there are one or more incidents', () => {
    it('returns an array of incidents', async () => {
      await incidentFactory.createMany(ongId, 6);

      const response = await request(api).get('/api/v1/incidents');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.incidents.length).toEqual(5);
    });
  });
});
