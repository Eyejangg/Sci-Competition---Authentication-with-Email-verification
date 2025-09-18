import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const VerificationToken = sequelize.define("verificationToken", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false, // ห้ามเว้นว่าง
    unique: true, // ห้ามซ้ำ
  },
  userId: {
    // เป็น FK ของตาราง users key ของเขา หรือ attb ของเขา คือ id !!
    type: DataTypes.INTEGER,
    allowNull: false,
    reference: {
      model: "user",
      key: "id",
    },
  },
  expiresAt: {
    // วันที่และเวลา token หมดอายุ
    type: DataTypes.DATE, // date
    allowNull: false,
  },
});

export default VerificationToken;
