const mongoose = require('mongoose');
const { mongoURI } = require('../config');
const seedUsers = require('../utils/mongoDBSeed');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // replicaSet: 'ParcelReplicaSetName', // need to configure in compose
    });
    console.log('MongoDB connected successfully.');
    await seedUsers();
  } catch (error) {
    console.log(error);
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
