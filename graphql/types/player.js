import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const playerType = new GraphQLObjectType({
  name: 'Player',
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    curScore: {type: GraphQLInt},
    preScore: {type: GraphQLInt},
  }
});