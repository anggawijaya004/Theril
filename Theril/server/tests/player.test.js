const Game = require("../logic/Turns");
const g = new Game();
const Player = require("../logic/Player");
const player = new Player("Wyrdhn");
const player2 = new Player("Hehe");
const player3 = new Player("Wuehehe");
const { LuxuryShop, Market } = require("../logic/Tiles");
const ls = new LuxuryShop();
const m = new Market();

g.assign(player);
g.assign(player2);
g.assign(player3);

g.setPlays();
g.setGolds();
g.initialize();

g.changeTurn();

player2.move("", m);
g.checkTurn();
player2.move(m, ls);
g.checkTurn();

const assist = player.assistants[0];

describe("game starts", () => {
  test("should have names", (done) => {
    expect(player.name).toBeTruthy();
    done();
  });

  test("names should be defined", (done) => {
    expect(player.name).toBeDefined();
    done();
  });

  test("should be assigned as playerOne or two", (done) => {
    expect(player.isPlayerOne).toBeTruthy();
    done();
  });

  test("playerOne or two should be defined", (done) => {
    expect(player.isPlayerOne).toBeDefined();
    done();
  });

  test("must not start the game in a tiles", (done) => {
    expect(player.currentLocation).toBeFalsy();
    done();
  });

  test("start with lvl0 cart", (done) => {
    expect(player.cart).toBe(0);
    done();
  });

  test("cart capacity should be 2", (done) => {
    expect(player.capacity).toBe(2);
    done();
  });

  test("starting money for playerOne should be 5", (done) => {
    expect(player.gold).toBe(5);
    done();
  });

  test("starting money for playerTwo should be 8", (done) => {
    expect(player2.gold).toBe(8);
    done();
  });

  test("assistants should be an array", (done) => {
    expect(player.assistants).toBeInstanceOf(Array);
    done();
  });

  test("should start with 2 assistants", (done) => {
    expect(player.assistants.length).toBe(2);
    done();
  });

  test("assistants should be an Instance of class Assistant", (done) => {
    expect(player.assistants).toContainEqual({
      jailed: false,
      potentialDuration: 6,
      jailedDuration: 0,
      onDuty: false,
      stealChance: 0.25,
      stolenItem: false,
      workLocation: "",
    });
    done();
  });

  test("starting resources should be an array", (done) => {
    expect(player.resources).toBeInstanceOf(Array);
    done();
  });

  test("starting resources should have three types", (done) => {
    expect(player.resources.length).toBe(3);
    done();
  });

  test("starting resources should have foods", (done) => {
    expect(player.resources).toContainEqual({
      type: { price: 2 },
      amount: 1,
      isFull: false,
    });
    done();
  });

  test("starting resources should have clothing", (done) => {
    expect(player.resources).toContainEqual({
      type: { price: 2 },
      amount: 1,
      isFull: false,
    });
    done();
  });

  test("starting resources should have jewelry", (done) => {
    expect(player.resources).toContainEqual({
      type: { price: 2 },
      amount: 1,
      isFull: false,
    });
    done();
  });

  test("items should be array", (done) => {
    expect(player.items).toBeInstanceOf(Array);
    done();
  });

  test("should not have any items at game start", (done) => {
    expect(player.items.length).toBe(0);
    done();
  });

  test("starting diamond should be 0", (done) => {
    expect(player.diamond).toBe(0);
    done();
  });

  test("starting movement should be 1", (done) => {
    expect(player.movement).toBe(1);
    done();
  });

  test("should reject player if room is already full", (done) => {
    expect(g.assign(player3)).toEqual({ msg: "Game is already full" });
    done();
  });

  test("should change turn", (done) => {
    expect(g.activeCharacter).toBe(player.name);
    done();
  });

  test("should change turn back", (done) => {
    function asd() {
      return new Promise((_resolve) => {
        g.changeTurn();
      })
        .then((_) => {
          expect(g.activeCharacter).toBe(player.name);
          resolve(true);
        })
        .catch(console.log);
    }
    asd();
    done();
  });

  test("should change turn back (else)", (done) => {
    function asd() {
      return new Promise((_resolve) => {
        g.changeTurn();
      })
        .then((_) => {
          expect(g.activeCharacter).toBe(player2.name);
          resolve(true);
        })
        .catch(console.log);
    }
    asd();
    done();
  });

  test("should not allow player to move if it's not their turn", (done) => {
    expect(player2.move(ls, m)).toEqual({ msg: "It's not your turn" });
    done();
  });
});

describe("assistants", () => {
  test("should not be jailed at first", (done) => {
    expect(assist.jailed).toBeFalsy();
    done();
  });

  test("max jail duration should be 6", (done) => {
    expect(assist.potentialDuration).toBe(6);
    done();
  });

  test("should not have jail duration", (done) => {
    expect(assist.jailedDuration).toBe(0);
    done();
  });
  test("should not be on duty at first", (done) => {
    expect(assist.onDuty).toBeFalsy();
    done();
  });

  test("should have steal chance", (done) => {
    expect(assist.stealChance).toBeCloseTo(0.25);
    done();
  });

  test("should not have stolen item", (done) => {
    expect(assist.stolenItem).toBeFalsy();
    done();
  });

  test("work location should be none at first", (done) => {
    expect(assist.workLocation).toBeFalsy();
    done();
  });
});
