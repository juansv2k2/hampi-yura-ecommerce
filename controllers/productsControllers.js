const fs = require("fs");
const path = require("path");

const productService = require("../services/productService");

const controller = {
    // Root - Show all products
    products: (req, res) => {
        const filteredProducts = productService.findAll();
        res.render("products", { products: filteredProducts });
    },

    // Detail - Detail from one product
    productDetail: (req, res) => {
        const product = productService.findOneById(req.params.id);
        if (product) {
            res.render("productDetail", { product });
        } else {
            //error
            res.send("Qué rompimo'?");
        }
    },

    // Create - Form to create
    productCreate: (req, res) => {
        res.render("productCreate");
    },

    // Create -  Method to store
    store: (req, res) => {
        productService.createOne(req.body, req.file);
        res.redirect("/products");
    },

    // Update - Form to edit
    edit: (req, res) => {
        const product = productService.findOneById(req.params.id);
        res.render("productEdit", { product });
    },
    // Update - Method to update
    update: (req, res) => {
        productService.editOne(req.params.id, req.body, req.file);
        res.redirect("/products");
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        productService.destroyOne(req.params.id);

        res.redirect("/products");
    },

    productCart: (req, res) => {
        res.render("products/productCart");
    },
};

module.exports = controller;
