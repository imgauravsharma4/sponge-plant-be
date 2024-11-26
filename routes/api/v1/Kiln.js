const express = require('express');

const router = express.Router();
const KilnControl = require('../../../controllers/api/v1/KilnController');

router.get('/', KilnControl.getAllKiln);
router.post('/', KilnControl.postCreateAndEdit);

module.exports = router;
