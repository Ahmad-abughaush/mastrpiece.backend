const Provider = require("../models/providermodel");
const Service = require("../models/servicemodel");
const bcrypt = require('bcrypt');
const errorHandler = require("../middleware/500");

const allProviders = async (req, res) => {
    try {
        const provider = Provider.find();
        return res.json(provider);
    } catch (e) {
        return errorHandler(e, req, res)
    }
};

const oneProvider = async (req, res) => {
    const id = req.params.id;
    const user = await Provider.find({_id: id});
    return res.json(user);
};

const newProvider = async (req, res, next) => {
    const {name, email, password, phone} = req.body;

    if (!name) {
        return res.status(422).json({error: "is name required"})
    }
    if (!email) {
        return res.status(422).json({error: "is email required"})
    }
    if (!password) {
        return res.status(422).json({error: "is password required"})
    }
    if (!phone) {
        return res.status(422).json({error: "is phone required"})
    }

    try {
        const user = await Provider.findOne({email: email});
        if (user) {
            return res.status(401).send({error: "Email already taken"});
        }
    } catch (error) {
        errorHandler(error, req, res);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newProvider = new Provider({
        role: 'Provider',
        name,
        email,
        password: hashedPwd,
        phone
    });

    const user = await newProvider.save();

    req.body = user;
    next();
};

const updateProvider = async (req, res, next) => {
    try {
        const body = req.body;

        const fillable = [
            'name',
            'email',
            'password',
            'phone'
        ]

        const data = {}

        fillable.forEach(field => {
            if (body[field]) {
                data[field] = body[field];
            }
        })
        if (Object.keys(data).length < 1) {
            return res.json({message: "nothing to update"})
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }

        await Provider.findByIdAndUpdate(req.user._id.toString(), data);
        const user = await Provider.findById(req.user._id.toString())
        req.user = user;
        next()
    } catch (e) {
        return errorHandler(e, req, res)
    }
};

module.exports = {
    allProviders,
    newProvider,
    oneProvider,
    updateProvider,
};
