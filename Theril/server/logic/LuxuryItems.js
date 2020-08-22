class LuxuryItems {
  constructor() {
    this.price = 20;
  }
}

class Strider extends LuxuryItems {
  constructor(price) {
    super(price);
    this.name = "Strider";
  }

  use(player) {
    player.movement += 1;
  }
}

class Horns extends LuxuryItems {
  constructor(price) {
    super(price);
    this.name = "Horns";
  }
  use(player) {
    for (let i = 0; i < player.assistants.length; i++) {
      player.assistants[i].onDuty = false;
    }
  }
}

class ShadowHand extends LuxuryItems {
  constructor(price) {
    super(price);
    this.name = "Shadow Hand";
  }

  use(player) {
    for (let i = 0; i < player.assistants.length; i++) {
      player.assistants[i].stealChance = 0.5;
    }
  }
}

class GoldenWhistle extends LuxuryItems {
  constructor(price) {
    super(price);
    this.name = "Golden Whistle";
  }

  use(player) {
    for (let i = 0; i < player.assistants.length; i++) {
      player.assistants[i].potentialDuration = 3;
    }
  }
}

class Diamond {
  constructor() {
    this.price = 40;
  }
}

module.exports = { Strider, Horns, ShadowHand, Diamond, GoldenWhistle };
