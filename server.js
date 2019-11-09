const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const lecturers = require("./routes/api/lecturers");
const students = require("./routes/api/students");
const classrooms = require("./routes/api/classrooms");
const exercises = require("./routes/api/exercises");
const progress = require("./routes/api/progression");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/lecturers", lecturers);
app.use("/api/students", students);
app.use("/api/classrooms", classrooms);
app.use("/api/exercises", exercises);
app.use("/api/progress", progress);

const port = process.env.PORT || 5000;

// Socket.io

var server = http.createServer(app);
var io = require("socket.io").listen(server);

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("room", function(data) {
    console.log("in joining room in SERVER");
    socket.join(data.room);
    console.log(data);
    socket.broadcast.to(data.room).emit("load users and content");
    socket.broadcast.to(data.room).emit("new user join", data.user);
  });

  socket.on("leave room", function(data) {
    socket.broadcast.to(data.room).emit("user left room", { user: data.user });
    socket.leave(data.room);
  });

  socket.on("coding event", function(data) {
    console.log("in EXPRESS coding event");
    console.log(data);
    socket.broadcast.to(data.room).emit("receive content", {
      content: data.content,
      currentlyTyping: data.currentlyTyping
    });
  });
  socket.on("change mode", function(data) {
    socket.broadcast.to(data.room).emit("receive change mode", data.mode);
  });

  socket.on("send users and content", function(data) {
    socket.broadcast.to(data.room).emit("receive users and content", data);
  });

  socket.on("sendMessage", function(data) {
    console.log("Message is Send");
    console.log(data);

    socket.broadcast.to(data.room).emit("receiveMessage", data);
  });
  socket.on("sendHelp", function(data) {
    console.log("Help is Send");
    console.log(data);

    socket.broadcast.emit("send help", data);
  });
});
