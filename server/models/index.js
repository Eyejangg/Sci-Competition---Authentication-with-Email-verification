import sequelize from "./db.js";
import Sequelize from "sequelize";
import User from "./user.model.js";
import Role from "./role.model.js";
import Activity from "./activity.model.js";
import Teacher from "./teacher.model.js";
import Admin from "./Admin.model.js";
import Judge from "./judge.model.js";
import User from "./user.model.js";
import VerificationToken from "./verificationToken.model.js";

// db ตรงนี้คือ object
const db = {};

// S ตัวเล็ก
// sequelize มาจาก db instant ที่สร้างมาจาก class ชื่อ sequelize
db.sequelize = sequelize;
// S ตัวใหญ่
// Sequelize มาจาก class ใน sequelize ที่เป็น libary ของเราและเรา import มาจาก sequelize
db.Sequelize = Sequelize;
// Design pattern แบบ ซิงเควตั้น -- ใน db จะได้ใช้แค่ object อันเดียว จะได้คุม อันอื่น
// db ตัวนี้คือ Attibute = User ข
db.User = User;
db.Admin = Admin;
db.Teacher = Teacher;
db.Judge = Judge;
db.VerificationToken = VerificationToken;

// Association
// BelongTOmany ||| BelongToOne
// db
// One-to-One (BelongsTo)
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" }); // VerificationToken มี userId เป็น FK
db.User.hasOne(db.VerificationToken, { foreignKey: "userId" }); // User มี VerificationToken ตัวเดียว

export default db;
