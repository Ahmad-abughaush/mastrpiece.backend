const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    provider_id: {
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
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
