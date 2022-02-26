const express = require("express");
const router = express.Router();
const path = require("path");

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

// Tu carrito
router.get("/", authMiddleware, cartController.list);

// Si no tenes carrito crearlo, y agregar productos
router.get("/:id", authMiddleware, cartController.add);

// Borrar producto del carrito
//router.delete("/borrar/:id", authMiddleware, cartController.delete);

// Procesar cobro
// router.put("/comprar", authMiddleware, cartController.shop);

module.exports = router;
