import db from "../models/index.js";
import authConfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";
const User = db.User;
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/email.js";
import verificationToken from "../models/verificationToken.model.js";

import path from "path"; // เรียกใช้ path 18/9/2568

//Register
const signUp = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;
  try {
    //Validate request
    if (!email || !password || !type || !name) {
      return res
        .status(400)
        .send({ message: "Email , Password , Type and Name are required !" });
    }
    //Validate user type
    const allowedTypes = ["admin", "teacher", "judge"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({
        message: "Invalid user Type. Must be admin, teacher or judge !",
      });
    }
    if (type === "teacher" && (!school || !phone)) {
      return res
        .status(400)
        .send({ message: "School and Phone are required for teacher!" });
    }
    //check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use!" });
    }

    //Create user object base on type
    const userData = {
      name: name,
      email: email,
      password: password,
      type: type,
      isVerified: false,
    };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    //Create new user
    const user = await User.create(userData);

    //If user is a teacher, create and send verification email
    if (type === "teacher") {
      try {
        const token = crypto.randomBytes(32).toString("hex");
        const verification = await db.verificationToken.create({
          token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        console.log("Verification Token Created", verification);

        //TODO Send Verification Email
        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verification Email Sent Successfully!");
      } catch (error) {
        console.error("Error Sending Verification Email", error);
      }
    }

    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registration successfully! please check your email to verify your account"
          : "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the user",
    });
  }
};

const signup = async (req, res) => {};

const verifyEmail = async (req, res) => {
  // เขาส่ง Token มาใน URL
  const { token } = req.params;
  if (!token) {
    res.status(400).send({ message: "Token is missing !" }); // หลังจาก เขาส่ง Token มา เราต้องทำอะไรต่อ
  }

  try {
    const verification = await db.verificationToken.findOne({
      // หา Token ในตาราง verificationToken

      where: { token }, // ถ้าเกิดใน js เราลดตัวแปรชื่อเหมือนกัน เราเขียนแค่ token ได้เลย / token:token หรือ token
    });

    if (!verification) {
      return res.status(400).send({ message: "Invalid verification Token !" });
    }

    // Check if token is expired เช็คว่าหมดอายุมั้ย

    if (new Date() > verification.expiredAt) {
      await verificationToken.destroy(); // ถ้าหมดอายุให้ลบ Token ทิ้ง
      return res
        .status(400)
        .send({ message: "Verification Token has expired" });
    }

    const user = await User.findByPk(verification.userId); // หา user ที่มี id ตรงกับ userId ในตาราง verificationToken มองเป็น บัตรคอนเสิร์ต
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    await user.update({ isVerified: true }); // อัพเดทสถานะ isVerified เป็น true
    await verificationToken.destroy(); // ลบ Token ทิ้ง otp ใช้ครั้งเดียว

    // return web view - การต่อ string
    const htmlPath = path.join(process.cwd(), "view", "verification.html"); // ต่อ โฟลเดอร์ view ตามด้วย verfication.html ชื่อไฟล์
    res.sendFile(htmlPath);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error accurred while verifying email",
    });
  }
};

const authController = {
  signUp,
};

export default authController;
