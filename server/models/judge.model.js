import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Judge = User.init(
  {},
  {
    defaultScope: {
      where: {
        type: "Judge", //
      },
    },
    hooks: {
      beforeCreate: (Judge) => {
        Judge.type = "Judge"; //
      },
    },
  }
);

export default Judge;
