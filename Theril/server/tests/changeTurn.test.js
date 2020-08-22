const Game = require("../logic/Turns");
const g = new Game();
const Player = require("../logic/Player");
const p = new Player("Wyrdhn");
const p2 = new Player("Hehe");
const { Horns } = require("../logic/LuxuryItems");
const h = new Horns();

g.assign(p);
g.assign(p2);

g.setPlays();
g.initialize();

g.activeCharacter = p2.name;
g.changeTurn();

p.assistants[0].work("Luxury Shop");
p.assistants[1].work("Luxury Shop");

h.use(p);

test("should change p2 to p1", (done) => {
  expect(g.activeCharacter).toBe(p.name);
  done();
});

test("should free all assistants", (done) => {
  expect(p.assistants[0].onDuty).toBeFalsy();
  expect(p.assistants[1].onDuty).toBeFalsy();
  done();
});
