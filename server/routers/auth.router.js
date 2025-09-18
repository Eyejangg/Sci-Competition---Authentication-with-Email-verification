const router = express.Router();
import express from "express";
import authController from "../controllers/auth.controller.js";
//POST http://localhost:5000/api/v1/auth/signup
router.post("/signup", authController.signUp);

// router.get("/verify/:token", authController.verifyEmail); // เขาส่ง Token มาใน URL

//POST http://localhost:5000/api/v1/auth/signup
//router.post("/signin", authController.signIn);

export default router;
