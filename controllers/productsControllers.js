const { validationResult, body } = require("express-validator");
const { Product, Cart } = require("../database/models");
/*const productService = require("../services/productService");*/

const controller = {
    // Reed - Show all products
    products: async (req, res) => {
        const filteredProducts = await Product.findAll();
        res.render("products", { products: filteredProducts });
    },

    // Detail - Detail from one product
    productDetail: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.render("productDetail", { product });
        } else {
            //error
            res.redirect("/products");
        }
    },

    // Create - Form to create
    productCreate: (req, res) => {
        res.render("productCreate");
    },

    // Create -  Method to store
    store: async (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render("productCreate", {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename,
            stock: req.body.stock,
            category: req.body.category,
            destacado: req.body.destacado,
        });
        res.redirect("/products");
    },

    // Update - Form to edit
    edit: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        res.render("productEdit", { product });
    },
    // Update - Method to update
    update: async (req, res) => {
        await Product.update(
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.file ? req.file.filename : req.file,
                stock: req.body.stock,
                category: req.body.category,
                destacado: req.body.destacado,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.redirect("/products");
    },

    // Delete - Delete one product from DB
    destroy: async (req, res) => {
        await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/products");
    },

    cart: (req, res) => {
        res.render("Cart");
    },
};

module.exports = controller;
