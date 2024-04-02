const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Image = require('../models/Image');
const {Op} = require('sequelize')

const getAll = catchError(async(req, res) => {
    const options = {
        include: [
            { model: Category, 
              attributes: ["id", "name"]
            },
            { model: Image, 
              attributes: ["url"]
            }
        ],
    }
    if(req.query.title) options.where = { title: {[Op.iLike]: '%'+req.query.title+'%'}};
    if(req.query.categoryId) options.where = {categoryId: +req.query.categoryId}; 
    const products = await Product.findAll(options);
    return res.json(products);
});

const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, {include: [Category, Image]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
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