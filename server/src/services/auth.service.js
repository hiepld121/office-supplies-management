const bcrypt = require("bcryptjs");
const AuthModel = require("../models/auth.model");

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

module.exports = {
    registerUser,
};