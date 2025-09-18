import User from "./user.model.js";
import { DataTypes } from "sequelize";

const Teacher = User.init(
  {
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "teacher",
    },
  },
  {
    scopes: {
      defaultScope: {
        where: { type: "teacher" },
      },
    },
    hooks: {
      beforeCreate: (teacher) => {
        teacher.type = "teacher";
      },
    },
  }
);

export default Teacher;
