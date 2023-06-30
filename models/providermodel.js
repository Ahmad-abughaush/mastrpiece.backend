const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        maxlength: 10,
    },
    providername: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 50,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
