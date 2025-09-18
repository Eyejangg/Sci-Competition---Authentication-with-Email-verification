import sequelize from "./db.js";
import Sequelize from "sequelize";
import Activity from "./activity.model.js";
import User from "./user.model.js";

import VerificationToken from "./verificationToken.model.js";

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Activity = Activity;
db.VerificationToken = VerificationToken;

//Association
db.VerificationToken.belongsTo(db.User, { foreigKey: "userId" });
db.User.belongsTo(db.VerificationToken, { foreigKey: "userId" });

export default db;
