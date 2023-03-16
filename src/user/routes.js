const {Router} = require("express");
const router = Router();
const controller = require("./controller");
const verificarToken = require("../middleware/authToken");
//const verificarRol = require("../middleware/authRole")

router.get('/', verificarToken,controller.obtenerUsuarios);

router.post('/', controller.crearUsuario);

router.post('/login', controller.login);

module.exports = router;