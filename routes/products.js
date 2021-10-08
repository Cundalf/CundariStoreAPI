var express = require('express');
var router = express.Router();

const productsController = require("../controllers/products");
const { validateUser, validateEmployeeRole } = require("../middlewares/authentication");

router.get('/', productsController.getAll);
router.get('/popular', productsController.getPopular); // Productos destacados para la home
router.get('/paginate', productsController.getAllPaginate);
router.get('/:id', productsController.getById);
router.post('/', validateUser, productsController.create);
router.put('/:id', validateUser, productsController.update);
router.delete('/:id', [validateUser, validateEmployeeRole], productsController.delete);

module.exports = router;
