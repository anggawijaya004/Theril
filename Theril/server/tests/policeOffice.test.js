const { PoliceOffice } = require("../logic/Tiles");
const p = new PoliceOffice();

const Player = require("../logic/Player");
const player = new Player("Wyrdhn", true);
const player2 = new Player("Hehe", false);

p.arrest(player.assistants[0]);

describe("Police Office", () => {
  test("should have name", (done) => {
    expect(p.tileName).toBe("Police Office");
    done();
  });

  test("should not have visitor at first", (done) => {
    expect(p.tileStatus).toBeFalsy();
    done();
  });
});
