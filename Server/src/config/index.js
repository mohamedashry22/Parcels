module.exports = {
  useMongoDB: process.env.useMongoDB === 'true',
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
};
