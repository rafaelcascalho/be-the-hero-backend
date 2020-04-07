const Chance = require('chance');
const chance = new Chance();
const random = require('./utils/random');
const crypto = require('crypto');
const connection = require('../../database/connection');

const genOngName = () =>
  chance.string({ length: 4, pool: 'abcdep', casing: 'upper' });

const genId = () => crypto.randomBytes(8).toString('HEX');

const build = () => {
  const ongName = genOngName();
  const ongUf = random.uf();
  return {
    name: ongName,
    email: chance.email({ domain: `${ongName.toLowerCase()}.org` }),
    whatsapp: chance.phone(),
    city: random.city(ongUf.index),
    uf: ongUf.name,
  };
};

const create = async () => {
  let ong = build();
  ong.id = genId();
  await connection('ongs').insert(ong);
  return ong;
};

const createMany = async (numberOfOngs) => {
  let ongs = [];
  for (let index = 0; index < numberOfOngs; index++) {
    let ong = build();
    ong.id = genId();
    await connection('ongs').insert(ong);
    ongs.push(ong);
  }
  return ongs;
};

module.exports = {
  build,
  create,
  createMany,
};
