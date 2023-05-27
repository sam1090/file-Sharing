const router = require('express').Router();
const fileController = require('../controller/fileController');
router.post('/', fileController.uploadFile);

router.get('/download/:uuid', fileController.downloadFile);

module.exports = router;
