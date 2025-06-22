
const mongoose = require('mongoose');

const mixtapeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true
  },
  coverArt: {
    type: String,
    default: '/placeholder.svg'
  },
  downloadLink: {
    type: String,
    required: true
  },
  monetagLink: {
    type: String,
    default: 'https://otieu.com/4/7303820'
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  playCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for search functionality
mixtapeSchema.index({ title: 'text', artist: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Mixtape', mixtapeSchema);
