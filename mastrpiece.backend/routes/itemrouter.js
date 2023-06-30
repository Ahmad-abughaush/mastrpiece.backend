const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemcontroller");
const auth = require('../middleware/verIfyJWT')
router.post("/items", auth, itemController.newItem);

router.get("/items", itemController.allItems);

router.get("/items/:id", itemController.oneItemById);

router.put("/items/:id", auth, itemController.updateItem);

router.delete("/items/:id", auth, itemController.deleteItem);

module.exports = router;
