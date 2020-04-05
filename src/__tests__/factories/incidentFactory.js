const Chance = require('chance');
const chance = new Chance();
const connection = require('../../database/connection');

const titleOptions = {
  length: 32,
  alpha: false,
  numeric: false,
  symbols: false,
};

const descriptOptions = {
  length: 250,
  alpha: false,
  numeric: false,
  symbols: false,
};

const build = () => ({
  title: chance.string(titleOptions),
  description: chance.string(descriptOptions),
  value: parseFloat(chance.dollar({ max: 100000 }).replace('$', '')),
});

const create = async (ongId) => {
  let incident = build();
  incident.ong_id = ongId;
  const [id] = await connection('incidents').insert(incident, 'id');
  incident.id = id;
  return incident;
};

const createMany = async (ongId, numberOfIncidents) => {
  let incidents = [];
  for (let index = 0; index < numberOfIncidents; index++) {
    let incident = build();
    incident.ong_id = ongId;
    incident = await connection('incidents').insert(incident);
    incidents.push(incident);
  }
  return incidents;
};

module.exports = {
  build,
  create,
  createMany,
};
