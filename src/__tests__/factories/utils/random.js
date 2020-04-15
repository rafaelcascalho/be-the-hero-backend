const ufsAndCities = require('./ufsAndCities');

const genRandomNumber = (roof = 28) => Math.floor(Math.random() * roof);

const getCitiesNumber = (index) => {
  try {
    return ufsAndCities[index].cidades.length;
  } catch (error) {
    return 5;
  }
};

const getSiglaUf = (index) => {
  try {
    return ufsAndCities[index].sigla;
  } catch (error) {
    return 'GO';
  }
};

module.exports = {
  city(index) {
    const roof = getCitiesNumber(index);
    const cityIndex = genRandomNumber(roof);

    console.log(index);

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
