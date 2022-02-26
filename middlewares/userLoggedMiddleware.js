// Objetivo: si tengo a alguien en sesion quiero mostrar una parte de la barra de navegacion, sino NO

// MD de aplicación, ya que la barra de navegacion, header, esta presente en todas las paginas
// se ejecuta por cada pagina a donde hago click
// siempre este MD va despues de la "app.use(session)", porque se ejecuta después

// const userService = require("../services/userService");

const { User } = require("../database/models");

async function userLoggedMiddleware(req, res, next) {
    // res.locals: variables que puedo compartir en todas las vistas, indistintamente del controlador.
    // si hago res.locals de un MD, toda mi app va reconocer "isLogged"--> me cree una var "isLogged",
    // que sirve para mostrar o no una parte de la barra de naveg (la paso a vars locales).
    // ver header, donde se realiza un "if"--> si existe res.locals.isLogged
    // si tengo res.locals.isLogged = false (porque asi esta en este MD),
    // quiero mostrar la parte del "else", porque esta seteado en "false"

    res.locals.isLogged = false;

    // utilizo este MD de app para que si tengo alguien en una cookie, quiero buscar a esa persona
    // y quiero loguearla de manera automatica

    if (req.cookies.email) {
        const userFromCookie = await User.findOne({
            where: { email: req.cookies.email },
        });
        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
    }

    // si en el req.session (var global) tengo al userLogged, quiero que res.locals.isLogged sea verdadero
    // me interesa que pase a ser verdadero cuando real, tengo alquien en session y me muestre su avatar y su fullName
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        // le paso a una variable local el userLogged de req.session
        // para que en la barra de navegación pueda mostrar el fullName y el avatar.
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;
