const Group = require('../models/group');
const UserGroup = require('../models/usergroup');
const User = require('../models/user');

exports.createGroup = async (req, res, next) => {
    const groupName = req.body.groupname;
    const group = await Group.create({ groupname: groupName , createdby : req.user.name});
    const response = await UserGroup.create({ userId: req.user.id, groupId: group.id })
    return res.status(201).json({ message: "group created successfully" })

}

exports.getGroups = async (req, res, next) => {
    try {
        console.log(req.user.id);
        const groups = await req.user.getGroups();
        res.status(200).json({ groups });
    } catch(err) {
        res.status(500).json({err});
    }
    
}