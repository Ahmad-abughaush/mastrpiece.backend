const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const errorHandler = require("../middleware/500");

const newUser = async (req, res, next) => {
    const {username, email, password, phone,} = req.body;
    try {
        if (!email) {
            return res.status(422).json({error: 'Invalid email'});
        }
        if (!password) {
            return res.status(422).json({error: 'Invalid password'});
        }
        if (!username) {
            return res.status(422).json({error: 'Invalid username'});
        }
        let user = await User.findOne({email: email});
        if (user) {
            return res.status(401).send("Email already taken");
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = new User({
            role: 'User',
            username: username,
            email: email,
            password: hashedPwd,
            phone: phone,
        });

        user = await newUser.save();

        req.body = user;
        next();
    } catch (error) {
        errorHandler(error, req, res);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const body = req.body;

        const fillable = [
            'username',
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

        await User.findByIdAndUpdate(req.user._id.toString(), data);
        const user = await User.findById(req.user._id.toString())
        req.user = user;
        next()
    } catch (e) {
        return errorHandler(e, req, res)
    }
};


const signup = async (req, res, next) => {
    try {
        const data = req.body
        if (!data.email) {
            return res.status(422).json({error: 'Invalid email'});
        }
        if (!data.password) {
            return res.status(422).json({error: 'Invalid password'});
        }
        next();
    } catch (error) {
        res.status(500).json({error: 'Failed to update user'});
    }
}


module.exports = {
    newUser,
    updateUser,
    signup
}; 
