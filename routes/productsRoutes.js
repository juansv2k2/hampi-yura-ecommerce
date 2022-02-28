//Require
const express = require("express");
const router = express.Router();

//Middlewares
const uploader = require("../middlewares/productMulterMiddleware");

const validations = require("../validations/validateProduct");

//Controllers
const productsControllers = require("../controllers/productsControllers");

/*** GET ALL PRODUCTS ***/
router.get("/", productsControllers.products);

/*** CREATE ONE PRODUCT ***/
router.get("/create", productsControllers.productCreate);
router.post(
    "/",

    uploader.single("image"),
    validations,
    productsControllers.store
);

/*** BUY PRODUCT ***/
// router.get("/cart", productsControllers.cart);

/*** GET ONE PRODUCT ***/
router.get("/:id", productsControllers.productDetail);

/*** EDIT ONE PRODUCT***/
router.get("/:id/edit", productsControllers.edit);
router.put(
    "/:id",

    uploader.single("image"),
    validations,
    productsControllers.update
);

/*** DELETE ONE PRODUCT***/
router.delete("/:id", productsControllers.destroy);

module.exports = router;
