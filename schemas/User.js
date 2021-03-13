const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
});

const User = model("User", userSchema);

function addUser(name) {
  const user = new User();
  user.username = name;
  return user.save();
}

function getUsers() {
  return User.find().exec();
}

module.exports = {
  addUser,
  getUsers,
  User,
};
