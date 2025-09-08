import sequelize from "./db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt.js";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false,
    },
  },
  {
    hook: {
      beforeCreate: async (user) => {
        if (user.password) {
        }
      },
    },
  }
);

User.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });

export default User;
