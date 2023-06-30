const express = require("express");
const router = express.Router();
const userController = require('../controller/userscontroller');
const authController = require("../controller/authcontroller");


// router.get("/User", userController.allUsers);
router.post('/users/signup', userController.signup, authController.loginUser, authController.createToken)

router.post("/users", userController.newUser, authController.createToken);

router.put("/users", userController.updateUser, authController.createToken);

module.exports = router;
