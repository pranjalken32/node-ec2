const Review = require("../models/review")

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const user = req.user.userId // Get userId from the middleware
    const { product, comment, rating } = req.body

    // Additional validation: Ensure required fields are provided
    if (!user || !comment || !rating || !product) {
      return res.status(400).json({ error: "Missing required fields." })
    }

    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({ user, product })

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this product." })
    }

    // Create a new review based on validated data
    const newReview = new Review({ user, product, rating, comment })
    const savedReview = await newReview.save()

    res.status(201).json(savedReview)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// // Fetch all reviews (admin)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
    res.status(200).json(reviews)
  } catch (error) {
    console.log("Error fetching reviews:", error)
    res.status(500).json({ err: error.message })
  }
}

// Fetch reviews for a specific product
exports.getReviewsForProduct = async (req, res) => {
  const productId = req.query.productId

  try {
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." })
    }

    const reviews = await Review.find({ product: productId })
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update the status of a review
exports.updateReviewStatus = async (req, res) => {
  //   const { isAdmin } = req.user // Assuming you have this info in the request object

  //   if (!isAdmin) {
  //     return res
  //       .status(403)
  //       .json({ error: "Unauthorized. Only admins can update review status." })
  //   }

  const reviewId = req.query.reviewId
  const { status } = req.body

  try {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { status },
      { new: true }
    )

    if (!review) {
      return res.status(404).json({ error: "Review not found." })
    }

    res.status(200).json(review)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" })
  }
}
