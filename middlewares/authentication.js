const jwt = require('jsonwebtoken');
const { httpError } = require('../helpers/httpError');
const { User } = require('../models/userModel');

const {SECRET_KEY} = process.env;

const authentication = async (req, res, next) => {
    const {authorization = ''} = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== "Bearer") {
        throw httpError(401, "Not authorized");
    };

    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || token !== String(user.token)) {
            next(httpError(401, "Not authorized"))
        }
        req.user = user;
        next();
    } catch (error) {
        next(httpError(401, "Not authorized"))
    }
};

module.exports = authentication;