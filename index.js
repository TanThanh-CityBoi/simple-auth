require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routers/index');
const connectDB = require('./configDB');

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
   /* options */
});

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//    console.log(`SERVER STARTED ON PORT: ${PORT}`);
// });

let users = [];
io.on("connection", (socket) => {
   console.log(socket.id);
   socket.on("check", ({ user }) => {
      const check = users.find((user) => user.user == user.user.email);
      console.log("user", check);
      if (check) {
         console.log("co");
         console.log(users);
         socket.emit("found");
      } else {
         socket.emit("notfound");
         users.push({ user: user.user.email, socketId: socket.id });
         console.log(users);
      }
   });

   socket.on("send_message", ({ room, sender, messageText }) => {
      console.log(messageText);
      console.log(room);
      socket.join(room);
      socket.to(room).emit("receive_message", { sender, messageText });
   });
   socket.on("leave_room", ({ room, user }) => {
      console.log("da roi room ", room);
      users = users.filter((userd) => userd.user != user.user.email);
      socket.leave(room);
      console.log(users);
   });
   socket.on("disconnect", () => {
      console.log(socket.id);
      users = users.filter((user) => user.socketId != socket.id);
   });
});
httpServer.listen(3000);

connectDB();