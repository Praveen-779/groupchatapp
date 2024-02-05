const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Message = require('../models/messages');
const Group = require('../models/group')
const Sequelize = require('sequelize');

exports.postMessage = async (req, res, next) => {
    try {
        const groupId = req.params.groupid;
        console.log(groupId)
        const message = req.body.message;
        const name = req.user.name;
        const response = await Message.create({ 
            name: name, 
            message: message,
            userId : req.user.id,
            groupId:groupId
         });
        res.status(200).json({ message: 'Message Sent' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'something went wrong' });
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        const groupId = req.query.groupid;
        console.log(groupId)
        if (groupId) {
            const messages = await Message.findAll(
                {where : { groupId : groupId }}
            );
            const group = await Group.findOne({
                where : { id : groupId}
            })
           return res.status(200).json({ messages: messages,group : group });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
}