var express = require('express');
var router = express.Router();

const categoriesController = require("../controllers/categories");
const { validateUser, validateEmployeeRole } = require("../middlewares/authentication");

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/', validateUser, categoriesController.create);
router.put('/:id', validateUser, categoriesController.update);
router.delete('/:id', [validateUser, validateEmployeeRole], categoriesController.delete);

module.exports = router;
