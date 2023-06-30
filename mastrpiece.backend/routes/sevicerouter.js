const express = require("express");
const router = express.Router();
const ServiceController = require("../controller/servicecontroller");
const auth = require('../middleware/verIfyJWT')

router.post("/services", auth, ServiceController.newService);

router.get("/services", ServiceController.allServices);

router.get("/services/:id", ServiceController.oneServiceById);

router.put("/services/:id", auth, ServiceController.updateService);

router.delete("/services/:id", auth, ServiceController.deleteService);

module.exports = router;
