class Item {
  constructor() {
    this.price = 2;
  }
}

class Food extends Item {
  constructor(price) {
    super(price);
  }
}

class Clothing extends Item {
  constructor(price) {
    super(price);
  }
}

class Jewelry extends Item {
  constructor(price) {
    super(price);
  }
}

module.exports = { Food, Clothing, Jewelry };
