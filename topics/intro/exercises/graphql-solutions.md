# Graphql solutions

## 1. Get a list of all users ordered by firstName

```bash
query {
  allUsers(orderBy: "firstName") {
	user {
        id
        firstName
        lastName
        age
        email
        image
        phone
        company
        address {
            street
            city
            zip
        }
    }
  }
}
```

Alternative

```
query {
  allUsers(orderBy: "firstName") {
    edges {
      node {
        id
        firstName
        ...
      }
    }
  }
}
```

## 2. Query a single user (id = 1042) and use a variable

```bash
# query
query getUser($id: Int) {
  user(id: $id) {
	id
    firstName
    lastName
  }
} 
```

```bash
# variables
{
  "id": 1042
}
```

## 3. Add and complete a task

```bash
mutation {
  addTask(desc: "test") {
    task {
      id
      desc
      completed
    }
  }
}
```

```bash
mutation {
  completeTask(id: 5) {
    task {
      id
      desc
      completed
    }
  }
}
```

## 4. Query all products (all fields) & basket with products (all fields) in one query

```bash
# simple  
query {
  basket(checkoutID:"123") {
    items {
      id
      product {
        id
        sku
        title
        desc
        image
        stocked
        basePrice
        price
      }
      quantity
    }
  }
  allProducts {
    edges {
      node {
        id
        sku
        title
        desc
        image
        stocked
        basePrice
        price
      }
    }
  }
}
```

```bash
# with fragment
fragment ProductParts on Product {
  id
  sku
  title
  desc
  image
  stocked
  basePrice
  price
}

query {
  basket(checkoutID: "123") {
    items {
      id
      product {
        ...ProductParts
      }
      quantity
    }
  }
  allProducts {
    edges {
      node {
        ...ProductParts
      }
    }
  }
}
```

```bash
# add item to basket
mutation {
  addItemToBasket(input: {
    checkoutID: "123",
    item: {
      quantity: 1,
      productId: 1
    }
  }) {
    basket {
      items {
        id
        product {
          id
          title
        }
        quantity
      }
    }
  }
}
```