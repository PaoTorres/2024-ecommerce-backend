const { getAll, create, getOne, remove, update, login, getLoggedUser } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require("../utils/verifyJWT");

const userRouter = express.Router();

userRouter.route('/users')
    .post(create)    
    .get(verifyJWT, getAll)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

userRouter.route('/users/login')
    .post(login)

userRouter.route('/users/me')
    .get(verifyJWT, getLoggedUser);

userRouter.route('/users/:id')
    .get(verifyJWT, getOne)


module.exports = userRouter;