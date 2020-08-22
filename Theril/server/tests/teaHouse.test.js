const { TeaHouse } = require("../logic/Tiles");
const Game = require("../logic/Turns");
const g = new Game();
const t = new TeaHouse();
const Player = require("../logic/Player");
const player = new Player("Wyrdhn");
const player2 = new Player("Hehe");
const player3 = new Player("Wuehehe");
const player4 = new Player("Wuehehe, asdasdasd");

g.assign(player);
g.assign(player2);

g.setPlays();
g.setGolds();
g.initialize();

player.gold = 0;

player3.assistants[0].work();
player3.assistants[1].work();

t.throwDice(player);
t.throwDice(player2);
t.throwDice(player3);

player4.hasDone = 2;

describe("Tea House", () => {
  test("should have names", (done) => {
    expect(t.tileName).toBe("Tea House");
    done();
  });
  test("should not have any visitor at first", (done) => {
    expect(t.tileStatus).toBeFalsy();
    done();
  });

  test("gambling", (done) => {
    if (t.gamblingResult === "Player One") {
      expect(player2.gold).toBe(13);
    } else if (t.gamblingResult === "AI") {
      expect(player2.gold).toBe(3);
    } else if ((t.gamblingResult = "Draw")) {
      expect(player2.gold).toBe(8);
    }
    done();
  });

  test("should reject transaction if player dont have enough money", (done) => {
    expect(t.throwDice(player)).toEqual({ msg: "You dont have enough gold" });
    done();
  });

  test("should reject transaction if player dont have free assistants", (done) => {
    expect(t.throwDice(player3)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });

  test("should reject transaction if it's not player's turn", (done) => {
    expect(t.throwDice(player4)).toEqual({
      msg: "It's not your turn",
    });
    done();
  });
});
