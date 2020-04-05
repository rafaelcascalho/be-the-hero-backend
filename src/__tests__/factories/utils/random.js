const ufsAndCities = require('./ufsAndCities');

const genRandomNumber = (roof = 28) => Math.floor(Math.random() * roof);

module.exports = {
  city(index) {
    const roof = ufsAndCities[index].cidades.length || 5;
    const cityIndex = genRandomNumber(roof);

    return ufsAndCities[index].cidades[cityIndex];
  },

  uf() {
    const ufIndex = genRandomNumber();

    return {
      index: ufIndex,
      name: ufsAndCities[ufIndex].sigla
    };
  }
};
