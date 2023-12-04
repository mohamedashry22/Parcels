const mongoose = require('mongoose');
const { ParcelStatus } = require('../utils/parcelStatus');

const parcelSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bikerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupAddress: { type: String, required: true },
  dropoffAddress: { type: String, required: true },
  status: { type: String, enum: Object.values(ParcelStatus), default: ParcelStatus.WAITING },
  pickupTimestamp: Date,
  deliveryTimestamp: Date,
});

const Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;
