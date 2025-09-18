import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Activity = sequelize.define("activity", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
    min: 1,
  },
  date: {
    type: DataTypes.DATE,
    required: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reg_open: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reg_close: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: false,
    match: [
      /^\w+([\.-]?\w+)*@\w([\.]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  status: {
    type: DataTypes.ENUM("draft", "open", "closed", "in_progress", "completed"),
    default: "draft",
  },
  created_at: {
    type: DataTypes.DATE,
    default: Date.now,
  },

  updated_at: {
    type: DataTypes.DATE,
    default: Date.now,
  },
});

Activity.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error created table", error);
  });
export default Activity;
