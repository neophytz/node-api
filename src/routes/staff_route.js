const express = require('express');
const staff_router =  express.Router();
const staffAuthMiddleware = require('../middleware/auth_middleware');
const staff_controller = require('../controller/staff_controller');

// /staff/all
staff_router.get('/all', staffAuthMiddleware, staff_controller.staffGet);

// exporting the staff_router too bee used in all other places in the api.
module.exports = staff_router;