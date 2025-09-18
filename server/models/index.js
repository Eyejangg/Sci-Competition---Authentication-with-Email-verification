import sequelize from "./db.js";
import Sequelize from "sequelize";
import Activity from "./activity.model.js";
import User from "./user.model.js";
import verificationToken from "./verificationToken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Activity = Activity;
db.verificationToken = verificationToken;

//Association
db.verificationToken.belongsTo(db.User, { foreignKey: "userId" });
db.User.hasMany(db.verificationToken, { foreignKey: "userId" });

export default db;
