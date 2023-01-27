const User = require("../model/User");

exports.getAllUserList = async (req, res) => {
  try {
    const userList = await User.find().sort({ date: -1 });

    res.status(200).json(userList);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
