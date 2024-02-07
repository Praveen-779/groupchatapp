const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ArchievedChat = sequelize.define('archievedchat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    message : Sequelize.STRING
    
})

module.exports = ArchievedChat;