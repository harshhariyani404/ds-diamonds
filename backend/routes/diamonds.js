const express = require('express');
const Diamond = require('../models/Diamond');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/diamonds
// @desc    Get all diamonds with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      shape,
      carat,
      clarity,
      color,
      cut,
      polish,
      symmetry,
      fluorescence,
      certificate,
      location,
      minPrice,
      maxPrice,
      page = 1,
      limit = 50,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build filter object
    const filter = {};

    if (shape) filter.shape = shape.toUpperCase();
    if (clarity) filter.clarity = clarity.toUpperCase();
    if (color) filter.color = color.toUpperCase();
    if (cut) filter.cut = cut.toUpperCase();
    if (polish) filter.polish = polish.toUpperCase();
    if (symmetry) filter.symmetry = symmetry.toUpperCase();
    if (fluorescence) filter.fluorescence = fluorescence.toUpperCase();
    if (certificate) filter.certificate = certificate.toUpperCase();
    if (location) filter.location = location.toUpperCase().trim();

    // Carat filter (exact match or range)
    if (carat) {
      const caratValue = parseFloat(carat);
      if (!isNaN(caratValue)) {
        filter.carat = caratValue;
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const diamonds = await Diamond.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Diamond.countDocuments(filter);

    res.json({
      success: true,
      count: diamonds.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: diamonds,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/diamonds/:id
// @desc    Get single diamond by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const diamond = await Diamond.findById(req.params.id);

    if (!diamond) {
      return res.status(404).json({ message: 'Diamond not found' });
    }

    res.json({
      success: true,
      data: diamond,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/diamonds
// @desc    Create new diamond
// @access  Private (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const diamond = await Diamond.create(req.body);

    res.status(201).json({
      success: true,
      data: diamond,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/diamonds/:id
// @desc    Update diamond
// @access  Private (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const diamond = await Diamond.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!diamond) {
      return res.status(404).json({ message: 'Diamond not found' });
    }

    res.json({
      success: true,
      data: diamond,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/diamonds/:id
// @desc    Delete diamond
// @access  Private (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const diamond = await Diamond.findByIdAndDelete(req.params.id);

    if (!diamond) {
      return res.status(404).json({ message: 'Diamond not found' });
    }

    res.json({
      success: true,
      message: 'Diamond deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

