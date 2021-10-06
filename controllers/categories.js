const categoryModel = require("../models/category");

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const categories = await categoryModel.find();

            res.json({
                ok: true,
                data: categories
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
                    description: { $regex: ".*" + req.query.find + ".*", $options: "i" }
                };
            }

            const categories = await categoryModel.paginate(queryFind, {
                sort: { description: 1, sku: -1 },
                limit: req.query.limit || 2,
                page: req.query.page || 1
            });

            res.json({
                ok: true,
                data: categories
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

            const category = await categoryModel.findById(id);
            res.json({
                ok: true,
                data: category
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
            let { description, state } = req.body;

            if (!description || !state) {
                res.status(400).json({
                    ok: false,
                    error: "No se recibio la informacion necesaria"
                });
            }

            const category = new categoryModel({
                description,
                state
            });

            const document = await category.save();
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

        const id = req.params.id;

        if (!id) {
            res.status(400).json({
                ok: false,
                error: "No se recibio ID"
            });
        }

        try {
            const category = await categoryModel.updateOne({ _id: id }, req.body);
            res.json({
                ok: true,
                data: category
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

            const category = await categoryModel.deleteOne({ _id: id });
            res.json({
                ok: true,
                data: category
            });

        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    }
};