class Game {
  constructor() {
    this.players = [];
    this.activeCharacter = null;
  }

  assign(player) {
    if (this.players.length < 2) {
      this.players.push(player);
    } else return { msg: "Game is already full" };
  }

  setPlays() {
    this.players[0].isPlayerOne = true;
  }

  setGolds() {
    this.players.map((player) =>
      player.isPlayerOne ? (player.gold = 5) : (player.gold = 8)
    );
  }

  initialize() {
    this.activeCharacter = this.players[0].name;
  }

  changeTurn() {
    if (this.activeCharacter === this.players[0].name) {
      this.activeCharacter = this.players[1].name;
    } else {
      this.activeCharacter = this.players[0].name;
    }
  }

  checkTurn() {
    const current = this.players.filter(
      (player) => player.name === this.activeCharacter
    );
    if (current[0].hasDone === 2) {
      this.changeTurn();
    }
  }
}

module.exports = Game;
