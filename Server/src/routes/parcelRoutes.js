const express = require("express");
const bikerController = require("../controllers/bikerController");
const senderController = require("../controllers/senderController");
const router = express.Router();

const checkSenderRole = (req, res, next) => {
  if (req.user && req.user.role === "sender") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Unauthorized - Access restricted to senders only" });
  }
};

const checkBikersRole = (req, res, next) => {
  if (req.user && req.user.role === "biker") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Unauthorized - Access restricted to bikers only" });
  }
};

router.post("/createParcel", checkSenderRole, senderController.createParcel);
router.post(
  "/getParcelsForSender",
  checkSenderRole,
  senderController.getParcels
);

//biker routes
router.post("/assignParcel",checkBikersRole, bikerController.assignParcel);
router.post("/deliverParcel",checkBikersRole, bikerController.deliverParcel);
router.post("/getParcelsForBikers",checkBikersRole, bikerController.getParcels);

module.exports = router;
