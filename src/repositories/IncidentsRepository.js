const connection = require('../database/connection');

const selectionFields = [
  'incidents.*',
  'ongs.email',
  'ongs.whatsapp',
  'ongs.uf',
  'ongs.city'
];

module.exports = {
  async all(page) {
    return connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(selectionFields);
  },

  async find(ong_id) {
    return connection('incidents')
      .where('ong_id', ong_id)
      .select('*');
  },

  async count() {
    return connection('incidents').count();
  },

  async create({ title, description, value, ong_id }) {
    return connection('incidents').insert(
      { title, description, value, ong_id },
      'id'
    );
  },

  async delete(id) {
    return connection('incidents')
      .where('id', id)
      .del();
  },

  async findOne({ id, title }) {
    let incidents = [];

    if (id) {
      incidents = await connection('incidents').where('id', id);
    } else {
      incidents = await connection('incidents').where('title', title);
    }

    if (incidents.length !== 0) {
      return incidents[0];
    }
    return undefined;
  }
};
