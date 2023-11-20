const express = require("express")
const router = express.Router()
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products")
const { singleFileUpload } = require("../utils/multer")
const { tokenVerification } = require("../middlewares/index")
const { isAdmin } = require("../middlewares/index")
const {
  cacheMiddleware,
  productCache,
} = require("../middlewares/cacheMiddleware")

router.post(
  "/addproducts",
  tokenVerification,

  singleFileUpload("image"),
  createProduct
)
router.get("/products", getProducts)

router.get("/products/:id", cacheMiddleware, getProductById)

router.put("/updateproducts/:id", tokenVerification, updateProduct)

router.delete("/deleteproducts/:id", tokenVerification, deleteProduct)

module.exports = router
