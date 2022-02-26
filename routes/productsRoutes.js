//Require
const express = require("express");
const router = express.Router();

//Middlewares
const uploader = require("../middlewares/productMulterMiddleware");
const assertAdmin = require("../middlewares/assertAdmin");
const validations = require("../validations/validateProduct");

//Controllers
const productsControllers = require("../controllers/productsControllers");

/*** GET ALL PRODUCTS ***/
router.get("/", productsControllers.products);

/*** CREATE ONE PRODUCT ***/
router.get("/create", assertAdmin, productsControllers.productCreate);
router.post(
  "/",
  assertAdmin,
  uploader.single("image"),
  validations,
  productsControllers.store
);

/*** BUY PRODUCT ***/
router.get("/cart", productsControllers.cart);

/*** GET ONE PRODUCT ***/
router.get("/:id", productsControllers.productDetail);

/*** EDIT ONE PRODUCT***/
router.get(
  "/:id/edit",
  assertAdmin,
  productsControllers.edit
);
router.put(
  "/:id",
  assertAdmin,
  uploader.single("image"),
  validations,
  productsControllers.update
);

/*** DELETE ONE PRODUCT***/
router.delete("/:id", assertAdmin, productsControllers.destroy);

module.exports = router;
