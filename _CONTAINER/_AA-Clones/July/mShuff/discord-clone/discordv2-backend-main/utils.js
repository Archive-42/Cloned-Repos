const { validationResult } = require("express-validator");
const { User, Channel, Channel_Message } = require('./db/models');

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error("Bad request.");
    err.status = 400;
    err.title = "Bad request.";
    err.errors = errors;
    return next(err);
  }
  next();
};

const addMessageToChannel = async (userId, channelId, messageContent) => {
  // Attempt to find Channel and create Message to database
  try {
    // Find user by username
    const user = await User.findByPk(userId);
    const channel = await Channel.findByPk(channelId);
    const message = await Channel_Message.create({
      body: messageContent,
      userId,
      channelId,
    });
    // await message.save();
    // Return message and channel objects
    return {
      message,
      channel,
      user,
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = { asyncHandler, handleValidationErrors, addMessageToChannel };
