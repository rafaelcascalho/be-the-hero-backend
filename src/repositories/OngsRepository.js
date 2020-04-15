const connection = require('../database/connection');

module.exports = {
  async all() {
    return connection('ongs').select('*');
  },

  async create({ id, name, email, whatsapp, city, uf }) {
    return connection('ongs').insert({ id, name, email, whatsapp, city, uf });
  },

  async delete(id) {
    return connection('ongs').where('id', id).del();
  },

  async findOne({ id, name }) {
    let ongs = [];
    if (id) {
      ongs = await connection('ongs').where('id', id);
    } else {
      ongs = await connection('ongs').where('name', name);
    }

    if (ongs.length !== 0) {
      return ongs[0];
    }
    return undefined;
  },
};
