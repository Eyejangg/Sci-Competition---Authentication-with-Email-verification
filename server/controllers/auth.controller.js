import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import config from "../config/auth.config.js";
import bcrypt from "bcryptjs"; // ใช้เข้ารหัสของ password
import jwt from "jsonwebtoken";
import { Op } from "sequelize"; // import operator เช่น AND OR


const authController = {};
authController.Register = async (req, res) => {
    // user ส่ง ข้อมูลผ่าน body
    const { username, fullName, email, password } = req.body;


    // validate ข้อมูล ที่ user ส่งมา
    if (!username || !fullName || !email || !password){
        res.status(400).send({ message: "Please provide all require fields." });
        return;
    }


    // เช็ค username ซ้ำว่ากันไหม
    // SQL = SELECT * FROM user WHERE username = username;
    await User.findOne({ where: { username: username }, attributes: { exclude: ['password'] } }) // .select(-password) คือ ไม่ดึง field password มาแสดง
    .then((user) => {
        // ถ้ามี username อยู่แล้วจะไม่ให้ทำ process ต่อไป
        if(user){
            res.status(400).send({ message: "Username is already existed." });
            return;
        }


        const newUser = {
          username: username,
          fullName: fullName,
          email: email,
          password: bcrypt.hashSync(password, 8),
        };


        User.create(newUser).then((user) => {
            // เช็คว่า user ส่ง role มาด้วยไหม
            // send roles in body [ADMIN] *แอดมินเป็นคนส่งมา
            if(req.body.roles){
                // นำ roles ที่ส่งมา เทียบกับ role ที่อยู่ใน table
                // SQL = SELECT * FROM ROLE WHERE roleName = role1 OR roleName = role2 OR roleName = role3
                Role.findAll({
                    where: {
                        roleName: { [Op.or]: req.body.roles } // เช็ค roles ที่ส่งมา
                    }
                }).then((roles) => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully" });
                    })
                })
            }else {
                // ใส่ค่า default role เป็น user
                // user สมัคร
                user.setRoles([1]).then(() => {
                        res.send({ message: "User registered successfully" });
                })
            }
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Something error while registering a new user"
            });
        });
    });
};

authController.singIn = async(req, res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.status(400).send({
            message: "Username or password are missing",
        });
        return;
    }
    await User.findOne({
        where:{ username:username },
    }).then((user)=>{
        if(!user){
            res.status(404).send({ message: "User not found!"});
            return;
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if(!passwordIsValid){
            res.status(401).send({message:"Invalid  password"})
        }
        //Valid User
        const token = jwt.sign({ username: user.username }, 
            config.secret,{
                expiresIn: 60 * 60 * 24,//60sec *60min *24h = 864000
            });
        const authorities = [];
        user.getRoles().then((roles)=>{
            for(let i = 0; i<roles.length; i++){
                //ROLES_USER
                authorities.push("ROLES_" + roles[i].roleName.toUpperCase());
            }
            res.send({
              token: token,
              authorities: authorities,
              userInfo: {
                name: user.fullName,
                email: user.email,
                username: user.username,
              },
            });
        });
        
    }).catch((err)=> {
        res.status(500).send({
        message:
            err.message || "Something error",
        });
    })
};

export default authController;