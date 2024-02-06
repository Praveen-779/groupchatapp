const Group = require('../models/group');
const UserGroup = require('../models/usergroup');
const User = require('../models/user');
const Invite = require('../models/invite');

exports.postInvite = async (req,res,next) => {
    try {
        const id = req.query.id;
        const groupId = req.query.groupid;
    
        const user = await Invite.findOne({where : {
            groupId : groupId,
            invitedto : id,
            
        }})
        if(!user) {
            const invitee = await User.findOne({where : {
                id: id
           }})
           
           const group = await Group.findOne({where : {
               id : groupId
           }})
           const response = await Invite.create({
               invitedby : req.user.id,
               invitedto : id,
               groupId : groupId,
               status : 'pending',
               inviteename : invitee.name,
               invitorname : req.user.name,
               groupname : group.groupname
           })
           return res.status(200).json({message : 'user invited successfully' })
        }

        if(user.status === 'pending') {
            return res.status(200).json({message : 'user already invited'});
        }

        if(user.status === 'Accepted') {
            return res.status(200).json({message : 'User is already in the group'});
        }

       
    } catch(err) {
        console.log(err);
        res.status(500).json({err})
    }
   
}

exports.getInvitedHistory = async (req,res,next) => {
    try {
        const inviteHistory = await Invite.findAll({where : {
            invitedby : req.user.id
        }})
        return res.status(200).json({inviteHistory});

    } catch(err) {
        console.log(err);
        return res.status(500).json({err});
    }
    
}

exports.getInviteRequests = async (req,res,next) => {
    try {
        const invites = await Invite.findAll({where : {
            invitedto : req.user.id,
            status : 'pending'
        }})
        return res.status(200).json({invites});
    } catch(err) {
        console.log(err);
        res.status(500).json({err});
    
    }
}

exports.acceptInvite = async(req,res,next) => {
    const id = req.params.id
    console.log(req.user.id);
    try {
        const invite = await Invite.findOne({where : {
            id : id,
            status: 'pending'
        }})
        if(invite) {
            const response = await UserGroup.create({userId : req.user.id, groupId : invite.groupId })
            await  invite.update({status : 'Accepted'});
            return res.status(200).json({message: 'Invite Accepted Successfully'});
        }
        return res.status(404).json({message: 'Invite Not Found'});
      
    } catch(err) {
        console.log(err);
        res.status(500).json({err});
    }
}

exports.declineInvite = async(req,res,next) => {
    const id = req.params.id;
    console.log(req.user.id);
    try {
        const invite = await Invite.findOne({where : {
            id : id,
            status: 'pending'
        }})
        if(invite) {
            await invite.destroy()
            return res.status(200).json({message : 'You Declined Invite'})
        }
        return res.status(404).json({message : 'invite not found'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({err});
    }
}