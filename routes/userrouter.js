const express = require("express");
const router = express.Router();
const userController = require('../controller/userscontroller');
const authController = require("../controller/authcontroller");


// router.get("/User", userController.allUsers);
router.post('/user/signup',userController.signup, authController.loginUser,authController.createToken)
router.post("/User", userController.newUser, authController.createToken);
router.get("/User/:id", userController.oneUser);
router.put("/User/:id", userController.updateUser);
router.delete("/User/:id", userController.deleteUser);

module.exports = router;
