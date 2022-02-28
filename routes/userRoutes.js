const express = require("express");
const router = express.Router();

// Controller
const usersController = require("../controllers/userController");

// Middlewares
const uploadFile = require("../middlewares/userMulterMiddleware");
const validations = require("../validations/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Formulario de registro
router.get("/register", guestMiddleware, usersController.register);

// Procesar el registro
router.post(
    "/register",
    uploadFile.single("avatar"),
    validations,
    usersController.processRegister
);

// Formulario de login
router.get("/login", guestMiddleware, usersController.login);

// Procesar el login
router.post("/login", usersController.loginProcess);

// Logout
router.get("/logout", usersController.logout);

// Perfil de Usuario
router.get("/:id", authMiddleware, usersController.profile);

// Edit - Perfil de Usuario

// Logout
router.get("/logout", usersController.logout);

/*Carrito
router.get("/cart", usersController.cart);
router.get("/:id/cart", authMiddleware, usersController.addCart);*/

module.exports = router;
