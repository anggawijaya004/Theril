const { WainWright } = require("../logic/Tiles");
const ww = new WainWright();

const Player = require("../logic/Player");
const player = new Player("Wyrdhn");
const player2 = new Player("Hehe");
const player3 = new Player("Wuehehe");
const player4 = new Player("ASDASD");
const player5 = new Player("345345345");

player.gold = 10;
player2.gold = 0;

ww.upgrade(player);
ww.upgrade(player2);

player3.assistants[0].work();
player3.assistants[1].work();

ww.upgrade(player3);

player4.cart = 4;
ww.upgrade(player4);

player5.hasDone = 2;

describe("Wain Wright", () => {
  test("should have names", (done) => {
    expect(ww.tileName).toBe("Wain Wright");
    done();
  });

  test("should not have any visitor at first", (done) => {
    expect(ww.tileStatus).toBeFalsy();
    done();
  });

  test("should upgrade player's cart", (done) => {
    expect(player.cart).toBe(1);
    done();
  });

  test("should reject actions if player dont have enough money", (done) => {
    expect(ww.upgrade(player2)).toEqual({
      msg: "You dont have money to do this",
    });
    done();
  });

  test("should reject actions if player dont have free assistant", (done) => {
    expect(ww.upgrade(player3)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });

  test("should reject actions if player cart is already at max level", (done) => {
    expect(ww.upgrade(player4)).toEqual({ msg: "Your cart is at max level" });
    done();
  });

  test("should reject actions if it's not player's turn", (done) => {
    expect(ww.upgrade(player5)).toEqual({
      msg: "It's not your turn",
    });
    done();
  });
});
