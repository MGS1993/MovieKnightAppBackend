const userModel = require("../models/userModel");
// const validateWith = require("../middleware/validation");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
};

exports.register = async (req, res, next) => {
  try {
    const { email, passWord, userName } = req.body;
    let user = new userModel({
      userName,
      passWord,
      email,
    });
    console.log(user);
    const existingEmail = await userModel.findOne({ email: email });
    console.log("test", existingEmail);
    if (existingEmail !== null)
      return res.status(500).json({ msg: "Email is already taken" });

    user.save(
      await function (err) {
        if (err)
          return res
            .status(500)
            .json({ msg: "Error in userController save function", err });

        res.status(200).json({ msg: "User successfully saved" });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
