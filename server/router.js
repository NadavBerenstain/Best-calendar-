const express = require("express");
const router = new express.Router();
const { getList, createEvent } = require("./controllers");

// router.get("/calendar", getList);
router.post("/calendar", createEvent);

module.exports = router;
