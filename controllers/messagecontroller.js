const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Message = require('../models/messages');
const Sequelize = require('sequelize');

exports.postMessage = async (req, res, next) => {
    try {
        const message = req.body.message;
        const name = req.user.name;
        const response = await req.user.createMessage({ name: name, message: message });
        res.status(200).json({ message: 'Message Sent' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        newMessageId = req.query.newmessageid;
        if (newMessageId) {
            const messages = await Message.findAll(
                {where : { id : {
                   // using sequelize operator greaterthan
                    [Sequelize.Op.gt]: newMessageId
                }}}
            );
           return res.status(200).json({ messages: messages });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}