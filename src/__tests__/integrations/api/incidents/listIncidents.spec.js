const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const incidentFactory = require('../../../factories/incidentFactory');
const connection = require('../../../../database/connection');

let ong;

const addOngFields = (incident) => {
  incident.uf = ong.uf;
  incident.city = ong.city;
  incident.email = ong.email;
  incident.whatsapp = ong.whatsapp;
  return incident;
};

beforeAll(async () => {
  const Ong = await ongFactory.create();
  ong = Ong;
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
      let incidents = await incidentFactory.createMany(ong.id, 6);
      incidents = incidents.map(addOngFields).slice(0, 5);

      const response = await request(api).get('/api/v1/incidents');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.incidents).toMatchObject(incidents);
    });
  });
});
