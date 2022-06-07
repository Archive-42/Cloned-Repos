const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const { jwtConfig: { secret, expiresIn } } = require('../../config');
const PlayerRepository = require('../../db/player-repository');

function generateToken(player) {
  const data = player.toSafeObject();
  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
}

function restorePlayer(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return next({ status: 401, message: 'no token' });
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      res.clearCookie('token');
      err.status = 401;
      return next(err);
    }

    const tokenId = payload.jti;

    try {
      req.player = await PlayerRepository.findByTokenId(tokenId);
    } catch (e) {
      res.clearCookie("token");
      return next({ status: 401, message: "user not found" });
    }

    if (!req.player.isValid()) {
      res.clearCookie("token");
      return next({ status: 401, message: 'session not found' });
    }

    next();
  });
}

const authenticated = [restorePlayer];

module.exports = { generateToken, authenticated };
