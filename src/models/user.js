import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    allowNull: false,
    defaultValue: "user"
  }
}, {
  tableName: "users"
});

export default User;
