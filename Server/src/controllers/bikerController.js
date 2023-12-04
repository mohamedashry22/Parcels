const parcelService = require("../services/parcelService");

const bikerController = {
  assignParcel: async (req, res) => {
    const { parcelId, bikerId: bikerIdFromBody } = req.body;
    const bikerId = req.user.userId || bikerIdFromBody;

    try {
      const parcel = await parcelService.assignParcelToBiker({
        parcelId,
        bikerId,
      });

      res.status(200).json({
        message: "Parcel assigned successfully",
        parcel,
      });
    } catch (error) {
      if (
        error.message ===
        "Parcel is not available for pickup or has already been picked up."
      ) {
        res.status(409).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
    }
  },
  deliverParcel: async (req, res) => {
    const { parcelId, bikerId: bikerIdFromBody  } = req.body;
    const bikerId = req.user.userId || bikerIdFromBody;

    try {
      const deliveredParcel = await parcelService.deliverParcel({
        parcelId,
        bikerId,
      });

      res.status(200).json({
        message: "Parcel delivered successfully",
        parcel: deliveredParcel,
      });
    } catch (error) {
      if (
        error.message ===
        "Parcel already delivered or not available for delivery or not assigned to this biker."
      ) {
        res.status(409).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
    }
  },
  getParcels: async (req, res) => {
    const { bikerId: bikerIdFromBody } = req.body;
    const bikerId = req.user.userId || bikerIdFromBody;

    const parcels = await parcelService.getParcelsForBikers({
      bikerId,
    });

    if(parcels && parcels.length){
      res.status(200).json({ parcels });
    } else {
      res.status(400).json({ message: 'error in obtaining parcel' });
    }

  },
};

module.exports = bikerController;
