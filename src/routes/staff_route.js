const express = require('express');
const staff_router =  express.Router();


// /staff/all
staff_router.get('/all', (request, response) => {
    // some work!! some processing!!
    return response.json({
        message: 'ok',
        data: [
            'nidhi', 'mohit', 'sahil', 'nikhil'
        ]
    })
})

// exporting the staff_router too bee used in all other places in the api.
module.exports = staff_router;