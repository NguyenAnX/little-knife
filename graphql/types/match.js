import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { playerType } from "./player.js";

export const matchType = new GraphQLObjectType({
  name: "Match",
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    round: {
      type: GraphQLInt,
    },
    isFinished: {
      type: GraphQLBoolean,
    },
    players: {
      type: GraphQLList(playerType),
      resolve: (parent) => {
        return Object.keys(parent.players).map((id) => parent.players[id]);
      },
    },
  },
});
