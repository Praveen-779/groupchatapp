const User = require('../models/user');
// const sequelize = require('../util/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phonenumber;
    const password = req.body.password;

    try {
        if (!name || !email || !phoneNumber || !password) {
            return res.status(500).json({ message: 'fill in all the details' });
        }

        const isUserExist = await User.findOne({
            where: { email: email }
        })

        if (isUserExist) {
            console.log('inside isuserexist')
            return res.status(409).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const response = await User.create({
            name: name,
            email: email,
            phonenumber: phoneNumber,
            password: hashedPassword
        });
        res.status(200).json({ message: 'Sign Up successfull' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }

}



exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'please fill all the details' });
        }

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        if (user.email === email) {
            const bcryptPassword = await bcrypt.compare(password, user.password);

            if (bcryptPassword) {
                return res.status(200).json({ message: 'user login successfull', token: generateJwtToken(user.id) });
            }
            return res.status(401).json({ message: 'password incorrect' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err, message: 'something went wrong' });
    }

}

exports.getUser = async (req, res, next) => {
    try {
        console.log('inside getuser');
        const users = await User.findAll();
        return res.status(200).json({ users });
    } catch(err) {
        console.log(err);
        return res.status(500).json({err});
    }
    
}

function generateJwtToken(id) {
    return jwt.sign({ userId: id }, 'secretKey');
}