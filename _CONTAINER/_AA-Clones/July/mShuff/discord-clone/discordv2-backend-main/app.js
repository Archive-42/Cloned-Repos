const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ValidationError } = require("sequelize");
const usersRouter = require("./routes/users");
const serversRouter = require("./routes/servers");
const channelsRouter = require("./routes/channels");
const { environment } = require("./config");
const { Channel, User } = require('./db/models');
const { addMessageToChannel } = require("./utils");

// Setup socket.io to work with express
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Setup middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: true }));

// Setup api routes
app.use("/users", usersRouter);
app.use("/servers", serversRouter);
app.use('/channels', channelsRouter);

// Setup socket.io server to listen for connections
io.on('connection', async (socket) => {
  console.log(`${socket.id} -- Connected`);

  // When joined, retrieve channel from DB and join socket to channel
  // Makes it so messages to this channel flow back to user's connection
  socket.on('join', async (channel) => {
    let channelObject = await Channel.findByPk(channel.id);
    if (channelObject) {
      socket.join(channelObject.id, async () => {
        console.log(`${socket.id} has joined channel ${channelObject.title}`);
      });
    }
  });

  // When leaving a channel, get channel, and inform socket we have left
  socket.on('leave', async (channel) => {
    let channelObject = await Channel.findByPk(channel.id);
    if (channelObject) {
      socket.leave(channelObject.id, async () => {
        console.log(`${socket.id} has left ${channelObject.title}`);
      });
    }
  });

  // When socket disconnects, log to console
  socket.on('disconnect', () => {
    console.log(`${socket.id} has disconnected.`);
  });

  // Get channels from DB

  const addListeners = async () => {

    const channels = await Channel.findAll();
    // Loop through all the channels and add listeners for messages to all channels
    for (let channel of channels) {
      console.log(`Listening for messages from ${channel.title} - ${channel.id}`);
      // Steps for getting a message for channel
      //  1. Log message
      //  2. Add message to DB with addMessageToChannel function
      //  3. Emit message to channel and back to sender
      //
      //  Note: socket.to only sends messages to other sockets joined to the room
      //        this is why we have to send the message back to original socket

      socket.on(channel.id, async ({ message, userId }) => {
        const newMessage = await addMessageToChannel(userId, channel.id, message);
        socket.to(channel.id).emit(channel.id, newMessage);
        socket.emit(channel.id, newMessage);
      });
    }
  };

  addListeners();


  socket.on('addChannelListener', channel => {
    console.log(`Added listening for channel ${channel.title}`);

    socket.on(channel.id, async ({ message, userId }) => {
      const newMessage = await addMessageToChannel(userId, channel.id, message);
      // Grab User
      socket.to(channel.id).emit(channel.id, newMessage);
      socket.emit(channel.id, newMessage);
    });
  });

});



// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Error handlers. (must have all four arguments to communicate to Express that
// this is an error-handling middleware function)

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize Error";
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = http;
