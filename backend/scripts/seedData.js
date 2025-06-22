
const mongoose = require('mongoose');
require('dotenv').config();

const Mixtape = require('../models/Mixtape');
const Genre = require('../models/Genre');

const genres = [
  { name: 'Hip Hop', description: 'Urban beats and rap', color: 'from-orange-500 to-red-500' },
  { name: 'R&B', description: 'Rhythm and blues', color: 'from-purple-500 to-pink-500' },
  { name: 'Afrobeat', description: 'African rhythms', color: 'from-green-500 to-yellow-500' },
  { name: 'Trap', description: 'Hard hitting beats', color: 'from-blue-500 to-purple-500' },
  { name: 'Pop', description: 'Popular music', color: 'from-pink-500 to-rose-500' },
  { name: 'Electronic', description: 'Electronic music', color: 'from-cyan-500 to-blue-500' },
];

const mixtapes = [
  {
    title: 'Summer Vibes 2024',
    artist: 'DJ MixMaster',
    genre: 'Hip Hop',
    coverArt: '/placeholder.svg',
    downloadLink: 'https://example.com/download/summer-vibes-2024',
    monetagLink: 'https://otieu.com/4/7303820',
    description: 'The hottest summer tracks mixed to perfection',
    duration: '45:32',
    releaseDate: new Date('2024-06-15'),
    tags: ['summer', 'party', 'trending'],
    playCount: 15420,
    likes: 892,
    featured: true,
  },
  {
    title: 'Midnight Sessions',
    artist: 'Beat Producer',
    genre: 'R&B',
    coverArt: '/placeholder.svg',
    downloadLink: 'https://example.com/download/midnight-sessions',
    monetagLink: 'https://otieu.com/4/7303820',
    description: 'Smooth R&B beats for late night listening',
    duration: '38:15',
    releaseDate: new Date('2024-05-20'),
    tags: ['chill', 'night', 'smooth'],
    playCount: 8934,
    likes: 567,
    featured: false,
  },
  {
    title: 'Afro Fusion Mix',
    artist: 'Rhythm King',
    genre: 'Afrobeat',
    coverArt: '/placeholder.svg',
    downloadLink: 'https://example.com/download/afro-fusion-mix',
    monetagLink: 'https://otieu.com/4/7303820',
    description: 'The best of African rhythms and modern beats',
    duration: '52:18',
    releaseDate: new Date('2024-04-10'),
    tags: ['afrobeat', 'fusion', 'energy'],
    playCount: 12567,
    likes: 734,
    featured: true,
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Mixtape.deleteMany({});
    await Genre.deleteMany({});
    console.log('Cleared existing data');

    // Insert genres
    await Genre.insertMany(genres);
    console.log('Genres seeded successfully');

    // Insert mixtapes
    await Mixtape.insertMany(mixtapes);
    console.log('Mixtapes seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
