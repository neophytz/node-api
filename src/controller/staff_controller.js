const http_formatter = require('../_util/formatter');

const staffGet = (request, response) => {
    // some work!! some processing!!
    return response.json({
        message: 'ok',
        data: [
            'nidhi', 'mohit', 'sahil', 'nikhil'
        ]
    })
}

module.exports = {staffGet};