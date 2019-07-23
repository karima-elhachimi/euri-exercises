#### 1. getById

./api/users.spec.js

```js
import nock from 'nock';

import * as userApi from './users';

describe('users api', () => {
  /** @type {nock.Scope} */
  let mockApi;

  let pattyBouvier;
  let ednaKrabappel;

  beforeEach(() => {
    mockApi = nock('http://localhost:3000');
  });

  beforeEach(() => {
    pattyBouvier = {
      isFamily: true,
      birthDate: '1977-10-23T23:00:00.000Z',
      gender: 'F',
      lastName: 'Bouvier',
      firstName: 'Patty',
      id: 6
    };

    ednaKrabappel = {
      isFamily: false,
      gender: 'F',
      lastName: 'Krabappel',
      firstName: 'Edna',
      id: 8
    };
  });

  describe('getById', () => {
    beforeEach(() => {
      mockApi //
        .get('/users/6')
        .reply(200, pattyBouvier)
        .get('/users/8')
        .reply(200, ednaKrabappel);
    });

    test('it returns the id', async () => {
      const user = await userApi.getById(pattyBouvier.id);

      expect(user).toHaveProperty('id', pattyBouvier.id);
    });

    test('it returns the firstName', async () => {
      const user = await userApi.getById(pattyBouvier.id);

      expect(user).toHaveProperty('firstName', pattyBouvier.firstName);
    });

    test('it returns the lastName', async () => {
      const user = await userApi.getById(pattyBouvier.id);

      expect(user).toHaveProperty('lastName', pattyBouvier.lastName);
    });

    test('it returns the birthDate as date if present', async () => {
      const user = await userApi.getById(pattyBouvier.id);

      expect(user).toHaveProperty(
        'birthDate',
        new Date(pattyBouvier.birthDate)
      );
    });

    test('guard it does not return the birthDate if not present', async () => {
      const user = await userApi.getById(ednaKrabappel.id);

      expect(user).not.toHaveProperty('birthDate');
    });

    test('it returns the gender', async () => {
      const user = await userApi.getById(pattyBouvier.id);

      expect(user).toHaveProperty('gender', pattyBouvier.gender);
    });

    test('it returns the isFamily', async () => {
      const user = await userApi.getById(pattyBouvier.id);

      expect(user).toHaveProperty('isFamily', pattyBouvier.isFamily);
    });
  });
});
```

./api/user-mapper.js

```js
export default function map(resource) {
  const user = { ...resource };
  if (user.birthDate) user.birthDate = new Date(user.birthDate);
  return user;
}
```

./api.users.js

```js
import api from './user-api-client';
import mapper from './user-mapper';

export async function getById(id) {
  const res = await api.get(`users/${id}`);
  return mapper(res.data);
}
```

#### 2. listPaged

./api/users.spec.js

```js
describe('listPaged', () => {
    beforeEach(() => {
      mockApi //
        .get('/users')
        .query({
          _page: 2,
          _limit: 5,
          _sort: 'lastName,firstName',
        })
        .reply(200, [pattyBouvier, ednaKrabappel], { 'x-total-count': 7 });
    });

    test('it returns the value of the x-total-count response header as total', async () => {
      const { total } = await userApi.listPaged(2, 5);

      expect(total).toStrictEqual(7);
    });

    test('it returns the results as data', async () => {
      const { data } = await userApi.listPaged(2, 5);

      expect(data).toEqual([
        {
          ...pattyBouvier,
          birthDate: new Date(pattyBouvier.birthDate),
        },
        ednaKrabappel,
      ]);
    });
  });
});
```

./api/users.js

```js
export async function listPaged(page, limit = 10) {
  const res = await api.get('users', {
    params: {
      _page: page,
      _limit: limit,
      _sort: 'lastName,firstName'
    }
  });

  return {
    total: +res.headers['x-total-count'],
    data: res.data.map(resource => mapper(resource))
  };
}
```

#### 3. save

./api/users.spec.js

```js
describe('save', () => {
  test('it stores the user if user is new', async () => {
    const { id, ...rest } = pattyBouvier;
    const newUser = { ...rest };

    mockApi //
      .post('/users', newUser)
      .reply(200, pattyBouvier);

    const user = await userApi.save(newUser);

    expect(user).toEqual({
      ...pattyBouvier,
      birthDate: new Date(pattyBouvier.birthDate)
    });
  });

  test('it updates the user if the user has an id', async () => {
    mockApi //
      .put('/users/6', pattyBouvier)
      .reply(200, ednaKrabappel);

    const user = await userApi.save(pattyBouvier);

    expect(user).toEqual(ednaKrabappel);
  });
});
```

./api/users.js

```js
export async function save(user) {
  const res = await (user.id //
    ? api.put(`users/${user.id}`, user)
    : api.post('users', user));

  return mapper(res.data);
}
```
