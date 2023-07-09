const mongoose = require('mongoose');
const db = require('../config/connection');
const Event = require('../models/Event');
const eventSeeds = require('./eventSeeds.json');

db.once('open', async () => {
  try {
    await Event.deleteMany({});
    await Event.insertMany(eventSeeds); // Use insertMany() instead of create()

    console.log('Event seed data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding event data:', error);
    process.exit(1);
  }
});

