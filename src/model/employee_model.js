const mongoose = require('mongoose');
const Schema = mongoose.Schema; // sekelton of the table in database.

// it takes 2 argument 
// 1. rules and arrtibute
// options

const _employeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory.'],
        minLength: 2,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
        }
    },
    phone: {
        type: Number,
        required: true,
    },
    dob: Date,
}, {timestamps: true});

module.exports = mongoose.model('Employee', _employeeSchema);