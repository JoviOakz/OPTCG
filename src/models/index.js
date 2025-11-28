import Sequelize from "sequelize";
import sequelize from "../config/database.js";

// Importação dos modelos
import User from "./user.js";
import Collectible from "./collectible.js";

// Associação: 1 usuário → muitos colecionáveis
User.hasMany(Collectible, { foreignKey: "ownerId", onDelete: "CASCADE" });
Collectible.belongsTo(User, { foreignKey: "ownerId" });

export default {
  sequelize,
  Sequelize,
  User,
  Collectible
};
