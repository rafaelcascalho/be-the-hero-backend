const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const incidentFactory = require('../../../factories/incidentFactory');
const connection = require('../../../../database/connection');

let ongId;

afterAll(async () => {
  await connection('ongs').del();
});

describe('GET /profile', () => {
  context('when the ong does not exist', () => {
    it('returns ong not found', async () => {
      const unexistentOngId = 9999;

      const response = await request(api)
        .get('/api/v1/profile')
        .set('Content-type', 'application/json')
        .set('authorization', unexistentOngId);

      expect(response.status).toEqual(404);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('ONG Not Found');
    });
  });

  context('when the ong does exists', () => {
    context('when the ong has no incidents', () => {
      it('returns and empty array', async () => {
        const ong = await ongFactory.create();
        ongId = ong.id;

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
      it('returns an array of objects', async () => {
        await incidentFactory.createMany(ongId, 4);

        const response = await request(api)
          .get('/api/v1/profile')
          .set('Content-type', 'application/json')
          .set('authorization', ongId);

        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('success');
        expect(response.body.incidents.length).toEqual(4);
      });
    });
  });
});
