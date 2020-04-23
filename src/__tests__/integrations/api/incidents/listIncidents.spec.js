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
  await connection.migrate.rollback();
  await connection.migrate.latest();

  const Ong = await ongFactory.create();
  ong = Ong;
});

afterAll(async () => {
  await connection('ongs').del();
  await connection('incidents').del();

  await connection.destroy();
});

describe('GET /incidents', () => {
  context('given no incidents exist', () => {
    it('returns an empty array', async () => {
      const response = await request(api)
        .get('/api/v1/incidents')
        .set('Content-type', 'application/json')
        .set('authorization', ong.id);

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.incidents).toEqual([]);
    });
  });

  context('given one or more incidents exist', () => {
    it('returns an array of incidents', async () => {
      let incidents = await incidentFactory.createMany(ong.id, 6);
      incidents = incidents.map(addOngFields).slice(0, 5);

      const response = await request(api)
        .get('/api/v1/incidents')
        .set('Content-type', 'application/json')
        .set('authorization', ong.id);

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.incidents).toMatchObject(incidents);
    });
  });
});
