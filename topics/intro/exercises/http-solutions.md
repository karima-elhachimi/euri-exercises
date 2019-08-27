# HTTP/REST solutions

```bash
# Get a list of all users ordered by lastName desc 
GET https://euri-test-api-phflgvcuay.now.sh/api/users/1003?sort=lastName-
```

```bash
# Get a paginated list of users where the pageSize is 5 and get the 
# second page. As a bonus find out how the api communicates the
# total amount of users 
GET https://euri-test-api-phflgvcuay.now.sh/api/users?page=1&pageSize=3
```

```bash
# Get the user with the id 1003
GET https://euri-test-api-phflgvcuay.now.sh/api/users/1003
```

```bash
# Create a new user with the data of yourself
POST https://euri-test-api-phflgvcuay.now.sh/api/users 
Content-Type: application/json

{
    "firstName": "Peter",
    "lastName": "Cosemans",
    "age": 55,
    "email": "peter.cosemans@gmail.com"
}
```

```bash
# Remove yourself again
DELETE https://euri-test-api-phflgvcuay.now.sh/api/users/[yourId] 
```

```bash
#  Get the basket with items & product description
GET https://euri-test-api-phflgvcuay.now.sh/api/basket/xyz
GET https://euri-test-api-phflgvcuay.now.sh/api/products/1
GET https://euri-test-api-phflgvcuay.now.sh/api/products/2
```