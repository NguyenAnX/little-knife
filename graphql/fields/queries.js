import { GraphQLInt } from "graphql";
import { getGuestMatch } from "../resolvers/match.js";
import { matchType } from "../types/match.js";

export const queryFields = {
  match: {
    type: matchType,
    args: {
      id: { type: GraphQLInt },
    },
    resolve: getGuestMatch
  }
};