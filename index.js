import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
} from "graphql";
import cors from "cors";
import { mutationFields } from "./graphql/fields/mutations.js";
import { queryFields } from "./graphql/fields/queries.js";

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: queryFields,
});

const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: mutationFields,
});

const schema = new GraphQLSchema({ query: rootQuery, mutation: rootMutation });
const PORT = 4000;
var app = express();
app.use(cors({ origin: "*" }));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
});
