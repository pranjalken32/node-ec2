const Product = require("../models/product")
const mongoose = require("mongoose")
const {
  cacheMiddleware,
  productCache,
} = require("../middlewares/cacheMiddleware")

// Create a new product
//post:http://localhost:4000/api/addproducts
exports.createProduct = async (req, res) => {
  try {
    // Extract data from request
    const { name, description, price, pages, language, discountPrice } =
      req.body
    const image = req.file

    // Check if required fields are provided
    if (!name || !description || !price || !pages || !language || !image) {
      return res.status(400).json({ error: "All fields are required." })
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      pages,
      discountPrice,
      language,
      images: [
        {
          url: `data:${image.mimetype};base64,${image.buffer.toString(
            "base64"
          )}`,
          isThumbnail: false,
        },
      ],
    })

    // Save the product to the database
    await newProduct.save()
    // Update or clear the product list cache
    const cacheKey = "/api/products" // Assuming this is your products route
    productCache.del(cacheKey) // Clear the cache for the product list

    res.status(201).json({ message: "Product added successfully." })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Retrieve a list of products
// get:- http://localhost:4000/api/products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()

//     // Map over products to transform image data
//     const productsWithImages = products.map((product) => {
//       // Create a new object to avoid modifying the original product
//       const productWithImages = {
//         ...product.toObject(),
//         images: product.images.map((image) => ({
//           url: image.url,
//           isThumbnail: image.isThumbnail,
//         })),
//       }
//       return productWithImages
//     })

//     res.json(productsWithImages)
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: "Internal Server Error" })
//   }
// }
exports.getProducts = async (req, res) => {
  try {
    // Use the cache middleware
    const cacheKey = req.originalUrl
    const cachedData = productCache.get(cacheKey)
    if (cachedData) {
      // If cached data is found, send it as the response
      return res.json(cachedData)
    }

    // If data is not in the cache, fetch from the database
    const products = await Product.find()

    // Map over products to transform image data
    const productsWithImages = products.map((product) => ({
      ...product.toObject(),
      images: product.images.map((image) => ({
        url: image.url,
        isThumbnail: image.isThumbnail,
      })),
    }))

    // Cache the data
    productCache.set(cacheKey, productsWithImages)

    res.json(productsWithImages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Retrieve a specific product by ID
// get:- http://localhost:4000/api/products/:id
exports.getProductById = async (req, res) => {
  const { productId } = req.params

  try {
    // Check if productId is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID." })
    }

    const product = await Product.findById(productId)

    // Check if the product with the given ID exists
    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    // Transform image data
    const productWithImages = {
      ...product.toObject(),
      images: product.images.map((image) => ({
        url: image.url,
        isThumbnail: image.isThumbnail,
      })),
    }

    res.json(productWithImages)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Update a specific product
// put:- http://localhost:4000/api/updateproducts/:id
// exports.updateProduct = async (req, res) => {
//   const { id } = req.params
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//     })
//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" })
//     }
//     res.json(updatedProduct)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }
exports.updateProduct = async (req, res) => {
  const { productId } = req.params

  try {
    // Check if productId is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID." })
    }

    const { name, description, price, pages, language } = req.body

    // Check if required fields are provided
    if (!name || !description || !price || !pages || !language) {
      return res.status(400).json({ error: "All fields are required." })
    }

    const product = await Product.findById(productId)

    // Check if the product with the given ID exists
    if (!product) {
      return res.status(404).json({ message: "Product not found." })
    }

    // Update product fields
    product.name = name
    product.description = description
    product.price = price
    product.pages = pages
    product.language = language

    // Save the updated product to the database
    await product.save()
    const cacheKey = "/api/products" // Assuming this is your products route
    productCache.del(cacheKey)

    // Transform image data
    const productWithImages = {
      ...product.toObject(),
      images: product.images.map((image) => ({
        url: image.url,
        isThumbnail: image.isThumbnail,
      })),
    }

    res.json({
      message: "Product updated successfully.",
      product: productWithImages,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

// Delete a specific product
// delete:- http://localhost:4000/api/deleteproducts/:id
exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const deletedProduct = await Product.findByIdAndRemove(id)
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json({ message: "Product deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
