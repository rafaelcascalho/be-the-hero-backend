const ufsAndCities = require('../../factories/utils/ufsAndCities.json');
const random = require('../../factories/utils/random');

describe('Random', () => {
  context('.city', () => {
    context('when no index is passed', () => {
      it('returns "Goiânia"', () => {
        const result = random.city();

        expect(result).toEqual('Goiânia');
      });
    });

    context('when an index is passed', () => {
      it('returns a string', () => {
        const index = 7;
        const result = random.city(index);

        expect(typeof result).toEqual('string');
      });
    });
  });

  context('.uf', () => {
    it('returns an object with index and uf name', () => {
      const result = random.uf();

      expect(result).toBeInstanceOf(Object);
      expect(result.index).toBeDefined();
      expect(result.index).toBeGreaterThan(0);
      expect(result.index).toBeLessThan(27);
      expect(typeof result.name).toEqual('string');
      expect(result.name.length).toEqual(2);
    });
  });
});
