
const express = require('express');
const router = express.Router();
const Mixtape = require('../models/Mixtape');

// GET all mixtapes with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { genre, search, featured, limit = 50, page = 1 } = req.query;
    
    let query = {};
    
    // Filter by genre
    if (genre && genre !== 'null') {
      query.genre = genre;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const mixtapes = await Mixtape.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Mixtape.countDocuments(query);
    
    res.json({
      mixtapes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET trending mixtapes (by play count)
router.get('/trending', async (req, res) => {
  try {
    const { limit = 12 } = req.query;
    
    const mixtapes = await Mixtape.find()
      .sort({ playCount: -1 })
      .limit(limit * 1);
    
    res.json(mixtapes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET new releases (by release date)
router.get('/new-releases', async (req, res) => {
  try {
    const { limit = 12 } = req.query;
    
    const mixtapes = await Mixtape.find()
      .sort({ releaseDate: -1 })
      .limit(limit * 1);
    
    res.json(mixtapes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET featured mixtapes
router.get('/featured', async (req, res) => {
  try {
    const mixtapes = await Mixtape.find({ featured: true })
      .sort({ createdAt: -1 });
    
    res.json(mixtapes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single mixtape
router.get('/:id', async (req, res) => {
  try {
    const mixtape = await Mixtape.findById(req.params.id);
    
    if (!mixtape) {
      return res.status(404).json({ message: 'Mixtape not found' });
    }
    
    res.json(mixtape);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new mixtape
router.post('/', async (req, res) => {
  try {
    const mixtape = new Mixtape(req.body);
    const newMixtape = await mixtape.save();
    res.status(201).json(newMixtape);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update mixtape
router.put('/:id', async (req, res) => {
  try {
    const mixtape = await Mixtape.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!mixtape) {
      return res.status(404).json({ message: 'Mixtape not found' });
    }
    
    res.json(mixtape);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST increment play count
router.post('/:id/play', async (req, res) => {
  try {
    const mixtape = await Mixtape.findByIdAndUpdate(
      req.params.id,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    
    if (!mixtape) {
      return res.status(404).json({ message: 'Mixtape not found' });
    }
    
    res.json({ playCount: mixtape.playCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST increment likes
router.post('/:id/like', async (req, res) => {
  try {
    const mixtape = await Mixtape.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!mixtape) {
      return res.status(404).json({ message: 'Mixtape not found' });
    }
    
    res.json({ likes: mixtape.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
