const express = require("express")
const router = express.Router()
const profileController = require("../controllers/profileController")
const { tokenVerification } = require("../middlewares/index")

// Retrieve user profile data
router.get("/profile", tokenVerification, profileController.getUserProfile)

// Update user profile data
router.put("/profile", tokenVerification, profileController.updateUserProfile)

module.exports = router
