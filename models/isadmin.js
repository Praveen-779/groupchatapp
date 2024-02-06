const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const IsAdmin = sequelize.define('isadmin', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    isadmin : Sequelize.BOOLEAN,
    username : Sequelize.STRING,
    groupId : Sequelize.INTEGER,
    userId : Sequelize.INTEGER

})

module.exports = IsAdmin;