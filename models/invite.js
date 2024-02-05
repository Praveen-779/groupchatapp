const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Invite = sequelize.define('invite', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    invitedby: Sequelize.INTEGER,
    invitedto: Sequelize.INTEGER,
    inviteename : Sequelize.STRING,
    invitorname : Sequelize.STRING,
    groupname : Sequelize.STRING,
    groupId: Sequelize.INTEGER,
    status: Sequelize.STRING

})

module.exports = Invite;