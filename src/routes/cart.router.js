const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cartRouter = express.Router();

cartRouter.route('/carts')
    .get(verifyJWT, getAll)
    .post(verifyJWT,create);

cartRouter.route('/carts/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cartRouter;