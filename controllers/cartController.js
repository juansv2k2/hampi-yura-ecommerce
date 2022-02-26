const { User, Cart, Carts_products, Product } = require("../database/models");

const fs = require("fs");
const path = require("path");

const controller = {
    list: async (req, res) => {
        const user = await User.findByPk(req.session.userLogged.id);
        const e = await Cart.findOne({
            where: { id_user: user.id },
        });
        console.log(e);

        if (e) {
            const cart = await Cart.findByPk(e.id, {
                include: ["products"],
            });
            const suma = [0];
            res.render("Cart", { cart, e, user: req.session.userLogged });
        } else {
            const cart = undefined;
            res.render("Cart", { cart, e, user: req.session.userLogged });
            // res.send("tu carrito esta vacio");
        }
    },
    add: async (req, res) => {
        const cartsUser = await Cart.findAll({
            where: { id_user: req.session.userLogged.id },
        });
        const biggestId = await Carts_products.max("id");
        const biggestIdCart = await Cart.max("id");
        console.log(cartsUser);

        if (!cartsUser[0]) {
            await Cart.create({
                id: biggestIdCart + 2,
                status: "in-p",
                id_user: req.session.userLogged.id,
            });

            const selectedProduct = await Product.findByPk(req.params.id);
            console.log("el producto seleccionado es " + selectedProduct)
            const cartsUser = await Cart.findAll({
                where: {
                    id_user: req.session.userLogged.id, status: "in-p"
                },
            });

            await Carts_products.create({
                id: biggestId + 1,
                priceUnit: selectedProduct.price,
                quantity: 1,
                id_product: selectedProduct.id,
                id_cart: cartsUser[0].id,
            });
        }
        if (cartsUser[0]) {
            const selectedProduct = await Product.findByPk(req.params.id);
            const cartsUser = await Cart.findAll({
                where: { id_user: req.session.userLogged.id, status: "in-p"},
            });

            await Carts_products.create({
                id: biggestId + 1,
                priceUnit: selectedProduct.price,
                quantity: 1,
                id_product: selectedProduct.id,
                id_cart: cartsUser[0].id,
            });
        } else {
            res.redirect("/products");
        }
        res.redirect("/carrito");
    },
};

module.exports = controller;
