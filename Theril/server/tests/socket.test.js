const io = require("socket.io-client");
// const socket = io("http://localhost:3000");
// const expect = require("expect.js");

describe("test socket", () => {
  let socket;
  beforeAll(function (done) {
    socket = io.connect("http://localhost:3000", {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
    });
    socket.on("connect", function () {
      console.log("worked ...");
      done();
    });
    socket.on("disconnect", function () {
      console.log("disconnected...");
    });
    socket.emit("clear-room");
  });

  afterAll(function (done) {
    if (socket.connected) {
      console.log("disconnecting...");
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
      console.log("no connection to break...");
    }
    done();
  });

  describe("Test room", () => {
    test("get list room", (done) => {
      socket.emit("get-all-room");
      socket.on("get-list-room", (data) => {
        expect(data).toBeInstanceOf(Array);
        done();
      });
    });

    test("create room", (done) => {
      const payload = {
        roomName: "Test",
      };
      socket.emit("create-room", payload);
      socket.on("updated-room", (data) => {
        expect(data).toBeInstanceOf(Array);
        done();
      });
    });
  });

  describe("Player Test", () => {
    test("user 1 join room", (done) => {
      const payload = {
        roomName: "Test",
        username: "Alfonso",
      };
      socket.emit("join-room", payload);
      socket.on("room-detail", (data) => {
        console.log("masuk 1");
        expect(data).toBeInstanceOf(Object);
        done();
      });
    });

    test("user 2 join room", (done) => {
      const payload = {
        roomName: "Test",
        username: "Sakra",
      };
      socket.emit("join-room", payload);
      socket.on("room-detail", (data, players) => {
        // console.log(data);
        // console.dir(players, { depth: null });
        console.log("masuk 2");
        expect(data).toBeInstanceOf(Object);
        done();
      });
    });

    test("user 3 join room", (done) => {
      const payload = {
        roomName: "Test",
        username: "Nicko",
      };
      socket.emit("join-room", payload);
      socket.on("errorFull", (message) => {
        console.log("masuk 3");
        expect(message).toBe("Player Already full");
      });
      socket.on("updated-room", (data) => {
        expect(data).toBeInstanceOf(Array);
        done();
      });
    });
  });

  describe("Test start game", () => {
    test("start play", (done) => {
      const room = {
        name: "Test",
        users: ["Alfonso", "Sakra"],
      };
      socket.emit("start-game", room);
      socket.on("start-game", (data) => {
        expect(data).toBeDefined();
        done();
      });
    });
  });
});
