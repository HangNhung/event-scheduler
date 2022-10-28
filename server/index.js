//index.js
const express = require("express");
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());

// const { Server } = require("socket.io");

// const io = new Server({  cors: {
//   origin: "http://localhost:3000"
// }});

// io.on("connection", (socket) => {
//   // ...
// });

// io.listen(3000);

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

const eventList = []
var sockets =  [];
//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  sockets.push(socket)
  console.log(`⚡: ${socket.id} user just connected!`);
  //event listener for new events
  socket.on("createSchedules", (event) => {
    eventList.unshift(event);
          //sends the events back to the React app
    sockets.forEach((socket) => {
      socket.emit("sendSchedules", eventList);
    })
  });


  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


