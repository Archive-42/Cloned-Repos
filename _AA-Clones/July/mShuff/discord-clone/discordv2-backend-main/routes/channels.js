const express = require("express");
const db = require("../db/models");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { Channel, Channel_Message, User } = db;

const router = express.Router();

router.get('/:channelId/messages', asyncHandler(async (req, res) => {
  const channelId = Number.parseInt(req.params.channelId);
  const channel = await Channel.findByPk(channelId);
  const channelMessages = await Channel_Message.findAll({
    where: {
      channelId: channelId,
    },
    include: {
      model: User
    }
  });
  res.status(200).json({ channelMessages, channel });
}));

router.get('/:serverId', asyncHandler(async (req, res) => {
  const channels = await Channel.findAll({
    where: {
      serverId: Number.parseInt(req.params.serverId),
    }
  });
  res.status(200).json({ channels });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title, topic, serverId } = req.body;

  const channelInstance = await Channel.create({ title, topic, serverId });

  const channelToReturn = {
    id: channelInstance.id,
    title: channelInstance.title,
    topic: channelInstance.topic,
    serverId: channelInstance.serverId,
  };

  res.status(200).json(channelToReturn);
}));

module.exports = router;
