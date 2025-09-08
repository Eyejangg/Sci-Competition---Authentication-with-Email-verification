import { DataTypes } from "sequelize";
import User from "./user.model.js";
// Teacher + User.init  ใน User เก็บอะไร เราจะเก็บไว้
// ถ้าเป็น DataClass Sequelize User.init . คุณสมบัติของ squelize
// ถ้าเป็น DaTaClass ปกติ ใช้ Extend
const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      // ทำไม Phone เป็น string เราไม่ต้องการให้มันตัดเลข 0 ข้างหน้าออก / ถ้าเป็น INT มันจะตัด 0 ทิ้ง
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    scopes: {
      // ถ้าทำแบบนี้ จะเติม WHERE ให้เสมอ เมื่อเรียกใช้ Teacher ใน Scope นี้
      defaultScope: {
        where: {
          type: "teacher",
        },
      },
    },
  },
  {
    hook: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);
export default Teacher;
