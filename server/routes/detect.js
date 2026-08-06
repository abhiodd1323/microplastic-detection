const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
    detectMicroplastics
} = require("../controller/detectcontroller");

router.post(
    "/detect",
    upload.single("image"),
    detectMicroplastics
);

module.exports = router;