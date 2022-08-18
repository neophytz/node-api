const express = require('express');
const user_router =  express.Router();
const user_controller = require('../controller/user_controller');

user_router.get('/all', user_controller.userGet);

user_router.post('/create', user_controller.userPost);

user_router.put('/update', user_controller.userPut);

module.exports = user_router;


