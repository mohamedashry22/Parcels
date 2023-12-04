const {senders, bikers} = require("../utils/fakermockData");
const { faker } = require('@faker-js/faker');
const { ParcelStatus } = require("../utils/parcelStatus");

const users = [...senders, ...bikers];

const parcels = [];

const fakerService = {
  findUser: (username, password) => {
    return users.find((user) => user.username === username && user.password === password);
  },
  createParcel: ({pickupAddress, dropoffAddress , senderId}) => {
    const newParcel = {
      id: faker.datatype.uuid(),
      senderId: senderId,
      pickupAddress: pickupAddress,
      dropoffAddress: dropoffAddress,
      status: ParcelStatus.WAITING,
    };
    parcels.push(newParcel);
    return newParcel;
  },
  getParcelsForSenders: ({senderId}) => {
    return parcels.filter((parcel)=> parcel.senderId === senderId);
  },
  assignParcelToBiker : ({ parcelId, bikerId }) => {
    const parcelIndex = parcels.findIndex(p => p.id === parcelId && p.status === ParcelStatus.WAITING);
  
    if (parcelIndex === -1) {
      return {
        status: 409,
        message: "Parcel is not available for pickup or has already been picked up."
      };
    }
  
    parcels[parcelIndex].status = ParcelStatus.PICKED_UP;
    parcels[parcelIndex].bikerId = bikerId;
    parcels[parcelIndex].pickupTimestamp = new Date();
  
    return parcels[parcelIndex];
  },
  deliverParcel: ({parcelId, bikerId}) => {
    const parcelIndex = parcels.findIndex(p => p.id === parcelId && p.bikerId === bikerId && p.status === ParcelStatus.PICKED_UP);
  
    if (parcelIndex === -1) {
      throw new Error("Parcel already delivered or not available for delivery or not assigned to you.");
    }
  
    parcels[parcelIndex].status = ParcelStatus.DELIVERED;
    parcels[parcelIndex].deliveryTimestamp = new Date();
  
    return parcels[parcelIndex];
  },
  getParcelsForBikers: ({ bikerId }) => {
    const filteredParcels = parcels.filter(parcel =>
      parcel.status === ParcelStatus.WAITING ||
      (parcel.bikerId === bikerId && (parcel.status === ParcelStatus.PICKED_UP || parcel.status === ParcelStatus.DELIVERED))
    );
  
    return filteredParcels;
  }
};

module.exports = fakerService;
