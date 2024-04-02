const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar los routers aquí
router.use(userRouter)
router.use(categoryRouter)
router.use(productRouter)
router.use(imageRouter)
router.use(cartRouter)
router.use(purchaseRouter)

module.exports = router;