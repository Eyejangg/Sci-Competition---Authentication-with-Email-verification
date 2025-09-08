import sequelize from "./db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt.js";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, // ห้ามเว้นว่าง
      primaryKey: true, // PK ค่าหลักของแต่ละแถว
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // ห้ามซ้ำ [ อีเมลห้ามซ้ำในระบบ ]
      validate: {
        isEmail: true, // ตรวจสอบรูปแบบ อีเมลล์ให้ถูกต้อง
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // เก็บ Type
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN, // ข้อมูลแบบ T/F ใช้ระบุอีเมลล์ว่ายืนยันรึยัง
      default: false, // ถ้ายังไม่ระบุเริ่มต้นที่ False
      allowNull: false,
    },
  },
  {
    hook: {
      beforeCreate: async (user) => {
        // ก่อนสร้าง
        if (user.password) {
          const salt = await becrypt.genSalt(10); // ยิ่งใส่เยอะยิ่งถอดรหัสยาก - ข้อเสีย compare ใช้เวลานาน // genSalt สร้างค่าแบบสุ่มเข้าไปกับรหัสผ่านเพื่อกันโดนการ attack
          user.password = becrypt.hash(user.password, salt);
        }
      },
      beforeupdate: async (user) => {
        // ก่อนอัพเดท
        if (user.changed("password")) {
          const salt = await becrypt.genSalt(10);
          user.password = becrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (candidatePassWord) {
  return await bcrypt.compare(candidatePassWord, this.password); // candidate = รหัสผ่านผู้ใช้กรอกเข้ามา  this . พาสเวิร์ดนี้นะ
};

User.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });

export default User;
