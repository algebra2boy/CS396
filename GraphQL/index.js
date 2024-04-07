import express from 'express';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql'; // let you build a graphQL API with express
import { makeExecutableSchema } from '@graphql-tools/schema'; // let you build a schema from typeDefs and resolvers
import { loadSchemaSync } from '@graphql-tools/load'; // let you load schema from files
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'; // oads documents and type definitions from .graphql files
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
    graphiql: true, // enable the graphiql interface (UI)
  })
);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));