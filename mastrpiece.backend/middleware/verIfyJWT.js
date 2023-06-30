require("dotenv").config();
const User = require('../models/usermodel')
const Provider = require('../models/providermodel')
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({error: "Not found token"});
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                return res.sendStatus(403).json({error: "Invalid token"});
            }
            if (!decoded?.userId || !decoded?.role) {
                return res.sendStatus(403).json({error: "Invalid token"});
            }
            if (decoded.role.toLowerCase() === 'provider') {
                req.user = await Provider.findById(decoded.userId);
            } else {
                req.user = await User.findById(decoded.userId);
            }

            if (!req.user) {
                return res.sendStatus(403).json({error: "Invalid token"});
            }
            next()
        }
    );

}

module.exports = verifyJWT
