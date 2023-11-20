const NodeCache = require("node-cache")
const productCache = new NodeCache({ stdTTL: 60 * 60 })

const cacheMiddleware = (req, res, next) => {
  const cacheKey = req.originalUrl

  // Check if data is in the cache
  const cachedData = productCache.get(cacheKey)
  if (cachedData) {
    // If cached data is found, send it as the response
    return res.json(cachedData)
  }

  // If data is not in the cache, continue to the next middleware or route handler
  next()
}

module.exports = { cacheMiddleware, productCache }
