var express = require('express');
var router = express.Router();

const productsController = require("../controllers/products");

router.get('/', productsController.getAll);
router.get('/paginate', productsController.getAllPaginate);
router.get('/:id', productsController.getById);
router.post('/', (req, res, next) => { req.app.validateUser(req, res, next); }, productsController.create);
router.put('/:id', (req, res, next) => { req.app.validateUser(req, res, next); }, productsController.update);
router.delete('/:id', (req, res, next) => { req.app.validateUser(req, res, next); }, productsController.delete);

module.exports = router;
