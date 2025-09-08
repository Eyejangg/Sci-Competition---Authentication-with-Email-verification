import nodemailer from "nodemailer"; // ฟังขั่นในการส่ง Email จะส่ง Email ต้องใช้ตัวนี้
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailtemplate.js";

dotenv.config();
