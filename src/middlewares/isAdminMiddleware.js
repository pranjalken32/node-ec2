const isAdmin = (req, res, next) => {
  const userRole = req.user.role
  console.log(req.user)

  if (userRole === "admin") {
    next()
  } else {
    res.status(403).json({ error: "Access forbidden" })
  }
}

module.exports = isAdmin
