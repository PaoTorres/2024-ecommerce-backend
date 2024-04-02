const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

//Este modelo representa una relación muchos a muchos entre usuarios y productos.
const Cart = sequelize.define('cart', {
    // userId viene de relacion muchos a muchos 
    // productId viene de relacion muchos a muchos
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Cart;