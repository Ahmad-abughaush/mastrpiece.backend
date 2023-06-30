const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

    attachments: [
        {
            filename: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        }
    ],

    companyname: {
        type: String,
        required: true
    }
    ,
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        maxlength: 50
    }
    ,


    email:{
        type: String,
    required: true,
    maxlength: 50
},
    phone: {
    type: Number,
    required: true,
    maxlength: 50
}
    ,
    is_delete: {
    type: Boolean,
    default: false
},
    available: {
    type: Boolean,
    default: true
},
    active: {
    type: Boolean,
    default: false
}
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;