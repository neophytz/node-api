const http_formatter = require('../_util/formatter');

const userGet = (req, res) => {
    // the entire logic of the enpoint will be checked in this plaace.
    return res.json(http_formatter(
        ['name', 'dance', 'sachhin', 'tanu', 'shivansh', 'roy', 'tayal']
    ))
}

const userPost = (request, response) => {
    return response.json(http_formatter(null, 'User crated successfully'));
}

const userPut = (request, response) => {
    return response.json(http_formatter(null, 'User updates successfully'));
}

module.exports = {userGet, userPost, userPut};