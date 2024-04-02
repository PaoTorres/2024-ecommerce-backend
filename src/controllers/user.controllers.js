const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { firstName, lastName, email, password, phone} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = { firstName, lastName, email, phone,
        password: encryptedPassword
    }
    const result = await User.create(newUser);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.user;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.user;
    const {firstName, lastName, phone}= req.body;
    const userData = {firstName, lastName, phone }
    const result = await User.update(
        userData,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res)=>{
  const {password, email} = req.body;
  const user = await User.findOne({where: {email: email}});
    if(!user) res.status(401).json({message: 'Invalid Credentials.'})
    //if(!user.isVerified) res.status(401).json({ message: 'User is not verified.' });
    const isValid =  await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({message: 'Invalid Credentials.'})
    const token = jwt.sign({user}, process.env.TOKEN_SECRET, {expiresIn: '1d'});
    return res.json({user, token});
})

const getLoggedUser = catchError(async(req, res)=>{
  const user = req.user;
  return res.json(user);
});

module.exports = { 
    login, 
    getLoggedUser,
    getAll,
    create,
    getOne,
    remove,
    update
}   

