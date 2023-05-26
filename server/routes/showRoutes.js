const router = require('express').Router();
const showController = require('../controller/showController');

router.post('/:uuid', showController.downloadFile);

module.exports = router;
