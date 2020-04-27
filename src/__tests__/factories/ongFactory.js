const Chance = require('chance');
const chance = new Chance();
const random = require('./utils/random');
const uuid = require('uuid');
const connection = require('../../database/connection');

const genOngName = () =>
  chance.string({ length: 4, pool: 'abcdep', casing: 'upper' });

const build = () => {
  const ongName = genOngName();
  const ongUf = random.uf();
  return {
    name: ongName,
    email: chance.email({ domain: `${ongName.toLowerCase()}.org` }),
    whatsapp: Math.floor(Math.random() * 100000000000).toString(),
    city: random.city(ongUf.index),
    uf: ongUf.name,
  };
};

module.exports = {
  create: async () => {
    let ong = build();
    ong.id = uuid.v4();
    await connection('ongs').insert(ong);
    return ong;
  },

  createMany: async (numberOfOngs) => {
    let ongs = [];
    for (let index = 0; index < numberOfOngs; index++) {
      let ong = build();
      ong.id = uuid.v4();
      await connection('ongs').insert(ong);
      ongs.push(ong);
    }
    return ongs;
  },
};
