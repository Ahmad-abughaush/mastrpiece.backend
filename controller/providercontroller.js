const Provider = require("../models/providermodel");
const bcrypt = require('bcrypt');
const errorHandler = require("../middleware/500");

const allProviders = (req, res) => {
    Provider.find({ is_delete: false })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const oneProvider = async (req, res) => {
    const id = req.params.id;
    const user = await Provider.find({ _id: id, is_delete: false });
    res.json(user);
};

const newProvider = async (req, res, next) => {

    const { username, email, password, phone } = req.body;

    try {
        const user = await Provider.findOne({ email: email });
        if (user) {
            return res.status(401).send("Email already taken");
        }
    } catch (error) {
        errorHandler(error, req, res);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newProvider = new Provider({
        role: 'Provider',
        username: username,
        email: email,
        password: hashedPwd,
        phone: phone
    });

    const user = await newProvider.save();

    req.body = user;
    next();
};

const updateProvider = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const userData = await Provider.findById(userId);

    if (!updatedUserData || updatedUserData.is_delete) {
        return res.status(401).send('User not found');
    }

    if (!(await bcrypt.compare(userData.password, updatedUserData.password))) {

        return res.status(401).send("incorrect password");
    }

    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
    const user = await Provider.findByIdAndUpdate(userId, updatedUserData, { new: true });
    const updatedUser = await user.save();
    res.json(updatedUser);
};

const deleteProvider = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUserData = req.body;

        updatedUserData.is_delete = true;

        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);

        const user = await Provider.findByIdAndUpdate(userId, updatedUserData, {
            new: true,
        });

        const updatedUser = await user.save();

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Provider' });
    }
};

module.exports = {
    allProviders,
    newProvider,
    oneProvider,
    updateProvider,
    deleteProvider,
}; 