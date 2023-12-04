const User = require("../models/userModel");
const Parcel = require("../models/parcelModel");
const { ParcelStatus } = require("../utils/parcelStatus");

const mongoService = {
  findUser: async (username, password) => {
    return await User.findOne({ username, password });
  },
  createParcel: async (parcelData) => {
    const parcel = new Parcel(parcelData);
    await parcel.save();
    return parcel;
  },
  getParcelsForSenders: async ({ senderId }) => {
    const parcels = await Parcel.find({ senderId: senderId }).exec();
    return parcels;
  },
  assignParcelToBiker: async ({ parcelId, bikerId }) => {
    //session allowed only in lcoal or replica, should be configured in docker
    // const session = await Parcel.startSession();
    // session.startTransaction();

    try {
      const updatedParcel = await Parcel.findOneAndUpdate(
        { _id: parcelId, status: ParcelStatus.WAITING },
        {
          status: ParcelStatus.PICKED_UP,
          bikerId: bikerId,
          pickupTimestamp: new Date(),
        },
        { new: true }
      );

      if (!updatedParcel) {
        throw new Error(
          "Parcel is not available for pickup or has already been picked up."
        );
      }

      // await session.commitTransaction();
      // session.endSession();
      return updatedParcel;
    } catch (error) {
      // await session.abortTransaction();
      // session.endSession();
      throw error;
    }
  },
  deliverParcel: async ({ parcelId, bikerId }) => {
    //session allowed only in lcoal or replica, should be configured in docker
    // const session = await Parcel.startSession();
    // session.startTransaction();

    try {
      const parcel = await Parcel.findOne({
        _id: parcelId,
        status: ParcelStatus.PICKED_UP,
        bikerId: bikerId,
      });
      if (!parcel) {
        throw new Error(
          "Parcel already delivered or not available for delivery or not assigned to you."
        );
      }

      parcel.status = ParcelStatus.DELIVERED;
      parcel.deliveryTimestamp = new Date();
      await parcel.save();

      // await session.commitTransaction();
      // session.endSession();

      return parcel;
    } catch (error) {
      // await session.abortTransaction();
      // session.endSession();
      throw error;
    }
  },
  getParcelsForBikers: async ({ bikerId }) => {
    const parcels = await Parcel.find({
      $or: [{ status: ParcelStatus.WAITING }, { bikerId: bikerId, status: ParcelStatus.PICKED_UP }, { bikerId: bikerId, status: ParcelStatus.DELIVERED }],
    });
    return parcels;
  },
};

module.exports = mongoService;
