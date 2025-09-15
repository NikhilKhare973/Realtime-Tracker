const express = require('express');
const path = require('path');
const app = express();

// socket io setup or bouipat code
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// ejs setup
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    })

});

app.get("/", function (req, res) {
    res.render("index");
})


const POST = 3000;
server.listen(POST, () => {
    console.log(`Server is running on post ${POST}`);
});