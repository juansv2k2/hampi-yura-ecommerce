const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {
  const Cart = sequelize.define(
    //Alias
    "Cart",

    //Cols
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: DataTypes.DATE,
      id_user: DataTypes.INTEGER,
    },

    //Config
    {
      tableName: "carts",
      timestamps: false,
    }
  );

  //Asociaciones
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { as: "users", foreignKey: "id_user" });
    Cart.belongsToMany(models.Product, {
      as: "products",
      through: "carts_products",
      foreignKey: "id_cart",
      otherKey: "id_product",
      timestamps: false,
    });
  };
  return Cart;
};


