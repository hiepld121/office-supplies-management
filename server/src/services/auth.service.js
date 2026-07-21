const bcrypt = require("bcryptjs");
const AuthModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const existingUser = await AuthModel.getUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUserData = {
    ...userData,
    password: hashedPassword,
  };

  const result = await AuthModel.createUser(newUserData);

  return result;
};

const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await AuthModel.getUserByEmail(email);

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
