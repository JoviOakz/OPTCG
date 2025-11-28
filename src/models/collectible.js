import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Collectible = sequelize.define('Collectible', {
  nome: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.STRING, allowNull: false },
  raridade: { type: DataTypes.STRING, allowNull: false },
  colecao: { type: DataTypes.STRING, allowNull: false },
  condicao: { type: DataTypes.STRING, allowNull: false },
  ownerId: { type: DataTypes.INTEGER, allowNull: false }
});

export default Collectible;