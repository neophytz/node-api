const http_formatter = require('../_util/formatter');
const Organization = require('../model/organization_model');

const organizationGet = (request, response) => { 
    // dynamics method of handling query parameters in request
    // console.log(request.query);
    // let query_obj1;
    // if(Object.keys(request.query).length > 0) {
    //     query_obj1 = request.query;
    // } else {
    //     query_obj1 = {};
    // }
    // console.log(query_obj1);

    const query_obj = (Object.keys(request.query).length > 0) ? request.query : {}; // all entries
    Organization.find(query_obj).then(data => {
        return response.status(200).json(
            http_formatter(data)
        )
    }).catch(err => {
        return response.status(400).json(
            http_formatter(err, "Document validation failed", false)
        )
    })
}

const getOrgById = (request, response) => {
    const {organization_id} = request.params;
    Organization.findById(organization_id).then(data => {
        return response.status(200).json(
            http_formatter(data)
        )
    }).catch(err => {
        return response.status(400).json(
            http_formatter(err, "No record found", false)
        )
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

module.exports = {organizationGet, organizationPost, getOrgById};