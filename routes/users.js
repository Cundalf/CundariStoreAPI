var express = require('express');
var router = express.Router();

const usersController = require("../controllers/users");
const { validateUser, validateAdminRole } = require("../middlewares/authentication");

router.get('/', usersController.getAll);
router.post('/login', usersController.login);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', validateUser, usersController.update);
router.delete('/:id', [validateUser, validateAdminRole], usersController.delete);

module.exports = router;
