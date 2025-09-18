import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const verificationToken = sequelize.define("verificationToken", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Export model
export default verificationToken;
