const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const MultiMedia = sequelize.define('multimedia', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url : Sequelize.STRING,
    username: Sequelize.STRING,
    userId : Sequelize.INTEGER,
    groupId : Sequelize.INTEGER,
    
    
})

module.exports = MultiMedia;