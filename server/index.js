const express = require("express");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

// DATA
let users = [];

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("user", (user) => {
    const { username, room } = user;
    console.log("new user", username);
    users.push({ id: socket.id, username, room });
    socket.emit(
      "message",
      formatMessage("Admin", `Hey ${username}, Welcome to this room`)
    );
    socket.broadcast
      .to(room)
      .emit(
        "message",
        formatMessage("Admin", `${username} has joined the room!`)
      );
    const room_users = users.filter((user) => user.room === room);
    io.to(room).emit("user", room_users);
  });

  socket.on("message", (data) => {
    const { username, message } = data;
    console.log("message", socket.id, data);
    io.emit("message", formatMessage(username, message));
  });

  socket.on("disconnect", () => {
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      const { username, room } = users.splice(index, 1)[0];
      socket.broadcast
        .to(room)
        .emit(
          "message",
          formatMessage("Admin", `${username} has left the room!`)
        );
      const room_users = users.filter((user) => user.room === room);
      io.to(room).emit("user", room_users);
    }
    console.log("disconnected");
  });
});

server.listen(5000, () => console.log("server running on port 5000"));

// UTILS
const moment = require("moment");

function formatMessage(username, message) {
  return {
    username,
    message,
    time: moment().format("LT"),
  };
}
