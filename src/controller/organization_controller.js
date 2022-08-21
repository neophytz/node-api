const http_formatter = require('../_util/formatter');
const Organization = require('../model/organization_model');

const organizationGet = (request, response) => {
    // some work!! some processing!!
    return response.json({
        message: 'ok',
        data: [
            'nidhi', 'mohit', 'sahil', 'nikhil'
        ]
    })
}

const organizationPost = (request, response) => {
    // validation;
    const _errors = [];
    ['address', 'phone', 'email'].forEach(key => {
        if(!request.body[key]){
            _errors.push(`${key} is required. Please dedo.`);
        }
    })

    if(_errors.length > 0) {
        return response.status(400).json(
            http_formatter(_errors, "All fields are mandatory", false)
        )
    }

    // call-back hell...!!
    const orgObj = new Organization(request.body);
    Organization.create(orgObj).then(data => {
        // successfully created and entry registered in the database
        return response.status(201).json(
            http_formatter(data, "Organization created successfully")
        )
    }).catch(err => {
        // something went wrong while creating!!
        // schema validation faliure
        // network faliure!!
        // something else which is unknown!!
        return response.status(400).json(
            http_formatter(err, "Document validation failed", false)
        )
    });

}

module.exports = {organizationGet, organizationPost};