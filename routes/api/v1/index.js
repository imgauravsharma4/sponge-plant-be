const express = require('express');

const router = express.Router();

// const AuthHandler = require('../../../models/helpers/AuthHelper');

/**
 * APIs routes.
 */
const materialRouter = require("./Material");
const kilnRouter = require("./Kiln");
const KilnMaterialRouter = require("./KilnMaterial");



router.use("/material", materialRouter);
router.use("/kiln", kilnRouter);
router.use("/kiln-material", KilnMaterialRouter);

module.exports = router;
