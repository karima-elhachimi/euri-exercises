import request from 'superagent';

function setTimeoutP(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export function httpGet(url) {
  return new Promise((resolve, reject) => {
    request.get(url).end((err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res.body);
    });
  });
}

export function getNameByIdWithTimeout(peopleId, timeout) {
  return Promise.race([setTimeoutP(timeout), httpGet('https://swapi.co/api/people/1')]).then(data => {
    if (!data) {
      throw new Error('timeout');
    }
    return data;
  });
}

export async function getPersonAndHomeWorldById(peopleId) {
  const person = await httpGet(`https://swapi.co/api/people/${peopleId}`);
  person.homeworld = await httpGet(person.homeworld);
  return person;

  // let person;
  // return httpGet(`https://swapi.co/api/people/${peopleId}`)
  //   .then(data => {
  //     person = data;
  //     return httpGet(data.homeworld);
  //   })
  //   .then(data => {
  //     person.homeworld = data;
  //     return person;
  //   });
}

export function getHomePlanetByIdP(peopleId) {
  return httpGet('https://swapi.co/api/people/1')
    .then(data => {
      return httpGet(data.homeworld);
    })
    .then(data => {
      return data.name;
    });
}

export function getHomePlanetByIdCallback(peopleId, callback) {
  request.get('https://swapi.co/api/people/1').end((err, res) => {
    if (err) {
      callback(err);
      return;
    }
    request.get(res.body.homeworld).end((err2, res2) => {
      if (err2) {
        callback(err);
        return;
      }
      callback(null, res2.body.name);
    });
  });
}
