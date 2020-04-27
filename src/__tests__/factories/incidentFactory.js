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

module.exports = {
  build: () => ({
    title: chance.string(titleOptions),
    description: chance.string(descriptOptions),
    value: parseFloat(chance.dollar({ max: 100000 }).replace('$', '')),
  }),

  create: async () => {
    async (ongId) => {
      let incident = this.build();
      incident.ong_id = ongId;

      const [id] = await connection('incidents').insert(incident, 'id');

      incident.id = id;
      return incident;
    };
  },

  createMany: async () => {
    let incidents = [];
    for (let index = 0; index < numberOfIncidents; index++) {
      let incident = this.build();
      incident.ong_id = ongId;

      await connection('incidents').insert(incident);

      incident.value = incident.value.toFixed(2);
      incident.value = incident.value.toString();

      incidents.push(incident);
    }

    return incidents;
  },
};
