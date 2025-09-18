import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailTemplate.js";

dotenv.config();
//Create Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

//Verify SMTP Connection Configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Connection Error", error);
  } else {
    console.log("SMTP Server is ready to send mail");
  }
});

//Send Verification Email
export const sendVerificationEmail = async (email, token, username) => {
  const verficationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${token}`;

  const mailOption = {
    from: {
      name: "ระบบการแข่งขันวันวิทยาศาสตร์",
      address: process.env.EMAIL_FROM,
    },
    to: email,
    subject: "กรุณายืนยันอีเมลของคุณ - ระบบแข่งขันวันวิทยาศาสตร์",
    html: getVerificationEmailTemplate(verficationUrl, username),
    text: `ยินดีต้อนรับสู่ระบบการแข่งขันวันวิทยาศาสตร์!\n\nเรียน คุณ${username},\n\nขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันวันวิทยาศาสตร์
    กรุณายืนยันอีเมลของคุณโดยคลิกที่ลิ้งก์ด้านล่าง \n\n ${verficationUrl} \n\n
    ลิ้งก์ยืนยันอีเมลจะหมดอายุภายใน 24 ชั่วโมงหากคุณไม่ได้เป็นผู้ลงทะเบียน 
    กรุณาละเว้นการคลิกลิ้งก์นี้ \n\n นี่เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้`,
  };
  try {
    const info = await transporter.sendMail(mailOption);
    console.log("Verification Email Sent Successfully!");
    return info;
  } catch (error) {
    console.error("Error Sending Email", error);
  }
};
