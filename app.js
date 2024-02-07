const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const cron = require('node-cron');

const sequelize = require('./util/database');
const scheduler = require('./util/scheduler');

const User = require('./models/user');
const Message = require('./models/messages');
const UserGroup = require('./models/usergroup');
const Group = require('./models/group');
const Invite = require('./models/invite');
const IsAdmin = require('./models/isadmin');
const MultiMedia = require('./models/multimedia');

const app = express();

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/group');
const inviteRoutes = require('./routes/invite');
const adminRoutes = require('./routes/admin');
const sendfileRoutes = require('./routes/sendfile');

app.use(cors({origin: '*' }));

app.use(express.json());

app.use('/user',userRoutes);
app.use('/message',messageRoutes);
app.use('/group',groupRoutes);
app.use('/invite',inviteRoutes);
app.use('/admin',adminRoutes);
app.use('/file',sendfileRoutes);

app.use((req, res) => {
    console.log(`${req.url}`);
    const filePath = path.join(__dirname, 'views', `${req.url}`);
    res.sendFile(filePath);
});

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: UserGroup});
Group.belongsToMany(User, { through : UserGroup});

Group.hasMany(Message);
Message.belongsTo(Group);

console.log(process.env.PORT);

sequelize.sync()
.then(result => {
    app.listen(process.env.PORT);
})
.catch(err => console.log(err))

cron.schedule('0 0 * * *', () => {
    scheduler.moveOldChatsToArchieved()
})