const express = require('express');

const router = express.Router();
const KilnMaterialControl = require('../../../controllers/api/v1/KilnMaterialController');

router.get('/', KilnMaterialControl.getAllKilnMaterial);
router.post('/', KilnMaterialControl.postCreateAndEdit);

module.exports = router;
