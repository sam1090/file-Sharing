const router = require('express').Router();
const fileController = require('../controller/fileController');
router.post('/', fileController.uploadFile);

router.get('/download/:uuid', fileController.downloadFile);
router.post('/send', fileController.sendEmail);

module.exports = router;
 