const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const connection = require('../../../../database/connection');

afterAll(async () => {
  await connection('ongs').del();
});

describe('POST /sessions', () => {
  context('when the ong does not exist', () => {
    it('returns ong not found', async () => {
      const requestData = { id: 9999 };

      const response = await request(api)
        .post('/api/v1/sessions')
        .send(requestData)
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(404);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('ONG Not Found');
    });
  });

  context('when the ong does exists', () => {
    it('returns the ongs name', async () => {
      const ong = await ongFactory.create();
      const requestData = { id: ong.id };

      const response = await request(api)
        .post('/api/v1/sessions')
        .send(requestData)
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(200);
      expect(response.body.status).toEqual('success');
      expect(response.body.name).toEqual(ong.name);
    });
  });
});
