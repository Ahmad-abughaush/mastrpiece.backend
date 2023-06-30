const Admin = require("../models/adminmodel");
const Provider = require("../models/providermodel");
const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/500");

const createToken = (req, res) => {
    const accessToken = jwt.sign(
        JSON.parse(JSON.stringify({userId: req.body._id, role: req.body.role, email: req.body.email})),
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1w"}
    );

    res.json({Token: accessToken, data: req.body})
}

const loginProvider = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email) {
        return res.status(422).json({error: "email is required"})
    }
    if (!password) {
        return res.status(422).json({error: "password is required"})
    }
    try {
        const user = await Provider.findOne({email: email});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("incorrect email or password");
        }
        req.body = user;
        next();
    } catch (error) {
        errorHandler(error, req, res);
    }
};


const loginAdmin = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await Admin.findOne({email: email});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("incorrect email or password");
        }
        req.body = user;
        next();

    } catch (error) {
        errorHandler(error, req, res);
    }
};

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});

        if (!user || !(await bcrypt.compare(password, user.password))) {

            return res.status(401).send("incorrect email or password");
        }

        if (!user.active) {

            return res.status(401).send("Don't have access");
        }
        req.body = user;
        next();

    } catch (error) {
        errorHandler(error, req, res);
    }
};

module.exports = {
    loginProvider,
    loginAdmin,
    loginUser,
    createToken,
}; 
