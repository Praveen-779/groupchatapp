const sequelize = require('./database');
const Message = require('../models/messages');
const ArchievedChat = require('../models/archievedChats');

exports.moveOldChatsToArchieved = async() => {
   const t = await sequelize.transaction();

   try {
    const messages = await Message.findAll({
        attributes : ['name','message','groupId','userId']
    })

    await ArchievedChat.bulkCreate(messages, {transaction: t});

    await Message.destroy({truncate: true, transaction: t});

    await t.commit();
    console.log('successfully transfered chats to archieved database and truncated messages db');
   } catch(err) {
    console.log(err);
    console.log('chats not transferred to Archieved');
   }
}