const router = require("express").Router();
const fileController = require("../controller/fileController");
router.post("/", fileController.uploadFile);

module.exports = router;
