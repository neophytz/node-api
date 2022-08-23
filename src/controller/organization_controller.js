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

    // const {line1} = request.query;

    // how to query on nested object properties
    // query = {"address.line": line1}

    // .sort({name: 'desc', createdAt: 'desc'}) // asc or desc || ascending or descending
    // .sort({name: -1}) // 1 = ascending or -1 = descending
    // .sort('-name createdAt') // '-name' : descending | 'name' : ascending

    // {} -> all
    
    // gt -> greater than (>) | lt -> less than (<)
    // gte -> greater than and equals (>=) | lte -> less than and equal (<=)

    // .where('address.pincode').gte(110030)
    // object method
    /*
     {
        "address.pincode": {
            $gte: 110030
        }
        
        ! complex queries using object method
        name: "NSUT",
        "address.pincode": {
            $lte: 110045,
            $gte: 110040
        }
    }

    * same query using methods.
    .where('name').equals('NSUT')
    .where('address.pincode').gte(110040).lte(110045)
    */


    Organization
    .find({})
    .sort('-phone')
    .then(data => {
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
    ['name','address', 'phone', 'email'].forEach(key => {
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