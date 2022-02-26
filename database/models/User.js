const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    //Alias
    "User",

    //Cols
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      admin: DataTypes.TINYINT,
    },

    //Config
    {
      tableName: "users",
      timestamps: false,
    }
  );

  //Asociaciones
  User.associate = (models) => {
    User.hasMany(models.Cart, 
      { as: "carts", foreignKey: "id_user" });
  };
  return User;
};
