const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { email, password, role } = req.body;
  const SALT = Number(process.env.SALT);
  const semail = email.toLowerCase();
  const hashpass = await bcrypt.hash(password, SALT);
  const newUser = new userModel({
    email: semail,
    password: hashpass,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { email, passowrd } = req.body;
  const SECKEY = process.env.SECKEY;
  userModel
    .findOne({ email })
    .then(async (result) => {
      const payload = {
        role: result.role,
      };
      const options = {
        expires: 3600,
      };
      const token = await jwt.sign(payload, SECKEY, options);
      const crackedhashpwd = await bcrypt.compare(passowrd, result.password);
      if (crackedhashpwd) {
        if (email === result.email) {
          if (password === result.password) {
            res.status(201).json(result);
          } else {
            res.status(404).json("worng password or email u");
          }
        } else {
          res.status(404).json("worng password or email u");
        }
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {register,login}
