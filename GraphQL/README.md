## GraphQL

Learning GraphQL using this article: https://betterprogramming.pub/architecting-a-graphql-api-codebase-in-node-js-3a951cd7f0f4

# How to create a mutation

```
mutation {
  createBook(newBook: {
    title: "A cool book created by yongye",
    authorID: 2
  }) {
    id
    title
  }
}
```

# How to set up a query

```
{
  books {
    title
    id
  }
}
```
