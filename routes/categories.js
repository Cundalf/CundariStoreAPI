var express = require('express');
var router = express.Router();

const categoriesController = require("../controllers/categories");

router.get('/', categoriesController.getAll);
router.get('/paginate', categoriesController.getAllPaginate);
router.get('/:id', categoriesController.getById);
router.post('/', (req, res, next) => { req.app.validateUser(req, res, next); }, categoriesController.create);
router.put('/:id', (req, res, next) => { req.app.validateUser(req, res, next); }, categoriesController.update);
router.delete('/:id', (req, res, next) => { req.app.validateUser(req, res, next); }, categoriesController.delete);

module.exports = router;
