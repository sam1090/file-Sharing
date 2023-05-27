const router = require('express').Router();
const showController = require('../controller/showController');

router.get('/:uuid', showController.downloadFile);

module.exports = router;
