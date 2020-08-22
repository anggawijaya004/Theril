const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;
const cors = require("cors");
const Game = require("./logic/Turns");
const Player = require("./logic/Player");
app.use(cors());

let rooms = [],
  players = [],
  usernames = [];

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("submit-username", (name) => {
    const user = {
      name,
      id: socket.id,
    };
    usernames.push(user);
    socket.emit("emit-username", usernames);
  });
  socket.on("clear-room", () => {
    rooms = [];
  });
  socket.on("get-all-room", () => {
    socket.emit("get-list-room", rooms);
  });

  socket.on("create-room", (data) => {
    let room = {
      name: data.roomName,
      users: [],
    };
    rooms.push(room);
    io.emit("updated-room", rooms);
  });

  socket.on("join-room", (data) => {
    socket.join(data.roomName, () => {
      let index = rooms.findIndex((item) => item.name == data.roomName);
      if (rooms[index].users.length === 2) {
        socket.emit("errorFull", "Player Already full");
        io.emit("updated-room", rooms);
      } else {
        rooms[index].users.push(data.username);
        io.sockets.in(data.roomName).emit("room-detail", rooms[index]);
      }
    });
  });

  socket.on("start-game", (data) => {
    const game = new Game();
    const p1 = new Player(data.users[0]);
    const p2 = new Player(data.users[1]);
    game.assign(p1);
    game.assign(p2);
    game.setPlays();
    game.setGolds();
    game.initialize();
    socket.broadcast.to(data.name).emit("gas-game", data, game);
  });
});

server.listen(port, () => console.log(`Running on port ${port}`));
