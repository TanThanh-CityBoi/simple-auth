const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io")


const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, { /* options */ });

app.get('/', (req, res) => {
    res.send('hello')
})
let users = [];
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("check", ({ user }) => {
        const check = users.find((user) =>

            user.user == user.user.email
        );
        console.log('user', check);
        if (check) {
            console.log('co');
            console.log(users);
            socket.emit("found");
        }
        else {
            socket.emit("notfound");
            users.push({ user: user.user.email, socketId: socket.id });
            console.log(users);
        }
    })

    socket.on("send_message", ({ room, sender, messageText }) => {
        console.log(messageText);
        console.log(room);
        socket.join(room);
        socket.to(room).emit("receive_message", { sender, messageText })
    })
    socket.on("leave_room", ({ room, user }) => {
        console.log('da roi room ', room);
        users = users.filter((userd) => userd.user != user.user.email);
        socket.leave(room);
        console.log(users);
    })
    socket.on("disconnect", () => {
        console.log(socket.id);
        users = users.filter((user) => user.socketId != socket.id);

    })
})
httpServer.listen(3000);
