const { validationResult } = require('express-validator');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    next();
  } else {
    const errors = validationErrors.array().map((error) => error.msg);
    const err = new Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    return next(err);
  }
};

module.exports = {
  asyncHandler,
  handleValidationErrors,
};
