var express = require('express');
var router = express.Router();

const usersController = require("../controllers/users");

router.get('/', usersController.getAll);
router.post('/login', usersController.login);
router.get('/:id', usersController.getById);
router.post('/', (req, res, next) => { req.app.validateUser(req, res, next); }, usersController.create);
router.put('/:id', (req, res, next) => { req.app.validateUser(req, res, next); }, usersController.update);
router.delete('/:id', (req, res, next) => { req.app.validateUser(req, res, next); }, usersController.delete);

module.exports = router;
