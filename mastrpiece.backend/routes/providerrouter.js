const express = require("express");
const router = express.Router();
const providerController = require('../controller/providercontroller')
const authController = require("../controller/authcontroller");

// login
router.post('/providers/login', authController.loginProvider, authController.createToken)
// sign up
router.post("/providers/sign-up", providerController.newProvider, authController.createToken);

router.put("/providers/services", providerController.updateProvider, authController.createToken);

router.get("/providers", providerController.allProviders);

router.get("/providers/:id", providerController.oneProvider);

router.put("/providers", providerController.updateProvider, authController.createToken);

module.exports = router;
