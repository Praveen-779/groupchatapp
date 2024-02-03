const User = require('../models/user');
const sequelize = require('../util/database');

exports.signUp = async (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phonenumber;
    const password = req.body.password;
    console.log(name,email,phoneNumber,password);

    try {
        if(!name || !email || !phoneNumber || !password) {
            return res.status(500).json({message: 'fill in all the details'});
        }

        const isUserExist = await User.findOne({
            where : {email : email}
        })

        if(isUserExist) {
            console.log('inside isuserexist')
            return res.status(409).json({message: 'User already exists'});
        }

        const response = await User.create({
            name:name,
            email:email,
            phonenumber:phoneNumber,
            password:password
        });
        res.status(200).json({message : 'Sign Up successfull'});
    } catch(err) {
        console.log(err);
        res.status(500).json({err : err});
    }
    
}