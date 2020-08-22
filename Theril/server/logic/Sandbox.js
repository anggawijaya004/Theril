const Player = require("./Player");
const { Food, Clothing, Jewelry } = require("./Items");
const {
  GoldenWhistle,
  Strider,
  ShadowHand,
  Diamond,
} = require("./LuxuryItems");

const { itemArr, luxItemArr } = require("./Module");

const {
  LuxuryShop,
  Market,
  PoliceOffice,
  TeaHouse,
  WainWright,
  Warehouse,
} = require("./Tiles");

const player = new Player("Wyrdhn", true);
const a1 = player.assistants[0];
const a2 = player.assistants[1];
const player2 = new Player("Hehe", false);

const ls = new LuxuryShop(false);
const m = new Market(false);
const th = new TeaHouse(false);
const p = new PoliceOffice(false);
const ww = new WainWright(false);
const wh = new Warehouse(false);

// console.time("Meow");

player2.gold = 0;
console.log(th.throwDice(player2));

// ww.upgrade(player);
// ww.upgrade(player);

// player.release(a1);
// player.release(a2);

// ww.upgrade(player);
// ww.upgrade(player);

// console.timeEnd("Meow");

// console.dir(m, { depth: null });
