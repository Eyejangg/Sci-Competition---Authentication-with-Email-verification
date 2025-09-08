import jwt from "jsonwebtoken";
import authconfig from "../config/auth.config.js";
// import db from "../models/index.js";
// const User = db.User;
import User from "../models/user.model.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No Token Provided!" });
  }
  jwt.verify(token, authconfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).senf({ message: "Unauthorized!" });
    }
    req.username = decoded.username;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.username).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName === "admin") {
          next();
          return;
        }
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require admin role!" });
    });
  });
};

const isModOrAdmin = (req, res, next) => {
  User.findByPk(req.username).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName === "moderator" ) {
          next();
          return;
        }
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require admin role!" });
    });
  });
};
const authJwt = { verifyToken, isAdmin, isModOrAdmin };
export default authJwt;
