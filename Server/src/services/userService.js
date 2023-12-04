const mongoService = require('./mongoService');
const fakerService = require('./fakerService');
const config = require('../config');

const userService = {
  findUser: async (username, password) => {
    if (config.useMongoDB) {
      return await mongoService.findUser(username, password);
    } else {
      return fakerService.findUser(username, password);
    }
  },
};

module.exports = userService;
