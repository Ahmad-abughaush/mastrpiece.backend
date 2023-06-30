const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    provider_id: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    attachments: {
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
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
