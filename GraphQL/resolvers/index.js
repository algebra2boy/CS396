import { authorsResolvers } from './authors.js';
import { booksResolvers } from './books.js';

const rootResolver = {};

const resolvers = [
    rootResolver,
    authorsResolvers,
    booksResolvers,
];

export default resolvers;