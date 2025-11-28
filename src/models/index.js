const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Importação dos modelos
const User = require("./User");
const Collectible = require("./collectible");

// Associação: 1 usuário → muitos colecionáveis
User.hasMany(Collectible, { foreignKey: "ownerId", onDelete: "CASCADE" });
Collectible.belongsTo(User, { foreignKey: "ownerId" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Collectible
};
