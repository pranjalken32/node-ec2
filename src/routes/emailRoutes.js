const express = require("express")
const router = express.Router()
const emailController = require("../controllers/emailController")

// Define the route for sending customizable emails
router.post("/send", emailController.sendCustomEmail)

module.exports = router
