import express from "express";
const app = express();
import dotenv from "dotenv";
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config();
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

const initDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database Connection Established Successfully");
    if (NODE_ENV === "development") {
      await db.sequelize.sync({ alter: true });
      console.log("Database Synced in Development MODE :))");
    }
  } catch (error) {
    console.error("Unable to connect to database :((", error);
  }
};

initDatabase();

import db from "./models/index.js";

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
  res.send("Activities Restful API ");
});

//use routers
app.use("/api/v1/activities", activityRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
