const express = require('express');

const router = express.Router();

// const AuthHandler = require('../../../models/helpers/AuthHelper');

/**
 * APIs routes.
 */
const materialRouter = require("./Material");
const kilnRouter = require("./Kiln");



router.use("/material", materialRouter);
router.use("/klin", kilnRouter);

module.exports = router;
