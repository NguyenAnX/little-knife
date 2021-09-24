class GuestMatchManager {
  constructor() {
    if (GuestMatchManager._instance) {
      return GuestMatchManager._instance;
    }
    GuestMatchManager._instance = this;
    this.matches = [];
    this.nextMatchId = 1;
  }

  startNewMatch(matchData) {
    const msg = this.isValidMatchData(matchData);
    if (msg) {
      throw new Error(`Invalid match data: ${msg}`);
    }

    let players = {};
    for (let i = 0; i < matchData.players.length; i++) {
      const p = matchData.players[i];
      players[i] = {
        id: i,
        name: p,
        curScore: 0,
        preScore: 0,
      };
    }
    let newMatch = {
      id: this.nextMatchId++,
      name: matchData.name,
      round: 1,
      players: players,
      isFinished: false,
      canRollback: false,
    };
    this.matches[newMatch.id] = newMatch;

    return newMatch;
  }

  isValidMatchData(matchData) {
    if (!matchData.name) {
      return "please fill the match name";
    }
    if (matchData.players.length < 2) {
      return "please add at least 2 players";
    }

    return "";
  }

  getMatch(id) {
    if (!this.matches[id]) {
      throw new Error("match not found");
    }
    return this.matches[id];
  }

  finishRound({ matchId, players }) {
    if (!this.validateRound(players)) {
      throw new Error("Invalid round data");
    }
    let match = this.matches[matchId];
    match.round++;
    match.canRollback = true;
    for (let p of players) {
      match.players[p.id].preScore = match.players[p.id].curScore;
      match.players[p.id].curScore += p.gainScore;
    }

    return match;
  }

  rollbackPreviousRound(matchId) {
    let match = this.matches[matchId];
    console.log(this.matches, match, matchId);
    if (!match.canRollback) {
      throw new Error("Can only rollback one round");
    }

    match.round--;
    match.canRollback = false;
    Object.keys(match.players).forEach((playerId) => {
      match.players[playerId].curScore = match.players[playerId].preScore;
    });

    return match;
  }

  validateRound(players) {
    let sum = 0;
    for (let p of players) {
      sum += p.gainScore;
    }

    return sum == 0;
  }

  finishMatch(matchId) {
    let match = this.matches[matchId];
    match.isFinished = true;
    return match;
  }
}

export default new GuestMatchManager();
