const express = require('express');
const user_router =  express.Router();

user_router.get('/all', (request, response) => {
    return response.json({
        message: 'ok',
        data: [
            'name', 'dance', 'sachhin', 'tanu', 'shivansh', 'roy', 'tayal'
        ]
    })
})

user_router.post('/create', (request, response) => {
    return response.json({
        message: 'user created successfully',
        data: null
    })
})

user_router.put('/update', (request, response) => {
    return response.json({
        message: 'user updated successfully',
        data: null
    })
})

// exporting the user_router too bee used in all other places in the api.
module.exports = user_router;


