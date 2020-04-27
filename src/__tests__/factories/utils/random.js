const ufsAndCities = require('./ufsAndCities');

const genRandomNumber = (roof = 26) => Math.floor(Math.random() * roof);

const getCitiesNumber = (index) => ufsAndCities[index].cidades.length;

const getSiglaUf = (index) => ufsAndCities[index].sigla;

module.exports = {
  city(index) {
    const roof = getCitiesNumber(index);
    const cityIndex = genRandomNumber(roof);

    return ufsAndCities[index].cidades[cityIndex];
  },

  uf() {
    const ufIndex = genRandomNumber();

    return {
      index: ufIndex,
      name: getSiglaUf(ufIndex),
    };
  },
};
