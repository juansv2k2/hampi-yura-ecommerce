const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");

const Users = require("../services/userService");
const { User, Cart } = require("../database/models");

const controller = {
    //Registro de usuario
    register: (req, res) => {
        return res.render("userRegisterForm");
    },
    processRegister: async (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("userRegisterForm", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        let userInDB = await User.findAll({
            where: { email: req.body.email },
        });

        if (userInDB.length > 0) {
            return res.render("userRegisterForm", {
                errors: {
                    email: {
                        msg: "Este email ya está registrado",
                    },
                },
                oldData: req.body,
            });
        }

        //--> si no tengo errors, creo un usuario (sigo el proceso)
        //--> por un lado, traigo todo lo que trajo el request del body
        //--> incluyendo la propiedad "avatar" con el nombre del archivo, que me trae el request
        //--> y la propiedad password hasheada usando libreria bycript, usando lo que viene en body.

        const usuario = {
            ...req.body,
            fullName: req.body.fullName,
            birthdate: req.body.birthdate,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename,
        };

        const createdUser = await User.create(usuario);

        return res.redirect("/user/login");
        
    },

    //Login de usuarios
    login: (req, res) => {
        return res.render("userLoginForm");
    },
    loginProcess: async (req, res) => {
        let userToLogin = await User.findOne({
            where: { email: req.body.email },
        });
        console.log(userToLogin);
        //Si hay coincidencia con el email:
        if (userToLogin) {
            
            let isOkThePassword = bcryptjs.compareSync(
                req.body.password,
                userToLogin.password
            );

            //Verificamos que también esté ok la password:
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                // si en el request vino "remember_user", seteo una cookie en el response.
                // se va llamar "email", y lo que guarda es la propiedad email con la duración x.
                if (req.body.remember_user) {
                    res.cookie("email", req.body.email, {
                        maxAge: 1000 * 60 * 5,
                    });
                }
                //Si todo está ok, redirecciona al perfil del usuario:
                return res.redirect("/user/userProfile");
            }
            // Si la clave está mal, envía error de credenciales inválidas
            return res.render("userLoginForm", {
                errors: {
                    password: {
                        msg: "Las credenciales son inválidas",
                    },
                },
            });
        }
        //Si el mail está mal, envía este error:
        return res.render("userLoginForm", {
            errors: {
                email: {
                    msg: "No se encuentra este email en nuestra base de datos",
                },
            },
        });
    },

    profile: (req, res) => {
        return res.render("userProfile", {
            user: req.session.userLogged,
        });
    },

    edit: async (req, res) => {
        const user = await User.findByPk(req.params.id);
        res.render("editUserProfile", { user });
    },
    // Update - Method to update
    update: async (req, res) => {
        await User.update(
            {
                fullName: req.body.fullName,
                birthdate: req.body.birthdate,
                email: req.body.email,
                avatar: req.file ? req.file.filename : req.file,
            },
            {
                where: {
                    id: req.session.userLogged.id,
                },
            }
        );

        

        res.redirect("/user/userProfile");
    },


  

    /* CARRITO
    cart: async (req, res) => {
        let prod = await db.Cart.findAll({
            where: { user_id: req.session.userLogged.id },
            include: [{ association: "product", include: "type" }],
            group: "product_id",
        });
        let totalPrice = 0;
        prod.map((producto) => {
            totalPrice = totalPrice + Number(producto.sub_total);
        });
        res.render("users/cart", { productos: prod, totalPrice: totalPrice });
    },
    addCart: async (req, res) => {
        if (res.locals.isLogged == true) {
            console.log("por crear");
            let exsist = await db.Cart.findOne({
                where: {
                    user_id: Number(req.session.userLogged.id),
                    product_id: Number(req.params.id),
                },
                include: [{ association: "product", include: "type" }],
            });
            let producto = await db.Product.findOne({
                where: {
                    id: Number(req.params.id),
                },
            });
            console.log(exsist);
            if (exsist) {
                await db.Cart.update(
                    {
                        quantity: exsist.quantity + 1,
                        sub_total:
                            Number(exsist.sub_total) + Number(producto.price),
                    },
                    {
                        where: {
                            user_id: Number(req.session.userLogged.id),
                            product_id: Number(req.params.id),
                        },
                    }
                );
                res.redirect("/");
            } else {
                await db.Cart.create({
                    user_id: Number(req.session.userLogged.id),
                    product_id: Number(req.params.id),
                    quantity: 1,
                    sub_total: producto.price,
                });
                res.redirect("/");
            }
        } else {
            res.redirect("/user/login");
        }
    },
    */

    // si cierro session/me deslogueo, la cookie debe destruirse, ya que si cierro el navegador me sigue logueando
    logout: (req, res) => {
        res.clearCookie("email");
        req.session.destroy();
        console.log("deslogueado");
        return res.redirect("/");
    },
};

module.exports = controller;
