const { getAll, create, remove } = require('../controllers/images.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT')

const imageRouter = express.Router();

imageRouter.route('/products_images')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create)

imageRouter.route('/products_images/:id')
    .delete(verifyJWT, remove)

module.exports = imageRouter;