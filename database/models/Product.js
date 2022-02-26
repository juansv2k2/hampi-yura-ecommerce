const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    //alias
    "Product",

    //cols
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      category: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      destacado: DataTypes.INTEGER,
    },

    //config
    {
      tableName: "products",
      //hay que usar timestamps para hacer el borrado inteligente: tiene que estar en true!
      timestamps: true,
      //también tenemos que definir esta propiedad para el borrado inteligente
      paranoid: true,
    }
  );

  //Asociaciones
  Product.associate = (models) => {
    Product.belongsToMany(models.Cart, {
      as: "carts",
      through: "carts_products",
      foreignKey: "id_product",
      otherKey: "id_cart",
      timestamps: false,
    });
  };
  return Product;
}