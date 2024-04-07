import { authors, books } from '../data/data.js';

export const authorsResolvers = {
  Query: {
    authors: () => authors,
    author: (parent, { id }) => {
      return authors.find((author) => author.id === id);
    }
  },
  Author: {
    books: (author) => {
      return books.filter((book) => book.authorId === author.id);
    }
  }
};