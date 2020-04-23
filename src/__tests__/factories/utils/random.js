const ufsAndCities = require('./ufsAndCities');

const genRandomNumber = (roof = 28) => Math.floor(Math.random() * roof);

const getCitiesNumber = (index) => ufsAndCities[index].cidades.length;

const getSiglaUf = (index) => ufsAndCities[index].sigla;

module.exports = {
  city(index) {
    try {
      const roof = getCitiesNumber(index);
      const cityIndex = genRandomNumber(roof);

      return ufsAndCities[index].cidades[cityIndex];
    } catch (error) {
      return 'Goiânia';
    }
  },

  uf() {
    try {
      const ufIndex = genRandomNumber();

      return {
        index: ufIndex,
        name: getSiglaUf(ufIndex),
      };
    } catch (error) {
      return {
        index: 9,
        name: 'GO',
      };
    }
  },
};
