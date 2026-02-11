const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const Review = require('../models/Review.model');
const Hotel = require('../models/Hotel.model');
const Restaurant = require('../models/Restaurant.model');

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      user: req.user._id
    });

    // Update rating in hotel/restaurant
    const reviews = await Review.find({
      reviewType: review.reviewType,
      itemId: review.itemId
    });

    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    const Model = review.reviewType === 'hotel' ? Hotel : Restaurant;
    await Model.findByIdAndUpdate(review.itemId, {
      'rating.average': avgRating,
      'rating.count': reviews.length
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    console.error('Create Review Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/reviews/:type/:itemId
// @desc    Get reviews for an item
// @access  Public
router.get('/:type/:itemId', async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewType: req.params.type,
      itemId: req.params.itemId
    })
      .populate('user', 'name photoURL')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Get Reviews Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
