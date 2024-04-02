const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const purchases = await Purchase.findAll({
        include: [Product],
        where: {userId: req.user.id}
    });
    return res.json(purchases);
});

const create = catchError(async(req, res) => {
    const cartProducts = await Cart.findAll({
        where: {userId: req.user.id},
        attributes: ['userId', 'quantity', 'productId'],
        raw: true,
        });
    if(cartProducts?.length===0)return res.status(400).json({message: "Empty shopping cart."})
    const purchases = await Purchase.bulkCreate(cartProducts);
    await Cart.destroy({where: {userId: req.user.id}})
    return res.json(purchases);
});

module.exports = {
    getAll,
    create
}
