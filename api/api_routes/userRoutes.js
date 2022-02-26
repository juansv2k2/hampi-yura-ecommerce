const express = require("express");
const router = express.Router();
const userControllers = require("../api_controllers/userControllers");

router.get("/users", userControllers.list);
// router.post("/users", userControllers.create);
router.get("/users/:id", userControllers.detail);
// router.delete("/users/:id", userControllers.destroy);

module.exports = router;

