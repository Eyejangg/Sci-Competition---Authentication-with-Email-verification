import express from "express";
import db from "./models/index.js";
import authRouter from "./routers/auth.router.js";
import dotenv from "dotenv";
dotenv.config()
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.PORT;

db.sequelize.sync({ force: false }).then(() => {
  console.log("create table user_roles");
});

import cors from "cors"

const app =  express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173", FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.get("/hello",(req, res) => {
    return res.send("Hello world!");
});

//use authentication router
app.use("/api/v1/auth", authRouter);

app.listen(PORT,() => {
    console.log("Listening to http://localhost:" + PORT);
})