const express = require("express")
const router = express.Router()
const cartController = require("../controllers/cartController")
const { tokenVerification } = require("../middlewares")

// Add a product to the cart
router.post("/addcart", tokenVerification, cartController.addToCart)

// Get the user's shopping cart
router.get("/getcart", tokenVerification, cartController.getCart)

// Update a cart item's quantity
router.put("/update/:cartItemId", cartController.updateCartItem)

// Remove a product from the cart
router.delete("/remove/:cartItemId", cartController.removeFromCart)

module.exports = router
