const { LuxuryShop } = require("../logic/Tiles");
const { Horns, ShadowHand } = require("../logic/LuxuryItems");
const ls = new LuxuryShop();

const Player = require("../logic/Player");
const player = new Player("Wyrdhn");
const player2 = new Player("Hehe");
const player3 = new Player("Wuehehe");
const player4 = new Player("asdasd");
const h = new Horns();
const sh = new ShadowHand();

player.gold = 200;
player4.hasDone = 2;

player2.assistants[0].work();
player2.assistants[1].work();

ls.sellDiamond(player);

ls.transaction(player, "Horns");

player.hasDone = 0;
h.use(player);

ls.transaction(player, "Golden Whistle");

ls.transaction(player, "Strider");

h.use(player);

sh.use(player);

describe("luxury shop", () => {
  test("should not have any visitors at first", (done) => {
    expect(ls.tileStatus).toBeFalsy();
    done();
  });

  test("should sells diamond if player has enough money", (done) => {
    expect(player.diamond).toBe(1);
    done();
  });

  test("should take money from player after selling diamond", (done) => {
    expect(player.gold).toBe(100);
    done();
  });

  test("should reject selling diamond if player dont have enough money", (done) => {
    expect(ls.sellDiamond(player3)).toEqual({
      msg: "You dont have enough money",
    });
    done();
  });

  test("should reject selling diamond if it's not the player's turn", (done) => {
    expect(ls.sellDiamond(player4)).toEqual({ msg: "It's not your turn" });
    done();
  });

  test("should reject player if they dont have free assistants", (done) => {
    expect(ls.sellDiamond(player2)).toEqual({
      msg: "You need free assistant to do this",
    });
    done();
  });

  test("should sells item if player has enough money", (done) => {
    expect(player.gold).toBe(100);
    done();
  });

  test("should show bought item on items", (done) => {
    expect(player.items).toContainEqual({ name: "Strider" });
    expect(player.items).toContainEqual({ name: "Golden Whistle" });
    expect(player.items).toContainEqual({ name: "Horns" });
    done();
  });

  test("should reject player if player money is not enough", (done) => {
    expect(ls.transaction(player3, "Strider")).toEqual({
      msg: "You dont have enough money",
    });
    done();
  });

  test("should reject if player dont have free assistant", (done) => {
    expect(ls.transaction(player2, "Strider")).toEqual({
      msg: "You need free assistant to do this",
    });
    done();
  });

  test("should if it's not player's turn", (done) => {
    expect(ls.transaction(player4, "Strider")).toEqual({
      msg: "It's not your turn",
    });
    done();
  });

  test("should have diamond", (done) => {
    expect(ls.items).toContainEqual({ price: 40 });
    done();
  });

  test("should have item Strider", (done) => {
    expect(ls.items).toContainEqual({ price: 20, name: "Strider" });
    done();
  });

  test("should have item Golden Whistle", (done) => {
    expect(ls.items).toContainEqual({ price: 20, name: "Golden Whistle" });
    done();
  });

  test("should have item Shadow Hand", (done) => {
    expect(ls.items).toContainEqual({ price: 20, name: "Shadow Hand" });
    done();
  });

  test("should have item Horns", (done) => {
    expect(ls.items).toContainEqual({ price: 20, name: "Horns" });
    done();
  });
});

describe("item testing", () => {
  test("Horns should free all assistants from duty", (done) => {
    expect(player.assistants[0].onDuty).toBeFalsy();
    expect(player.assistants[1].onDuty).toBeFalsy();
    done();
  });
  test("Shadow Hand should increase assistants steal chance to 50%", (done) => {
    expect(player.assistants[0].stealChance).toBeCloseTo(0.5);
    expect(player.assistants[1].stealChance).toBeCloseTo(0.5);
    done();
  });
});
