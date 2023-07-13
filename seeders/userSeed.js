const mongoose = require('mongoose');
const db = require('../config/connection');
const User = require('../models/User');
const userSeeds = require('./seedData/userSeeds.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.insertMany(userSeeds);

        console.log('User seed data inserted successfully! Records:'+ await User.countDocuments({}) );
        process.exit(0);
    } catch (error) {
        console.error('Error seeding user data:', error);
        process.exit(1);
    }
});