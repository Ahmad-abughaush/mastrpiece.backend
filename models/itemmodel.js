const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemname: {
        type: String,
        required: true
    },
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
    description: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
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

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
