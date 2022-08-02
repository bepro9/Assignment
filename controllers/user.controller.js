const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const dbConnection = require("../database");
const validator = require("validator");
const User = require("../models/user.model");

function generateUID() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 13; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, mobile, password, role, status } =
      req.body;
    // All fields Required
    if (
      //   !id ||
      !first_name ||
      !last_name ||
      !email ||
      !mobile ||
      !password ||
      !role ||
      !status
    ) {
      throw new Error("All fields required");
    }
    // mobile and email validation
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }
    if (!validator.isMobilePhone(mobile, 'en-IN')) {
      throw new Error("Invalid Mobile Number");
    }
    // password validation
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1,
      })
    ) {
      throw new Error("Invalid Password");
    }

    // hashing the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const uid = generateUID();
    const newUser = new User(
      null,
      uid,
      first_name,
      last_name,
      email,
      encryptedPassword,
      mobile,
      role,
      status
    );
    newUser
      .save()
      .then(() => {
        res.status(200).json({ status: "Account successfully created" });
      })
      .catch((Error) => console.log(Error.message));
  } catch (Error) {
    res.status(500).json({
      status: "Failed",
      message: Error.message,
    });
  }
};

const loginUser = (req, res) => {
  const { email, password, role } = req.body;

  User.findByEmail(email, role)
    .then((userExist) => {
      if (userExist[0].length == 0) {
        throw new Error("User does not exist");
      } else {

        const checkPassoword = bcrypt.compareSync(password, userExist[0][0].password);

        if (!checkPassoword) {
          throw new Error("Passoword does not match");
        }

        const accessToken = jwt.sign(
          {
            uid: userExist[0][0].uid,
            email: userExist[0][0].email,
          },
          "MYKEY",
          {
            expiresIn: "30d",
          }
        );
        res.status(200).json({
          status: 200,
          message: "Logged in successfully",
          data: userExist[0],
          token: accessToken,
        });
      }
    })
    .catch((Error) => {
      res.status(404).json({ Error: Error.message });
    });
};

const getUser = async (req, res) => {
  User.findUser(req.user.email)
    .then((result) => {
      res.status(200).json({ data: result[0] });
    })
    .catch((error) => console.log(error));
};

const getAllUsers = async (req, res) => {
  User.fetchAll()
    .then((result) => {
      res.status(200).json({ data: result[0] });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { registerUser, loginUser, getUser, getAllUsers };
