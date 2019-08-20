import {
  getHomePlanetByIdCallback,
  getHomePlanetByIdP,
  getPersonAndHomeWorldById,
  getNameByIdWithTimeout,
} from './main';

// to set the default timeout
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('getHomePlanetByIdCallback', () => {
  test('return planet name', done => {
    getHomePlanetByIdCallback(1, (err, planetName) => {
      try {
        expect(planetName).toEqual('Tatooine');
        done();
      } catch (error) {
        done.fail(error);
      }
    });
  });

  test('getHomePlanetByIdP', () => {
    return getHomePlanetByIdP(1).then(planetName => {
      expect(planetName).toEqual('Tatooine');
    });
  });

  test('getNameByIdWithTimeout', async () => {
    expect.assertions(1);
    // return (
    //   getNameByIdWithTimeout(1, 500)
    //     // .then(result => {
    //     //   return Promise.reject(new Error('bad'));
    //     // })
    //     .catch(err => {
    //       expect(err.message).toBe('timeout');
    //     })
    // );

    try {
      await getNameByIdWithTimeout(1, 500);
    } catch (err) {
      expect(err.message).toBe('timeout');
    }
  });

  test('getPersonAndHomeWorldById', async () => {
    const person = await getPersonAndHomeWorldById(1);
    expect(person.name).toEqual('Luke Skywalker');
    expect(person.homeworld.name).toEqual('Tatooine');

    // return getPersonAndHomeWorldById(1).then(person => {
    //   expect(person.name).toEqual('Luke Skywalker');
    //   expect(person.homeworld.name).toEqual('Tatooine');
    // });
  });
});
