const express = require('express');

const router = express.Router();
const MachineMaterialControl = require('../../../controllers/api/v1/MachineMaterialController');

router.get('/', MachineMaterialControl.getAllMachineMaterial);
router.post('/', MachineMaterialControl.postCreateAndEdit);

module.exports = router;
