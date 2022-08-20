const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _contactUsSchemaDescription = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: Number,
    message: {
        type: String,
        required: true
    },
    description: String
};

const contactUsSchema = new Schema(_contactUsSchemaDescription, {timestamps: true});

// we want to export it as a Table or Collection!!
module.exports = mongoose.model('ContactUs', contactUsSchema);