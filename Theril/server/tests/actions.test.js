const Player = require("../logic/Player");
const player = new Player("Wyrdhn");
const player2 = new Player("Hehe");
const player3 = new Player("Wuehehe");
const player4 = new Player("asdasd");

const { LuxuryShop, Market } = require("../logic/Tiles");
const ls = new LuxuryShop();
const m = new Market();

player.move("", ls);

player2.currentLocation = "Luxury Shop";

player2.move(ls, m);

player3.assistants[0].onDuty = true;
player3.assistants[1].onDuty = true;

player2.diamond = 1;

player3.release(player3.assistants[0]);
player3.release(player3.assistants[1]);

player3.assistants[0].onDuty = true;
player3.assistants[1].onDuty = true;

player4.hasDone = 2;

describe("movement", () => {
  test("should move from none to location", (done) => {
    expect(player.currentLocation).toBe("Luxury Shop");
    done();
  });

  test("should move from one location to another", (done) => {
    expect(player2.currentLocation).toBe("Market");
    done();
  });

  test("should not move if there are no free assistant", (done) => {
    expect(player3.move("", ls)).toEqual({
      msg: "You dont have free assistant to do this",
    });
    done();
  });
});

describe("steal", () => {
  test("should increase diamond if success, not if not success, has a achance to jail assistant", (done) => {
    function asd() {
      return new Promise((_resolve) => {
        player.sendSteal(player.assistants[0], player2);
      })
        .then((_) => {
          if (player.assistants[0].stolenItem) {
            expect(player.diamond).toBe(1);
            expect(player2.diamond).toBe(0);
          }
        })
        .then((_) => {
          if (!player.assistants[0].stolenItem) {
            expect(player.diamond).toBe(0);
            expect(player2.diamond).toBe(1);
          }
        })
        .then((_) => {
          if (player.assistants[0].jailed) {
            expect(player.assistants[0].jailedDuration).toBe(6);
          }
        });
    }
    asd();
    done();
  });

  test("should reject action if it's not player's turn", (done) => {
    expect(player4.sendSteal(player4.assistants[0], player2)).toEqual({
      msg: "It's not your turn",
    });
    done();
  });
});
