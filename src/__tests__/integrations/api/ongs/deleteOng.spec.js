const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const incidentFactory = require('../../../factories/incidentFactory');
const connection = require('../../../../database/connection');
const uuid = require('uuid');

afterAll(async () => {
  await connection('ongs').del();
});

describe('DELETE /ongs/:id', () => {
  context('given the ong id is not send', () => {
    it('returns ong id must be a valid GUID', async () => {
      const response = await request(api).delete(`/api/v1/ongs/null`);

      expect(response.status).toEqual(400);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('id must be a valid GUID');
    });
  });

  context('given the ong does not exist', () => {
    it('returns ong not found', async () => {
      const id = uuid.v4();

      const response = await request(api).delete(`/api/v1/ongs/${id}`);

      expect(response.status).toEqual(404);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('ONG Not Found');
    });
  });

  context('given the ong exists', () => {
    context('whe the ong has no incidents', () => {
      it('returns success', async () => {
        const ong = await ongFactory.create();

        const response = await request(api).delete(`/api/v1/ongs/${ong.id}`);

        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('success');
      });
    });

    context('when the ong has incidents', () => {
      it('returns success and deletes the incidents', async () => {
        const ong = await ongFactory.create();
        await incidentFactory.createMany(ong.id, 3);

        const response = await request(api).delete(`/api/v1/ongs/${ong.id}`);
        const remaining = await connection('incidents')
          .where('ong_id', ong.id)
          .select('*');

        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('success');
        expect(remaining).toEqual([]);
      });
    });
  });
});
