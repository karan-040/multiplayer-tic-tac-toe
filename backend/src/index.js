import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Client domain
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("hiii welcome to the game");
});
let waitingPlayers = [];
let games = {};

io.on("connection", (socket) => {
  socket.on("setUsername", (username) => {
    socket.username = username;
    waitingPlayers.push(socket);
    if (waitingPlayers.length >= 2) {
      const player1 = waitingPlayers.shift();
      const player2 = waitingPlayers.shift();
      const roomId = `${player1.id}#${player2.id}`;
      player1.join(roomId);
      player2.join(roomId);

      games[roomId] = {
        players: [player1, player2],
        isXNext: true,
      };
      player1.emit("paired", {
        partner: player2.username,
        turn: true,
        player: "O",
        room: roomId,
      });
      player2.emit("paired", {
        partner: player1.username,
        turn: false,
        player: "X",
        room: roomId,
      });
    }
  });
  socket.on("Move", ({ index, room }) => {
    const game = games[room];
    if (!game) return;

    const currentPlayer = game.isXNext ? "O" : "X";
    game.isXNext = !game.isXNext;
    io.to(room).emit("moveMade", { index, player: currentPlayer });
  });

  socket.on("winner", ({ winner, indices, room }) => {
    io.to(room).emit("won", { won: winner, idx: indices });
  });

  socket.on("disconnect", () => {
    // Check if the disconnected player was in a game
    for (const roomId in games) {
      const game = games[roomId];
      const playerIndex = game.players.findIndex((p) => p.id === socket.id);
      if (playerIndex !== -1) {
        // Notify the opponent
        const opponent = game.players[1 - playerIndex];
        opponent.emit("opponentDisconnected");

        // Remove the game
        delete games[roomId];
        break;
      }
    }

    // Remove the disconnected socket from the waiting list
    waitingPlayers = waitingPlayers.filter((player) => player !== socket);
  });
});

server.listen(port, () => {
  console.log(`server started on port->${port}`);
});
