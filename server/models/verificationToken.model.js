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
      model: "user",
      key: "id",
    },
  },
  expiredAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default verificationToken;
