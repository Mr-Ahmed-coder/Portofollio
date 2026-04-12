const rateLimit = require("express-rate-limit");

const createLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });

const apiLimiter = createLimiter(
  15 * 60 * 1000,
  process.env.NODE_ENV === "production" ? 300 : 1000,
  "Too many requests. Please slow down and try again shortly."
);

const authLimiter = createLimiter(
  10 * 60 * 1000,
  process.env.NODE_ENV === "production" ? 5 : 25,
  "Too many login attempts. Please wait a few minutes before trying again."
);

const contactLimiter = createLimiter(
  60 * 60 * 1000,
  process.env.NODE_ENV === "production" ? 10 : 50,
  "Too many contact form submissions. Please try again later."
);

module.exports = { apiLimiter, authLimiter, contactLimiter };
