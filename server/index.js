import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;
import cors from "cors";
import activityRouter from "./routers/activity.router.js";
import authRouter from "./routers/auth.router.js";
import authJwt from "./middleware/authJwt.js";
app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/index.js";

// connect Database
const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully");
    if (NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
      console.log("database Synced in development");
    }
  } catch (error) {
    console.error("Unable to connect to datavase", error);
  }
};
initDatabase();

// db.sequelize.sync({ force: true }).then(() => {
//   innitRole();
//   console.log("Drop and Sync");
// });
// const innitRole = () => {
//   role.create({ id: 1, name: "admin" });
//   role.create({ id: 2, name: "manager" });
//   role.create({ id: 3, name: "teacher" });
//   role.create({ id: 4, name: "judge" });
// };

app.get("/", (req, res) => {
  res.send(" Restful API ");
});

//use routers
app.use("/api/v1/restaurants", activityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
