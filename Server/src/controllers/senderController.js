const parcelService = require('../services/parcelService');

const senderController = {
  createParcel: async (req, res) => {
    const { pickupAddress, dropoffAddress, senderId: senderIdFromBody } = req.body;
    const senderId = req.user.userId || senderIdFromBody;

    const parcel = await parcelService.createParcel({pickupAddress, dropoffAddress, senderId});

    if (parcel) {
      res.status(200).json({ message: 'parcel added successfully', parcel });
    } else {
      res.status(400).json({ message: 'error in creating parcel' });
    }
  },
  getParcels: async (req, res) => {
    const { senderId: senderIdFromBody } = req.body;
    const senderId = req.user.userId || senderIdFromBody;
    
    const parcels = await parcelService.getParcelsForSenders({ senderId });

    if (parcels) {
      res.status(200).json({ parcels });
    } else {
      res.status(400).json({ message: 'error in obtaining parcels' });
    }
  },
};

module.exports = senderController;
