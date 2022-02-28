const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../services/userService");

const controller = {
    register: (req, res) => {
        return res.render("userRegisterForm");
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("userRegisterForm", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        let userInDB = User.findByField("email", req.body.email);

        if (userInDB) {
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

        User.create(req.body, req.file);
        return res.redirect("/user/login");
    },

    login: (req, res) => {
        return res.render("userLoginForm");
    },
    loginProcess: (req, res) => {
        let userToLogin = User.findByField("email", req.body.email);
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
                // se va llamar "userEmail", y lo que guarda es la propiedad email con la duración x.
                if (req.body.remember_user) {
                    res.cookie("userEmail", req.body.email, {
                        maxAge: 1000 * 60 * 60,
                    });
                }
                //Si todo está ok, redirecciona al perfil del usuario:
                return res.redirect("/user/userProfile");
            }
            // Si la clave está mal, envía error de credenciales inválidas
            return res.render("userLoginForm", {
                errors: {
                    email: {
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

    // si cierro session/me deslogueo, la cookie debe destruirse, ya que si cierro el navegador me sigue logueando
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/");
    },
};

module.exports = controller;
