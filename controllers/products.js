const productModel = require("../models/product");
const categoryModel = require("../models/category");

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const products = await productModel.find().populate("category");
            
            res.json({
                ok: true,
                data: products
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    },
    getAllPaginate: async function (req, res, next) {
        try {
            let queryFind = {};
            if (req.query.find) {
                queryFind = {
                    name: { $regex: ".*" + req.query.find + ".*", $options: "i" }
                };
            }
            
            const products = await productosModel.paginate(queryFind, {
                sort: { name: 1, sku: -1 },
                populate: "category",
                limit: req.query.limit || 2,
                page: req.query.page || 1
            });
            
            res.json({
                ok: true,
                data: products
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }

    },
    getById: async function (req, res, next) {
        try {
            const id = req.params.id;
            
            if(!id) {
                res.status(400).json({
                    ok: false,
                    error: "No se recibio ID"
                });
            }
            
            const product = await productModel.findById(id).populate("category");
            res.json({
                ok: true,
                data: product
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    },
    create: async function (req, res, next) {
        try {
            console.log(req.body);

            let { name, sku, description, price, quantity, image, state } = req.body;
            
            if (!name || !sku || !description || !price || !quantity || !image || !state) {
                res.status(400).json({
                    ok: false,
                    error: "No se recibio la informacion necesaria"
                });
            }
            
            const product = new productModel({
                name,
                sku,
                description,
                price,
                quantity,
                image,
                state
            });

            const document = await product.save();
            res.json({
                ok: true,
                data: document
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    },
    update: async function (req, res, next) {

        console.log(req.params.id, req.body);
        
        const id = req.params.id;
        
        if (!id) {
            res.status(400).json({
                ok: false,
                error: "No se recibio ID"
            });
        }

        try {
            const product = await productModel.updateOne({ _id: id }, req.body);
            res.json({
                ok: true,
                data: product
            });
        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    },
    delete: async function (req, res, next) {
        //Insertar en base
        try {
            
            const id = req.params.id;

            if (!id) {
                res.status(400).json({
                    ok: false,
                    error: "No se recibio ID"
                });
            }
            
            const product = await productModel.deleteOne({ _id: id });
            res.json({
                ok: true,
                data: product
            });

        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    }
};