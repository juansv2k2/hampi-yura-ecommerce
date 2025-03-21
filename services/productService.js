const path = require("path");
const fs = require("fs");

// a ver 

const productsFilePath = path.join(
    __dirname,
    "../database/productsDataBase.json"
);
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productService = {
    findAll() {
        const filteredProducts = products.filter((product) => {
            return !product.deleted;
        });
        return filteredProducts;
    },

    //   filtro los que estan borrados, y luego by category que solicito
    filterByCategory(category) {
        return this.findAll().filter((product) => {
            return product.category == category;
        });
    },

    findOneById(id) {
        const product = products.find((product) => {
            return product.id == id;
        });
        return product;
    },

    createOne(payload, image) {
        const lastProduct = products[products.length - 1];
        const biggestProductId = products.length > 0 ? lastProduct.id : 1;
        const product = {
            ...payload,
            id: biggestProductId + 1,
            price: Number(payload.price),
            image: image ? image.filename : "default-image.png",
            deleted: false,
        };
        products.push(product);
        this.save();
    },

    editOne(id, payload, image) {
        const product = this.findOneById(id);
        product.name = payload.name;
        product.price = Number(payload.price);
        product.discount = Number(payload.discount);
        product.category = payload.category;
        product.description = payload.description;
        product.image = image ? image.filename : product.image;
        this.save();
    },
    destroyOne(id) {
        const product = this.findOneById(id);
        product.deleted = true;
        this.save();
    },

    save() {
        const jsonString = JSON.stringify(products, null, 4);
        fs.writeFileSync(productsFilePath, jsonString);
    },
};

module.exports = productService;
