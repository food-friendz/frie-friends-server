const mongoose = require('mongoose');
const db = require('../config/connection');
const Restaurant = require('../models/Restaurant');
const restaurantSeeds = require('./seedData/restaurantSeeds.json');

db.once('open', async () => {
    try {
        await Restaurant.deleteMany({});
        await Restaurant.insertMany(restaurantSeeds);

        console.log('Restaurant seed data inserted successfully! Records:'+ await Restaurant.countDocuments({}) );
        process.exit(0);
    } catch (error) {
        console.error('Error seeding restaurant data:', error);
        process.exit(1);
    }
});