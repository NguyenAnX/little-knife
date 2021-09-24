import guestMatchManager from "../../logic/guest-match-manager.js";

export const getGuestMatch = (_, args) => {
  return guestMatchManager.getMatch(args.id);
};

export const startGuestMatch = (_, args) => {
  return guestMatchManager.startNewMatch(args);
};

export const finishRound = (_, args) => {
  return guestMatchManager.finishRound(args);
};

export const finishMatch = (_, args) => {
  return guestMatchManager.finishMatch(args.id);
};

export const rollbackPreviousRound = (_, args) => {
  return guestMatchManager.rollbackPreviousRound(args.matchId);
};
