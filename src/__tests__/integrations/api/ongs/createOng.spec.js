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

describe('POST /ongs', () => {
  const newOng = ongFactory.build();

  context('given fields are invalid', () => {
    context('when the name field is missing', () => {
      it('returns name is required', async () => {
        let ongMissingName = ongFactory.build();
        delete ongMissingName.name;

        const response = await request(api)
          .post('/api/v1/ongs')
          .send(ongMissingName)
          .set('Content-type', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toBe('name is required');
      });
    });

    context('when the name field is empty', () => {
      it('returns name is required', async () => {
        let ongWithEmptyName = ongFactory.build();
        ongWithEmptyName.name = '';

        const response = await request(api)
          .post('/api/v1/ongs')
          .send(ongWithEmptyName)
          .set('Content-type', 'application/json');

        expect(response.status).toEqual(400);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toBe('name is not allowed to be empty');
      });
    });
  });

  context('when a new ong is sent', () => {
    it('returns the new ong data', async () => {
      const response = await request(api)
        .post('/api/v1/ongs')
        .send(newOng)
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(201);
      expect(response.body.status).toEqual('success');
      expect(typeof response.body.id).toBe('string');
    });
  });

  context('when the ong already exists', () => {
    it('returns ong already exists', async () => {
      const response = await request(api)
        .post('/api/v1/ongs')
        .send(newOng)
        .set('Content-type', 'application/json');

      expect(response.status).toEqual(409);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('ONG Already Exists');
    });
  });
});
