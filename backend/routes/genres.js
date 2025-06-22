
const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

// GET all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new genre
router.post('/', async (req, res) => {
  try {
    const genre = new Genre(req.body);
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
