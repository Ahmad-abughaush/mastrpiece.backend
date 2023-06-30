const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemcontroller");


router.get("/all_Items", itemController.allItems);
router.get("/all_Items_Not_active", itemController.allItemsNotActive);
router.get("/one_Item_by_Id/:id", itemController.oneItemById);
router.post("/all_Items_by_email", itemController.AllItemByEmail);
router.post("/new_Item", itemController.newItem);
router.put("/Item/:id", itemController.updateItem);
router.delete("/Item/:id", itemController.deleteItem);

module.exports = router;