import jwt from "jsonwebtoken";
import authConfig from "../config/authConfig.js";
import db from "../models/index.js";
import cryto from "crypto";
const User = db.User;

//Register
const signUp = async (req, res) => {
  const { email, password, type, name } = req.body; // signUp บังคับกรอกข้อมูล
  try {
    if (!email || !password || !type || !name) {
      // Check Validate Req - มันถูกต้องมั้ย ตรวจสอบ ต้องส่ง 4 fild ให้ก่อนนะ
      //  ถ้าไม่มี email , password , type , name
      return res
        .status(400)
        .send({ message: "Email, password, type, and name are Required !!! " });
    }

    // Validate user type
    const allowedTypes = ["admin", "teacher", "judge"]; // Check Type  ตรงมั้ย
    if (!allowedTypes.includes(type)) {
      return res.status(400).send({
        message: "Invalid user type. Must be admin, teacher or judge",
      });
    }
    //ตรรกะศาสตร์
    // อันใดอันนึ่งเป็นจริง ถือว่าเป็นจริง
    //Addition Validation for teacher
    if (type === "teacher" && (!school || !phone)) {
      return res
        .status(400)
        .send({ message: "school and phone are required for teacher!" });
    }
    //check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in Use!" });
    }

    //Create User object base on type
    const userData = {
      name: name,
      email: email,
      password: password,
      type: type,
    };
    if (type === "teacher") {
      //ถ้าเป็น Teacher
      userData.school = school;
      userData.phone = phone;
    }

    // Create New User
    const user = await User.create(userData);

    // if user is a teacher, create and send verification emial
    // import crypto use crypto
    if (type === "teacher") {
      try {
        //create verification token
        const token = crypto.randomBytes(32).toString("hex");
        const verification = await db.VerificationToken.create({
          userid: user.id,
          expiredAt: new Date(DateRansfer.now() + 24 * 60 * 60 * 1000), // 24H ตอนนี้ บวกเพิมไปอีก 24 H
        });
        //SEND EMAIL !! !! !!
      } catch (error) {}
    }

    // ถุ้าเกิดมันเป็นจริง
    // ถ้า user เป็น teacher จะส่งข้อความยืนยัน และคืนค่า isVerified มาด้วย
    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registration Successfully! Please check your Email To Veriy your account"
          : "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        // เพิ่ม isVerified เฉพาะ teacher
        ...User(user.type === "teacher" && { isVerified: user.isVerified }), // ถ้าเกิดเขาเป็น user เขาจะได้ Verified
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some Error occured while creating the user",
    });
  }
};
