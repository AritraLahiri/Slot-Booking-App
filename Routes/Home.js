const path = require("path");
const cors = require("cors");
const express = require("express");
const slotController = require("../Controllers/SlotBooking");
const router = express.Router();

router.get("/get-slot", slotController.getSlots);
router.post("/book-slot", slotController.BookSlot);
router.get("/show-booking", slotController.getBookings);
router.delete("/delete/:userID", cors(), slotController.deleteSlot);

module.exports = router;
