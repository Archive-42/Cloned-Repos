const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler, } = require("../utils");
const { Server, Channel, Server_Member, User } = db;
const { Op } = require("sequelize");

// Find all servers related to logged in user
router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = Number.parseInt(req.params.userId);

    const servers = await Server.findAll({
        where: {
            ownerId: userId,
        },
        include: { model: Channel },
    });

    const memberOf = await Server_Member.findAll({
        where: {
            userId,
        }
    });

    const memberServerIds = memberOf.map((memberServer) => {
        // For every memberServer column, grab that server, push onto memberServers array
        return memberServer.serverId;
    });
    const memberServers = await Server.findAll({
        where: {
            id: {
                [Op.in]: [...memberServerIds],
            }
        }
    });

    res.json({ servers, otherServers: memberServers });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { title, userId } = req.body;

    const serverInstance = await Server.create({
        title,
        ownerId: userId,
    });

    const homeChannel = await Channel.create({
        title: "Home",
        topic: `Welcome to your new Server, ${serverInstance.title}!  This is your Home channel, but feel free to create more!`,
        serverId: serverInstance.id,
    });

    const server = {
        id: serverInstance.id,
        title: serverInstance.title,
        ownerId: serverInstance.ownerId,
    };

    res.status(200).json({ server, homeChannel });
}));

router.post("/:serverId/join/", asyncHandler(async (req, res) => {
    const { serverId, userId } = req.body;

    const server = await Server.findByPk(serverId, {
    });
    const user = await User.findByPk(userId);
    // const connectionExists = await Server_Member.findAll({
    //     where: {
    //         serverId,
    //         userId
    //     }
    // });
    // if (connectionExists.length) {
    //     res.status(599).json('member connection already exists');
    //     return;
    // }

    await Server_Member.create({ serverId, userId });

    res.status(200).json({ server, user });
}));

module.exports = router;
