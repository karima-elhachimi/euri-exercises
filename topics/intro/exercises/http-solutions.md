# HTTP/REST solutions

```bash
# Get a list of all users ordered by lastName asc and firstName asc
GET http://localhost:3000/users?_sort=lastName,firstName HTTP/1.1
```

```bash
# Get a paginated list of users where the pageSize is 5 and get the 
# second page. As a bonus find out how the api communicates the
# total amount of users 
GET http://localhost:3000/users?_limit=5&_page=2 HTTP/1.1
```

```bash
# Get the user with the id 2
GET http://localhost:3000/users/2 HTTP/1.1
```

```bash
# Create a new user with the data of yourself
POST http://localhost:3000/users HTTP/1.1
Content-Type: application/json

{
    "firstName": "Peter",
    "lastName": "Cosemans",
    "gender": "M",
    "birthDate": "1964-10-06T19:00:00.000Z"
}
```

```bash
# Remove yourself again
DELETE http://localhost:3000/users/9 HTTP/1.1
```