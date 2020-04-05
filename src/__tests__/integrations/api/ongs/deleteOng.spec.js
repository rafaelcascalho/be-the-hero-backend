const api = require('../../../../config/app');
const request = require('supertest');
const ongFactory = require('../../../factories/ongFactory');
const incidentFactory = require('../../../factories/incidentFactory');
const connection = require('../../../../database/connection');

afterAll(async () => {
  await connection('ongs').del();
});

describe('DELETE /ongs/:id', () => {
  context('when the ong does not exist', () => {
    it('returns ong not found', async () => {
      const id = 9999;

      const response = await request(api).delete(`/api/v1/ongs/${id}`);

      expect(response.status).toEqual(404);
      expect(response.body.status).toEqual('error');
      expect(response.body.message).toEqual('ONG Not Found');
    });
  });

  context('when the ong exists', () => {
    context('and has no incidents', () => {
      it('returns success', async () => {
        const ong = await ongFactory.create();

        const response = await request(api).delete(`/api/v1/ongs/${ong.id}`);

        expect(response.status).toEqual(200);
        expect(response.body.status).toEqual('success');
      });
    });

    context('and has incidents', () => {
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
