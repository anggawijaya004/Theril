//ITEMS
const { Food, Clothing, Jewelry } = require("./Items");

const food = new Food();
const clothing = new Clothing();
const jewelry = new Jewelry();

const itemArr = [food, clothing, jewelry];

//LUXURY ITEMS
const {
  Horns,
  ShadowHand,
  Strider,
  Diamond,
  GoldenWhistle,
} = require("./LuxuryItems");

const horns = new Horns();
const shadowHand = new ShadowHand();
const strider = new Strider();
const diamond = new Diamond();
const goldenWhistle = new GoldenWhistle();

const luxItemArr = [diamond, goldenWhistle, horns, shadowHand, strider];

module.exports = { itemArr, luxItemArr };
