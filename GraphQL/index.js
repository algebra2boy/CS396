import express from 'express';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import graphqlResolver from './resolvers/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

const schema = makeExecutableSchema({
  typeDefs: loadSchemaSync('schemas/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers: graphqlResolver,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));