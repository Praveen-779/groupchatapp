const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const sequelize = require('./util/database');

const User = require('./models/user');

const app = express();

const userRoutes = require('./routes/user.js');

app.use(
    cors({
        origin: '*'
    })
);


app.use(express.json());

app.use('/user',userRoutes);

app.use((req, res) => {
    console.log(`${req.url}`);
    const filePath = path.join(__dirname, 'views', `${req.url}`);
    res.sendFile(filePath);
});


sequelize.sync()
.then(result => {
    app.listen(process.env.port);
})
.catch(err => console.log(err))