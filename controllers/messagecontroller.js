const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postMessage = async (req,res,next) => {
    try {
        const message = req.body.message;
        const response = await req.user.createMessage({message : message});
        res.status(200).json({message : 'Message Sent'});

    } catch(err) {
        console.log(err);
        res.status(500).json({message : 'something went wrong'});
    }
}