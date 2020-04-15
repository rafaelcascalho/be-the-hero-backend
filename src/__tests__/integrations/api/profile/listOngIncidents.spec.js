const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const incidentFactory = require('../../../factories/incidentFactory');
const connection = require('../../../../database/connection');
const uuid = require('uuid');

let ongId;

beforeAll(async () => {
  const ong = await ongFactory.create();
  ongId = ong.id;
});

afterAll(async () => {
  await connection('ongs').del();
});

describe('GET /profile', () => {
  context('given the ong id is not send', () => {
    it('returns authorization is required', async () => {
      const response = await request(api)
        .get('/api/v1/profile')
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('authorization is required');
    });
  });

  context('given the ong does not exist', () => {
    it('returns ong not found', async () => {
      const unexistentOngId = uuid.v4();

      const response = await request(api)
        .get('/api/v1/profile')
        .set('Content-type', 'application/json')
        .set('authorization', unexistentOngId);

      expect(response.status).toEqual(404);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('ONG Not Found');
    });
  });

  context('given the ong exists', () => {
    context('when the ong has no incidents', () => {
      it('returns an empty array', async () => {
        const response = await request(api)
          .get('/api/v1/profile')
          .set('Content-type', 'application/json')
          .set('authorization', ongId);

        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('success');
        expect(response.body.incidents).toEqual([]);
      });
    });

    context('when the ong has one or more incidents', () => {
      it('returns an array of incidents', async () => {
        const incidents = await incidentFactory.createMany(ongId, 4);

        const response = await request(api)
          .get('/api/v1/profile')
          .set('Content-type', 'application/json')
          .set('authorization', ongId);

        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('success');
        expect(response.body.incidents).toMatchObject(incidents);
      });
    });
  });
});
