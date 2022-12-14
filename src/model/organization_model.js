// table in SQL is same as that of Collection in mongodb

const mongoose = require('mongoose');
// import numpy as np
const Schema = mongoose.Schema;

// schema take 2 values
/**
 * 1. description and rules for schema
 * 2. [optional] - options | additional details
*/
// schema - skeleton of collection or table
const _organizationSchema = new Schema({
        name: {
            type: String,
            required: true, // mongodb will make sure that this value is not empty!! [undefined | null | ""],
            trim: true, // 'samarth mishra'
        },
        address: {
            type: Object,
            line1: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            },
            state: {
                type: String,
                required: true
            },
            required: true,
        },
        phone: {
            type: Number,
            required: [true, 'Phone number is mandatory'],
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isDeleted: {
            type: Boolean, 
            default: false,
        }
    }, 

    //options
    {
        versionKey: false,
        timestamps: true
    }
);


// first argument is name of the collection or name of the table.
// second argument is the schema definition.
module.exports = mongoose.model('Organization', _organizationSchema);

