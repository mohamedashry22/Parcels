const mongoService = require('./mongoService');
const fakerService = require('./fakerService');
const config = require('../config');

const parcelService = {
  createParcel: async ({pickupAddress, dropoffAddress, senderId}) => {
    if (config.useMongoDB) {
      return await mongoService.createParcel({pickupAddress, dropoffAddress, senderId});
    } else {
      return fakerService.createParcel({pickupAddress, dropoffAddress, senderId});
    }
  },
  getParcelsForSenders: async ({senderId}) => {
    if (config.useMongoDB) {
      return await mongoService.getParcelsForSenders({ senderId });
    } else {
      return fakerService.getParcelsForSenders({ senderId });
    }
  },
  assignParcelToBiker: async({parcelId, bikerId}) => {
    if (config.useMongoDB) {
      return await mongoService.assignParcelToBiker({ parcelId, bikerId });
    } else {
      return fakerService.assignParcelToBiker({  parcelId, bikerId });
    }
  },
  deliverParcel: async({parcelId, bikerId}) => {
    if (config.useMongoDB) {
      return await mongoService.deliverParcel({ parcelId, bikerId });
    } else {
      return fakerService.deliverParcel({  parcelId, bikerId });
    }
  },
  getParcelsForBikers: async({ bikerId }) => {
    if (config.useMongoDB) {
      return await mongoService.getParcelsForBikers({ bikerId });
    } else {
      return fakerService.getParcelsForBikers({ bikerId });
    }
  },
};

module.exports = parcelService;