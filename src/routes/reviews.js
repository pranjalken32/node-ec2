const express = require("express")
const router = express.Router()
const reviewController = require("../controllers/reviewController")
const { tokenVerification } = require("../middlewares")

// Add a new review
router.post("/add-review", tokenVerification, reviewController.addReview)

// Fetch all reviews (admin)
router.get("/reviews/getall", reviewController.getAllReviews)

// Fetch reviews for a specific product
router.get("/product/getproduct", reviewController.getReviewsForProduct)

router.put(
  "/reviews/:reviewId/update-status",
  reviewController.updateReviewStatus
)

module.exports = router
