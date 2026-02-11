const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant.model');

// @route   GET /api/restaurants
// @desc    Get all restaurants with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, cuisine, priceRange, rating, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }
    
    if (cuisine) {
      query.cuisine = { $in: [cuisine] };
    }
    
    if (priceRange) {
      query['pricing.priceRange'] = priceRange;
    }
    
    if (rating) {
      query['rating.average'] = { $gte: Number(rating) };
    }

    const restaurants = await Restaurant.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ featured: -1, 'rating.average': -1 });

    const count = await Restaurant.countDocuments(query);

    res.json({
      success: true,
      restaurants,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get Restaurants Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/restaurants/nearby
// @desc    Get nearby restaurants
// @access  Public
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const restaurants = await Restaurant.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).limit(20);

    res.json({
      success: true,
      restaurants
    });
  } catch (error) {
    console.error('Get Nearby Restaurants Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get single restaurant
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('reviews');
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      restaurant
    });
  } catch (error) {
    console.error('Get Restaurant Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
