// Global imports

const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const port = process.env.PORT || 3000;

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

// Initiate express

const app = express();

app.use(methodOverride("_method"));

app.use(
    session({
        secret: "Shhh, It's a secret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(cors());

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static("./public"));

app.use(express.json());

// Template Engine
app.set("view engine", "ejs");

// Routers
const mainRoutes = require("./routes/mainRoutes");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const apiRouter = require("./api/api_routes");
const cartRouter = require("./routes/cartRoutes");

app.use("/", mainRoutes);
app.use("/products", productsRoutes);
app.use("/user", userRoutes);
app.use("/carrito", cartRouter);

// Api routing

app.use("/api", apiRouter);

app.use((req, res, next) => {
    res.status(404).render("not-found");
});

// Server listening

app.listen(port, () => console.log("Servidor levantado en el puerto 3000"));
