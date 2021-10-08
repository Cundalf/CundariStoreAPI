const categoryModel = require("../models/category");

module.exports = {
    getAll: async function (req, res) {
        try {

            const categories = await categoryModel.find({ state: true });

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
    getById: async function (req, res) {
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
    create: async function (req, res) {
        try {
            const category = new categoryModel(req.body);

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
    update: async function (req, res) {

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
    delete: async function (req, res) {
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