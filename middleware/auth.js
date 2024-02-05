const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
    try  {
        const token = req.header('Authorization');
        console.log(token);
        const decodedToken = jwt.verify(token, 'secretKey');
        const user = await User.findByPk(decodedToken.userId);
        req.user = user;
        console.log('inside auth');
        next();
    } catch (err) {
        return res.status(401).json({ err: err });
    }
}

module.exports = { authenticate };