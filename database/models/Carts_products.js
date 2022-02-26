const { DataTypes } = require("Sequelize");
module.exports = (sequelize) => {
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        priceUnit: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        id_product: DataTypes.INTEGER,
        id_cart: DataTypes.INTEGER,
    };

    const Carts_products = sequelize.define("Carts_products", cols, {
        tableName: "carts_products",
        timestamps: false,
    });

    Carts_products.associate = function (models) {
        Carts_products.belongsTo(models.Cart, {
            as: "products",
            foreignKey: "id_cart",
        });

        Carts_products.belongsTo(models.Product, {
            as: "carts",
            foreignKey: "id_product",
        });
    };

    return Carts_products;
};
