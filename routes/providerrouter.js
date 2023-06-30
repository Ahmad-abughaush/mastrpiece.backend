const express = require("express");
const router = express.Router();
const providerController = require('../controller/providercontroller')
const authController = require("../controller/authcontroller");


router.get("/Provider", providerController.allProviders);
router.post("/Provider", providerController.newProvider, authController.createToken);
router.get("/Provider/:id", providerController.oneProvider);
router.put("/Provider/:id", providerController.updateProvider);
router.delete("/Provider/:id", providerController.deleteProvider);

module.exports = router;