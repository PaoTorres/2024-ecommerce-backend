const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const productRouter = express.Router();

productRouter.route('/products')
    .get(getAll)
    .post(verifyJWT, create);

productRouter.route('/products/:id')
    .get(getOne)
    .put(verifyJWT, update)
    .delete(verifyJWT, remove);

module.exports = productRouter;