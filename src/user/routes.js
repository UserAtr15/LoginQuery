const {Router} = require("express");
const router = Router();
const controller = require("./controller");

router.get('/', controller.obtenerUsuarios);

router.post('/', controller.crearUsuario);

router.post('/login', controller.login);

module.exports = router;