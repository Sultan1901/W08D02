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
  const { email, password } = req.body;
  const SECKEY = process.env.SECKEY;
  userModel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (email === result.email) {
          const payload = {
            role: result.role,
          };

          const options = {
            expiresIn: 3600,
          };

          const crackedhashpwd = await bcrypt.compare(
            password,
            result.password
          );

          if (crackedhashpwd) {
            res.status(200).json(result);
          } else {
            res.status(400).json("wrong email || password");
          }
        } else {
          res.status(400).json("wrong email || password");
        }
      } else {
        res.status(400).json("email does not ===> match our records");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { register, login };
