const express = require("express");
const router = express.Router();
const controller = require("../api_services/index/controller");

/* POST */
router.post("/", controller.index);
module.exports = router;