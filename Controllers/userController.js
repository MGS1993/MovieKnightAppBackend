const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const validateWith = require("../middleware/validation");
//TODO add bcrypt encryption
exports.login = async (req, res, next) => {
  //TODO remove camel case from usermodel ergo login
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (user === null) return res.status(400).json({ msg: "No user found" });

  if (user.passWord !== password || user.email !== email)
    return res.status(400).json({ msg: "Invalid credentials." });

  if (user.passWord === password && user.email === email) {
    const { userName: username } = user;
    const token = jwt.sign(
      { username, email, expiresIn: process.env.JWT_EXPIRES_IN },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ msg: "Successfully logged in", token });
  }
};

exports.register = async (req, res, next) => {
  try {
    //TODO remove camel case from password
    const { email, passWord, userName } = req.body;

    let user = new userModel({
      userName,
      passWord,
      email,
    });

    const existingEmail = await userModel.findOne({ email: email });
    if (existingEmail !== null)
      return res.status(500).json({ msg: "Email is already taken" });

    user.save(
      await function (err) {
        if (err)
          return res
            .status(500)
            .json({ msg: "Error in userController save function", err });

        return res.status(200).json({ msg: "User successfully saved" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
