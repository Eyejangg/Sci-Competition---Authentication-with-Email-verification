import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Admin = User.init(
  {},
  {
    defaultScope: {
      where: {
        type: "admin", //
      },
    },
    hooks: {
      beforeCreate: (admin) => {
        admin.type = "admin"; //
      },
    },
  }
);

export default Admin;
