const express = require('express');

const router = express.Router();

// const AuthHandler = require('../../../models/helpers/AuthHelper');

/**
 * APIs routes.
 */
const materialRouter = require("./Material");
const MachineRouter = require("./Machine");
const MachineMaterialRouter = require("./MachineMaterial");



router.use("/material", materialRouter);
router.use("/machine", MachineRouter);
router.use("/machine-material", MachineMaterialRouter);

module.exports = router;
