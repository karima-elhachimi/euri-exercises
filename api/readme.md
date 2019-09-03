# Api

Home of json-server based api, used during the bootcamp

## Fake Api

```bash
npm start
```

### Users

http://localhost:3000/users

- isFamily {Boolean} - Indicates whether or not the user is seen as a family member
- birthDate {String?} - The birthDate of the user (date in json format)
- gender {'M'|'F'} - The gender
- lastName {String}
- firstName {String}

### Todos

http://localhost:3000/todos

- id {number}
- name {string}
- completed {bool?}
