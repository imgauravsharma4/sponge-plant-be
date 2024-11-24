const express = require('express');

const router = express.Router();

// const AuthHandler = require('../../../models/helpers/AuthHelper');

/**
 * APIs routes.
 */
const materialRouter = require("./Material");
router.use("/material", materialRouter);

module.exports = router;
