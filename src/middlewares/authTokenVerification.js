const jwt = require("jsonwebtoken")

const tokenValidator = async (req, res, next) => {
  if (await req.headers.authorisation) {
    try {
      const authToken = await req.headers.authorisation
      req.user = jwt.verify(authToken, process.env.SECRET)
      console.log(req.user)
      next()
    } catch (err) {
      console.log(err.message)
      res.json({
        message: "You are not Authorised ! ",
        success: false,
      })
    }
  } else {
    return res.json({
      message: "You are not Authorised! ",
      success: false,
    })
  }
}
module.exports = tokenValidator
