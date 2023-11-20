const CartItem = require("../models/cartItem")
const Child = require("../models/child")

// Add a product to the cart
//post:http://localhost:4000/api/addcart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId
    const { productId, quantity } = req.body

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "User ID and Product ID are required." })
    }

    let cartItem = await CartItem.findOne({ user: userId, product: productId })

    if (cartItem) {
      cartItem.quantity += quantity || 1
    } else {
      cartItem = new CartItem({
        user: userId,
        product: productId,
        quantity: quantity || 1,
      })
    }

    await cartItem.save()
    res.status(201).json(cartItem)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get the user's shopping cart
//get:http://localhost:4000/api/:userId
exports.getCart = async (req, res) => {
  const userId = req.user.userId

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." })
    }

    const cartItems = await CartItem.find({ user: userId }).populate("product")
    res.status(200).json(cartItems)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update a cart item's quantity
//put:http://localhost:4000/api/update/:cartItemId
exports.updateCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId
    const { quantity } = req.body

    if (!cartItemId || !quantity) {
      return res
        .status(400)
        .json({ error: "Cart item ID and quantity are required." })
    }

    const cartItem = await CartItem.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    )
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found." })
    }

    res.status(200).json(cartItem)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// Remove a product from the cart
//delete:http://localhost:4000/api/remove/:cartItemId
exports.removeFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId

    if (!cartItemId) {
      return res.status(400).json({ error: "Cart item ID is required." })
    }

    const deletedCartItem = await CartItem.findByIdAndRemove(cartItemId)
    if (!deletedCartItem) {
      return res.status(404).json({ error: "Cart item not found." })
    }

    res.status(204).json({ message: "Cart item removed successfully." })
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}
