// 1. Guardar al usuario
// 2. Buscar al user que se quiera loguear por su email
// 3. Buscar aun user por su id
// 4. Editar info user
// 5. Eliminar user de db

// CRUD

//--> Creo un obj lit con los métodos

const fs = require("fs");
const bcryptjs = require("bcryptjs");
const { User, Cart } = require("../database/models");

const userService = {
  //--> hacemos referencia al nombre del archivo que queremos utilizar.
  fileName: "./database/users.json",

  //--> traemos los users, leemos el archivo .json en formato de array (method parse)
  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  //-->  toma a todos los usuarios, y como me interesa obtener el ultimo "id" utilizo "pop()"
  generateId: function () {
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },

  //--> method para obtener todos los users (parecido a getData, mismo resultado)
  findAll: function () {
    return this.getData();
  },

  //--> buscamo un user por su ID, fc que recibe un id.
  //--> 1ro obtengo todos los usuarios, y dsp encuentro el relacionado con el id que me pasan
  //--> method find donde itera el array y me retorna el user que matcheo con el id que me pasaron
  findByPk: function (id) {
    let allUsers = this.findAll();
    let userFound = allUsers.find((oneUser) => oneUser.id === id);
    return userFound;
  },

  //--> me permite buscar por un determinado nombre de campo, el primero que encuentra, matchea.
  //--> luego en controllers, busca por el campo "email", req.body.email.
  findByField: async function (field, text) {

    const user = await User.findOne({
      where:{
        [field]: text,
      }
    })
    return user;
  },

  //--> creamos un user, y guardamos esa info en nuestro .json con push
  //--> sobreescribimos el json tansformandolo en string
  create: function (payload, avatar) {
    let allUsers = this.findAll();
    let newUser = {
      ...payload,
      id: this.generateId(),
      admin: 0,
      password: bcryptjs.hashSync(payload.password, 10),
      avatar: avatar.filename,
    };
    allUsers.push(newUser);
    fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
    return newUser;
  },

  //--> traigo todos los usuarios, recorro los users con filter
  //--> y me devuelve los users cuyo id es distinto al que se paso por parametro
  delete: function (id) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter((oneUser) => oneUser.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
    return true;
  },
};

module.exports = userService;
