import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import makeExecutableSchema from '@graphql-tools/schema';

const app = express();

const schema = makeExecutableSchema({
    typeofDefs: `
        type Query {
            _empty: String
        }
    `,
    resolvers: {}
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

ServiceWorkerRegistration.listen(8080, () => console.log('Server running on port 8080'));