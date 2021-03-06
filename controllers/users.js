const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {
    login: async function (req, res, next) {
        try {

            if (!req.body.email || !req.body.password) {
                return res.status(400).json({
                    ok: false,
                    error: "No se recibio la informacion necesaria"
                });
            }

            const user = await userModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(403).json({
                    ok: false,
                    error: "Datos incorrectos"
                });
            }

            if (bcrypt.compareSync(req.body.password, user.password)) {

                const token = jwt.sign({ userId: user._id, role: user.role }, req.app.get("secretKey"), { expiresIn: "1h" });
                return res.json({
                    ok: true,
                    token: token
                });

            } else {
                return res.status(403).json({
                    ok: false,
                    error: "Datos incorrectos"
                });
            }

        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }

    },
    getAll: async function (req, res, next) {
        try {

            const users = await userModel.find({ state: true });
            res.json({
                ok: true,
                data: users
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

            const user = await userModel.findById(id);
            res.json({
                ok: true,
                data: user
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
            const user = new userModel(req.body);

            const document = await user.save();
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
            const user = await userModel.updateOne({ _id: id }, req.body);
            res.json({
                ok: true,
                data: user
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

            const user = await userModel.deleteOne({ _id: id });
            res.json({
                ok: true,
                data: user
            });

        } catch (e) {
            res.status(500).json({
                ok: false,
                error: e.message
            });
        }
    }
};