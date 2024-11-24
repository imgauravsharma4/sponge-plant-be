const express = require('express');

const router = express.Router();
const MaterialControl = require('../../../controllers/api/v1/MaterialController');

router.get('/', MaterialControl.getAllMaterial);
router.post('/', MaterialControl.postCreateAndEdit);
router.delete('/', MaterialControl.delete);

module.exports = router;
