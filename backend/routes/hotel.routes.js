const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel.model');
const { authMiddleware } = require('../middleware/auth.middleware');

// @route   GET /api/hotels
// @desc    Get all hotels with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice, rating, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }
    
    if (minPrice || maxPrice) {
      query['pricing.minPrice'] = {};
      if (minPrice) query['pricing.minPrice'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.minPrice'].$lte = Number(maxPrice);
    }
    
    if (rating) {
      query['rating.average'] = { $gte: Number(rating) };
    }

    const hotels = await Hotel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ featured: -1, 'rating.average': -1 });

    const count = await Hotel.countDocuments(query);

    res.json({
      success: true,
      hotels,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get Hotels Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/hotels/nearby
// @desc    Get nearby hotels
// @access  Public
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 10000 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const hotels = await Hotel.find({
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
      hotels
    });
  } catch (error) {
    console.error('Get Nearby Hotels Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/hotels/:id
// @desc    Get single hotel
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('reviews');
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      hotel
    });
  } catch (error) {
    console.error('Get Hotel Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
