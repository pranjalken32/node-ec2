const express = require("express")
const router = express.Router()
const childController = require("../controllers/childController")
const {tokenVerification} = require('../middlewares/index')

// Route to get child information for the logged-in user
router.get("/my_children", tokenVerification, childController.getChildrenForUser)
router.post("/add_child", tokenVerification, childController.addChild)

module.exports = router
