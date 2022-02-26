const path = require("path");
const { body } = require("express-validator");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Nos gustaría saber cómo se llama tu producto")
    .isLength({ min: 5 })
    .withMessage("Para que sea interesante, el nombre de tu producto debería tener como mínimo 5 letras ;)"),

  

  body("description")
    .isLength({min:20})
    .withMessage("Para que tu descipción sea atractiva deberías escribir como mínimo 20 caracteres!"),

  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".jpeg", ".gif"];

    if (!file) {
      throw new Error("Mostranos cómo es tu producto");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          "Lo siento, solo aceptamos archivos con extensión .jpg,. jpeg, .png .gif"
        );
      }
    }

    return true;
  }),
];
