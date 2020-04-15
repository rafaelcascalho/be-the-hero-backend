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

describe('POST /incidents', () => {
  let incident = incidentFactory.build();

  context('given authorization header is empty', () => {
    it('returns authorization is required', async () => {
      const response = await request(api)
        .post('/api/v1/incidents')
        .send(incident)
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('authorization is required');
    });
  });

  context('when a new incident is sent', () => {
    it('returns the new incident data', async () => {
      const response = await request(api)
        .post('/api/v1/incidents')
        .send(incident)
        .set('Content-type', 'application/json')
        .set('authorization', ongId);

      expect(response.status).toEqual(201);
      expect(response.body.status).toEqual('success');
      expect(typeof response.body.id).toBe('number');
    });
  });

  context('when the incident already exists', () => {
    it('returns incident already exists', async () => {
      const response = await request(api)
        .post('/api/v1/incidents')
        .send(incident)
        .set('Content-type', 'application/json')
        .set('authorization', ongId);

      expect(response.status).toEqual(409);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('Incident Already Exists');
    });
  });
});
