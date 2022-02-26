const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
router.get("/fitoterapia", mainController.fitoterapia);
router.get("/infoplantas", mainController.infoplantas);
router.get("/filosofia", mainController.filosofia);
router.get("/contacto", mainController.contacto);
module.exports = router;
