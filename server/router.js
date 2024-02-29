const express = require("express");
const router = new express.Router();
const {
  getSortedList,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("./controllers");

router.get("/calendar", getSortedList);
router.post("/calendar", createEvent);
router.delete("/calendar/:id", deleteEvent);
router.put("/calendar/:id", updateEvent);

module.exports = router;
