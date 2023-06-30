const express = require("express");
const router = express.Router();
const ServiceController = require("../controller/servicecontroller");


router.get("/all_Services", ServiceController.allServices);
router.get("/all_Services_Not_active", ServiceController.allServicesNotActive);
router.get("/one_Service_by_Id/:id", ServiceController.oneServiceById);
router.post("/all_Services_by_email", ServiceController.AllServiceByEmail);
router.post("/new_Service", ServiceController.newService);
router.put("/Service/:id", ServiceController.updateService);
router.delete("/Service/:id", ServiceController.deleteService);

module.exports = router;
