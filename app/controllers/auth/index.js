const User = require('../../models/user')
const { checkPassword } = require('../../utils/bcrypt')
const {jwtSign} = require("../../config/jwtConfig");

exports.signIn = async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({where: { email}})
        if (user.dataValues.email !== email || !checkPassword(password, user.password)){
            return res.status(400).json({msg: 'BAD REQUEST PASSWORD OR EMAIL NOT VALID'})
        }
        const token = await jwtSign({id: user.id, email: user.email})
        const uUser = await UserModel.update({token}, {where: {id: user.id}})
        console.log(uUser)
        return res.status(200).json({msg: 'OK', user: {...user.dataValues, token}})
    } catch (e) {
        return res.status(400).json({msg: 'BAD REQUEST'})
    }
}

exports.signUp = async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED' });

    try {
        const { email, password, firstName, lastName, pseudo } = req.body;
        
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: 'BAD REQUEST USER ALREADY EXISTS' });
        }
       
        const newUser = await UserModel.create({ email, password, firstName, lastName, pseudo });
        // Generate the token JWT
        const token = await jwtSign({ id: newUser.id, email: newUser.email });
        await UserModel.update({ token }, { where: { id: newUser.id } });
        
        return res.status(201).json({ msg: 'CREATED', user: { ...newUser.dataValues, token } });

    } catch (error) {
        return res.status(400).json({ msg: 'BAD REQUEST', error: error.message });
    }
};



