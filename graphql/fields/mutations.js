import { GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { finishRound, startGuestMatch, finishMatch, rollbackPreviousRound } from "../resolvers/match.js";
import { matchType } from "../types/match.js";

export const mutationFields = {
  startGuestMatch: {
    type: matchType,
    args: {
      name: {type: GraphQLString},
      players: {
        type: GraphQLList(GraphQLString),
      }
    },
    resolve: startGuestMatch
  },

  finishRound: {
    type: matchType,
    args: {
      matchId: {type: GraphQLInt},
      players: {
        type: GraphQLList(new GraphQLInputObjectType({
          name: 'RoundPlayerInput',
          fields: {
            id: {type: GraphQLInt},
            gainScore: {type: GraphQLInt},
          }
        }))
      }
    },
    resolve: finishRound
  },

  finishMatch: {
    type: matchType,
    args: {
      id: {type: GraphQLInt},
    },
    resolve: finishMatch
  },

  rollbackPreviousRound: {
    type: matchType,
    args: {
      matchId: {type: GraphQLInt},
    },
    resolve: rollbackPreviousRound
  }
}

