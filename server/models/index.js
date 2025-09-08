import sequelize from "./db.js";
import Sequelize from "sequelize"
import User from "./user.model.js"
import Role from "./role.model.js"
import Activity from "./activity.model.js";


const db = {};


// S ตัวเล็ก
db.sequelize = sequelize;
// S ตัวใหญ่
db.Sequelize = Sequelize;


db.User = User;
db.Role = Role;


// Association
db.User.belongsToMany(db.Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});


db.Role.belongsToMany(db.User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});


export default db;
