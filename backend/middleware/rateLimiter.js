
const rateLimit = require('express-rate-limit');

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: message || 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Different rate limits for different endpoints
const generalLimiter = createRateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes
const searchLimiter = createRateLimiter(1 * 60 * 1000, 30); // 30 searches per minute
const downloadLimiter = createRateLimiter(1 * 60 * 1000, 10); // 10 downloads per minute

module.exports = {
  generalLimiter,
  searchLimiter,
  downloadLimiter
};
