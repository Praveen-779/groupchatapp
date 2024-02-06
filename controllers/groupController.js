const Group = require('../models/group');
const UserGroup = require('../models/usergroup');
const User = require('../models/user');
const Invite = require('../models/invite');
const IsAdmin = require('../models/isadmin');
const Sequelize = require('sequelize');

exports.createGroup = async (req, res, next) => {
    const groupName = req.body.groupname;
    const group = await Group.create({ groupname: groupName, createdby: req.user.name });
    await UserGroup.create({ userId: req.user.id, groupId: group.id });
    await IsAdmin.create({
        isadmin: true,
        username: req.user.name,
        userId: req.user.id,
        groupId: group.id
    })

    Invite.create({
        invitedto: req.user.id,
        groupId: group.id,
        status: 'Accepted',
        inviteename: req.user.name,
        groupname: group.groupname
    })
    return res.status(201).json({ message: "group created successfully" })

}

exports.getGroups = async (req, res, next) => {
    try {
        console.log(req.user.id);
        const groups = await req.user.getGroups();
        res.status(200).json({ groups });
    } catch (err) {
        res.status(500).json({ err });
    }

}

exports.getUsers = async (req, res, next) => {
    try {
        const groupId = req.params.groupId;
        const currentUserId = req.user.id;

        const group = await Group.findByPk(groupId, {
            include: {
                model: User,
                through: UserGroup,
                where: {
                    id: {
                        [Sequelize.Op.not]: currentUserId,
                    },
                },
            },
        });
        if (!group) {
            return res.status(200).json({ message: "no users in the group" })
        }

        return res.status(200).json({ users: group.users });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
    }
};

exports.removeUserFromGroup = async (req, res, next) => {
    try {
        const groupId = req.query.groupId;
        const userId = req.query.id;
        if (groupId && userId) {
            await Invite.destroy({
                where: {
                    invitedto: userId,
                    groupId: groupId
                }
            })
            await IsAdmin.destroy({where : {
                groupId : groupId,
                userId : userId
            }})
            await UserGroup.destroy({where : {
                groupId : groupId,
                userId : userId
            }})
            if(!UserGroup) {
                return res.status(200).json({message : 'User Is Already Removed'});
            }
           return res.status(200).json({message : 'User has removed From Group'})
        }
        return res.status(200).json({message : 'No user found'})

    } catch (err) {
        console.log(err)
        res.status(500).json({ err });
    }
}
