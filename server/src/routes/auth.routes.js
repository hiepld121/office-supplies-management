const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/auth.controller");

const { validateRegister } = require("../middleware/validation.middleware");

router.post("/register", validateRegister, AuthController.registerUser);

router.post("/login", AuthController.loginUser);


module.exports = router;

