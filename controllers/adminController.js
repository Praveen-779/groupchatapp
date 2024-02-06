const Group = require('../models/group');
const UserGroup = require('../models/usergroup');
const User = require('../models/user');
const Invite = require('../models/invite');
const IsAdmin = require('../models/isadmin');

exports.isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.id, "inside con")
        const groupId = req.params.groupId;
        const isAdmin = await IsAdmin.findOne({
            where: { groupId: groupId, userId: req.user.id }
        })
        if (isAdmin) {
            return res.status(200).json({ isAdmin: true })
        }
        return res.status(200).json({ isAdmin: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
    }
}

exports.makeAdmin = async (req, res, next) => {
    try {
        const groupId = req.query.groupid;
        const userId = req.query.id;
        const isAdmin = await IsAdmin.findOne({
            where: {
                userId: userId,
                groupId: groupId,
                isadmin: true
            }
        })
        if (isAdmin) {
            return res.status(200).json({ message: 'User Is Already An Admin' })
        }
        const user = await User.findOne({ where: { id: userId } });
        await IsAdmin.create({
            isadmin: true,
            username: user.name,
            userId: userId,
            groupId: groupId
        })
        return res.status(200).json({ message: "Made As Admin Successfully" });
    } catch (err) {
        console.log(err);
    }

}