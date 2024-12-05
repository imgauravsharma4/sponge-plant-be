const express = require('express');

const router = express.Router();
const MachineControl = require('../../../controllers/api/v1/MachineController');

router.get('/', MachineControl.getAllMachine);
router.post('/', MachineControl.postCreateAndEdit);

module.exports = router;
