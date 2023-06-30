const User = require("../models/usermodel");
const bcrypt = require('bcrypt');
const errorHandler = require("../middleware/500");

const allUsers = (req, res) => {
    User.find({ is_delete: false })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const oneUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.find({ _id: id, is_delete: false });
    res.json(user);
};

const newUser = async (req, res, next) => {

    const { username, email, password, phone, } = req.body;

    try {
        if (!email) {
            return res.status(422).json({ error: 'Invalid email' });
        }
        if (!password) {
            return res.status(422).json({ error: 'Invalid password' });
        }
        if (!username) {
            return res.status(422).json({ error: 'Invalid usrename' });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).send("Email already taken");
        }
    } catch (error) {
        errorHandler(error, req, res);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
        role: 'User',
        username: username,
        email: email,
        password: hashedPwd,
        phone: phone,
        active: false,
    });

    const user = await newUser.save();

    req.body = user;
    next();
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const user = await User.findById(userId);

    if (!user || user.is_delete) {
        return res.status(401).send('User not found');
    }

    const passwordMatches = await bcrypt.compare(
        updatedUserData.password,
        user.password
    );

    if (!passwordMatches) {
        return res.status(401).send('Incorrect password');
    }

    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
        new: true,
    });

    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        updatedUserData.is_delete = true;

        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);

        const user = await User.findByIdAndUpdate(userId, updatedUserData, {
            new: true,
        });

        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const signup = async (req, res, next) => {
    try {
        const data = req.body
        if (!data.email) {
            return res.status(422).json({ error: 'Invalid email' });
        }
        if (!data.password) {
            return res.status(422).json({ error: 'Invalid password' });
        }
        next();

    }

    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });

    }


}


module.exports = {
    allUsers,
    newUser,
    oneUser,
    updateUser,
    deleteUser,
    signup
}; 