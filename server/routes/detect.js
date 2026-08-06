const express = require("express");
const router = express.Router();

const { detectMicroplastics } = require("../controller/detectcontroller");

router.post("/detect", detectMicroplastics);

module.exports = router;