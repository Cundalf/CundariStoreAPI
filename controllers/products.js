const productModel = require("../models/product");

module.exports = {
    getPopular: async function (req, res, next) {
        try {

            const products = await productModel.paginate({ popular: true, state: true }, {
                sort: { name: 1, sku: -1 },
                populate: "category",
                limit: req.body.limit || 4,
                page: req.body.page || 1
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
    getAll: async function (req, res, next) {
        try {

            const products = await productModel.find({ state: true }).populate("category");

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
            if (req.body.find) {
                queryFind = {
                    $or: [
                        { name: { $regex: ".*" + req.body.find + ".*", $options: "i" } },
                        { description: { $regex: ".*" + req.body.find + ".*", $options: "i" } }
                    ],
                    state: true
                };
            }

            const products = await productModel.paginate(queryFind, {
                sort: { name: 1, sku: -1 },
                populate: "category",
                limit: req.body.limit || 2,
                page: req.body.page || 1
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

            if (!id) {
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
            const product = new productModel(req.body);
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