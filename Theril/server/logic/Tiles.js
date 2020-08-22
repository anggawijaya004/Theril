const { itemArr, luxItemArr } = require("./Module");

class Tiles {
  constructor(tileStatus) {
    this.tileStatus = tileStatus;
  }
}

class LuxuryShop extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Luxury Shop";
    this.items = [];
    this.setItems();
  }

  sellDiamond(player) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        if (player.gold >= 40) {
          allowed[0].work(this.tileName);
          player.diamond += 1;
          player.gold -= 40;
          player.hasDone += 1;
        } else return { msg: "You dont have enough money" };
      } else return { msg: "You need free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }

  setItems() {
    for (let i = 0; i < luxItemArr.length; i++) {
      this.items.push(luxItemArr[i]);
    }
  }

  transaction(player, whichItem) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        let targetItem = this.items.filter(
          (item) => item.name === whichItem
        )[0];
        if (player.gold >= targetItem.price) {
          allowed[0].work(this.tileName);
          player.gold -= targetItem.price;
          player.items.push({ name: targetItem.name });
          player.hasDone += 1;

          if (
            targetItem.name === "Strider" ||
            targetItem.name === "Golden Whistle"
          ) {
            targetItem.use(player);
          }
        } else return { msg: "You dont have enough money" };
      } else return { msg: "You need free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

class Market extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Market";
    this.requests = [];
    this.getRequest();
  }

  getRequest() {
    const randomizer = (_) => {
      let rand = Math.ceil(Math.random() * 20);
      return rand > 15 ? 3 : rand > 10 ? 2 : rand > 5 ? 1 : 0;
    };

    for (let i = 0; i < itemArr.length; i++) {
      this.requests.push({
        type: itemArr[i],
        request: randomizer(),
      });
    }

    return this;
  }

  transaction(player) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        allowed[0].work(this.tileName);
        for (let i = 0; i < this.requests.length; i++) {
          if (
            this.requests[i].type === player.resources[i].type &&
            this.requests[i].request &&
            this.requests[i].request - player.resources[i].amount >= 0 &&
            player.resources[i].amount
          ) {
            this.requests[i].request -= player.resources[i].amount;
            player.gold +=
              this.requests[i].type.price * player.resources[i].amount;
            player.resources[i].amount = 0;
            player.hasDone += 1;
          }
        }
      } else return { msg: "You dont have free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

class Warehouse extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Warehouse";
    this.stock = [];
    this.setStock();
  }

  setStock() {
    for (let i = 0; i < itemArr.length; i++) {
      this.stock.push({
        type: itemArr[i],
        amount: 12,
      });
    }
  }

  transaction(player) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        allowed[0].work(this.tileName);
        for (let i = 0; i < this.stock.length; i++) {
          this.stock[i] -= player.capacity - player.resources[i];
          player.resources[i] = player.capacity;
        }
        player.hasDone += 1;
      } else return { msg: "You dont have free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

class TeaHouse extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Tea House";
    this.gamblingResult = "";
  }

  throwDice(player) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (allowed.length) {
        if (player.gold >= 5) {
          allowed[0].work(this.tileName);
          let dicePlayer = Array.from({ length: 3 }, (x, y) =>
            Math.ceil(Math.random() * 6)
          ).reduce((x, y) => x + y, 0);

          let diceAI = Array.from({ length: 3 }, (x, y) =>
            Math.ceil(Math.random() * 6)
          ).reduce((x, y) => x + y, 0);

          if (dicePlayer > diceAI) {
            this.gamblingResult = "Player One";
            player.gold += 5;
          } else if (dicePlayer < diceAI) {
            this.gamblingResult = "AI";
            player.gold -= 5;
          } else if (dicePlayer === diceAI) {
            this.gamblingResult = "Draw";
          }

          player.hasDone += 1;
        } else return { msg: "You dont have enough gold" };
      } else return { msg: "You dont have free assistant to do this" };
    } else return { msg: "It's not your turn" };
  }
}

class PoliceOffice extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Police Office";
  }

  arrest(assistant) {
    assistant.jailed = true;
    assistant.jailedDuration = assistant.potentialDuration;
  }
}

class WainWright extends Tiles {
  constructor(tileStatus) {
    super(tileStatus);
    this.tileName = "Wain Wright";
  }

  upgrade(player) {
    if (player.hasDone < 2) {
      let allowed = player.assistants.filter((assistant) => !assistant.onDuty);
      if (player.cart < 4) {
        if (allowed.length) {
          if (player.gold >= 7) {
            allowed[0].work();
            player.cart += 1;
            player.gold -= 8;
            player.cartCapacity(this.tileName);
            player.hasDone += 1;
          } else return { msg: "You dont have money to do this" };
        } else return { msg: "You dont have free assistant to do this" };
      } else return { msg: "Your cart is at max level" };
    } else return { msg: "It's not your turn" };
  }
}

module.exports = {
  LuxuryShop,
  Market,
  Warehouse,
  TeaHouse,
  PoliceOffice,
  WainWright,
};
