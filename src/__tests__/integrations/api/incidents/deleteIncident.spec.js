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

describe('DELETE /incidents/:id', () => {
  context('when the incident does not exist', () => {
    it('returns ong not found', async () => {
      const id = 9999;

      const response = await request(api)
        .delete(`/api/v1/incidents/${id}`)
        .set('Content-type', 'application/json')
        .set('authorization', ongId);

      expect(response.status).toEqual(404);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('Incident Not Found');
    });
  });

  context('when the incident exists', () => {
    context('when the ong is not the owner', () => {
      const invalidOngId = 9999;

      it('returns error', async () => {
        const incident = await incidentFactory.create(ongId);

        const response = await request(api)
          .delete(`/api/v1/incidents/${incident.id}`)
          .set('Content-type', 'application/json')
          .set('authorization', invalidOngId);

        expect(response.status).toEqual(401);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('Operation Not Permitted');
      });
    });

    context('when the ong is the owner', () => {
      it('returns success', async () => {
        const incident = await incidentFactory.create(ongId);

        const response = await request(api)
          .delete(`/api/v1/incidents/${incident.id}`)
          .set('Content-type', 'application/json')
          .set('authorization', ongId);

        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('success');
      });
    });
  });
});
