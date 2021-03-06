
const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
//test

module.exports = {
  csrfProtection,
  asyncHandler,
};
