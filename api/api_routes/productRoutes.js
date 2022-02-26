const express = require("express");
const router = express.Router();
const productControllers = require("../api_controllers/productControllers");

router.get("/products", productControllers.list);
// router.post("/products", productControllers.create);
router.get("/products/:id", productControllers.detail);
// router.delete("/products/:id", productControllers.destroy);

module.exports = router;
