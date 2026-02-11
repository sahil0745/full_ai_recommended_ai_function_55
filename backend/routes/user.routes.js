const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const User = require('../models/User.model');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('bookings');
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, preferences },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/users/wishlist
// @desc    Add to wishlist
// @access  Private
router.post('/wishlist', authMiddleware, async (req, res) => {
  try {
    const { itemId, type } = req.body;
    
    const user = await User.findById(req.user._id);
    user.wishlist.push(itemId);
    user.wishlistType.push(type);
    await user.save();

    res.json({
      success: true,
      message: 'Added to wishlist'
    });
  } catch (error) {
    console.error('Add Wishlist Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/users/wishlist/:itemId
// @desc    Remove from wishlist
// @access  Private
router.delete('/wishlist/:itemId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const index = user.wishlist.indexOf(req.params.itemId);
    
    if (index > -1) {
      user.wishlist.splice(index, 1);
      user.wishlistType.splice(index, 1);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Removed from wishlist'
    });
  } catch (error) {
    console.error('Remove Wishlist Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
