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

    .select('name phone email -_id') // when we want to send selected feilds to the user, we use select()
    .sort('-createdAt') // if we have not seleected the feild, sort will not work!!

    */

   // paginataion
   // total -> 100
   // photos per page -> 10
   // page -> 10

   /**
    * TOTAL - 100
    * PER_PAGE - 10
    * TOTAL_PAGE - 10
    * 
    * CURRENT_PAGE - 10
    * 
    * 
    * 
    * PAGE - 1
    * 1 - 10
    * 
    * ! formula
    * PER_PAGE * (PAGE_NO - 1) + 1 _____ PER_PAGE * PAGE_NO
    * 2
    * 10
    * 
    * 
    * (10 * 2-1) + 1 ____ 10 * 2
    * 11 - 20
    * 
    * (10 * 5-1) + 1 ____ 10 * 5
    * 41 - 50
    * 
    * 
    * PAGE - 2
    * 11 - 20
    * 
    * PAGE_NO - 5
    * 41 - 50
    * 
    */

   // doc_count
   // page_number
   
    //    let {perPage, pageNo} = request.query;
    //    pageNo ||= 1;
    //    perPage ||= 2;
    //    .count() // is same is arr.length
    //    .limit(perPage) // limits the number of documents 
    //    .skip(perPage * (pageNo - 1)) // skips the 

    // .populate()
    // foreign key concept

    Organization
    .find({})
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

// update method
const organisationUpdate = (request, response) => {
    const {  organization_id } = request.params;
    const query = { _id: organization_id } 

    // const marks = [1,2,3,4];
    // const marks2 = [...marks, 5];

    // spread operator -> ...
    // const person = {
    //     name: 'sachin',
    //     age: 12,
    // }

    // const person2 = {
    //     name: person.name,
    //     age: person.age,
    //     gender: 'Male'
    // }

    // const bestPerson = {...person, gender: 'Male'};


    // mistake!! -> if email is null or undefined from body;
    const {name, email, address} = request.body;
    Organization.findOneAndUpdate(query, {name, email, address})
    .then(data => response.status(200).json(http_formatter(data, "Organisation updated successfully")))
    .catch(error => response.status(400).json(http_formatter(error, "Something went wrong", false)))

}

const organisationDelete = (request, response) => {
    const {organization_id} = request.params;
    if(!organization_id) {
        return response.status(400).json(http_formatter({}, "Invalid organisation ID, no record found", false));
    }

    /**
     * findByIdAndRemove : returns the deleted document
     * findOneAndDelete: return the deleted document
     * deleteOne: only return the acknowledgement and delete count.
    */ 

    // ! -> we must only use delete operation when we are sure about the fact that the document 
    // ! -> has 0 / no dependency in entire software and database.
    Organization.deleteOne({
        _id: organization_id
    })
    .then(data => response.status(200).json(http_formatter(data, "Organisation removed successfully")))
    .catch(error => response.status(400).json(http_formatter(error, "Something went wrong", false)))
}

module.exports = {organizationGet, organizationPost, getOrgById, organisationDelete, organisationUpdate};