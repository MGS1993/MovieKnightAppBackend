const userModel = require("../models/userModel");

exports.registerToken = async (req, res) => {
  try {
    const { username, email, token } = req.body;
    const user = await userModel.findOne({ email: email });

    user.expoPushToken = token.data;
    await user.save();
    return res
      .status(200)
      .json({ msg: `userRegistered, ${user.expoPushToken}` });
  } catch (error) {
    console.log("error registering token", error);
  }
};
