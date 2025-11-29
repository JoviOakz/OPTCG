import Sequelize from "sequelize";
import sequelize from "../config/database.js";

import User from "./user.js";
import Collectible from "./collectible.js";

User.hasMany(Collectible, { foreignKey: "ownerId", onDelete: "CASCADE" });
Collectible.belongsTo(User, { foreignKey: "ownerId" });

export default {
  sequelize,
  Sequelize,
  User,
  Collectible
};
