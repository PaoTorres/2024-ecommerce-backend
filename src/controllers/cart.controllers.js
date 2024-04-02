const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Cart.findAll({
        include: [{
          model: Product,
          include: [Image]
        }],
        where: {userId: req.user.id}
    });
    return res.json(results);
});

/* //Este getAll trae products mas no las imagenes de los productos.
const getAll = catchError(async(req, res) => {
    const results = await Cart.findAll({
        include: [Product],
        where: {userId: req.user.id}
    });
    return res.json(results);
});
*/
const create = catchError(async(req, res) => {
    const {quantity, productId} = req.body;
    const userId = req.user.id;
    const result = await Cart.create({
        quantity,
        productId,
        userId
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Cart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const {quantity} = req.body;
    if(+quantity<1) return res.status(400).json({message: "Quantity must me at least 1."})
    const { id } = req.params;
    const result = await Cart.update(
        {quantity},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}  


