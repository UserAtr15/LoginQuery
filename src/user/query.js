const obtenerUsuarios = "SELECT * FROM users";
const checkEmailExist = "SELECT u FROM users u WHERE u.email = $1";
const crearUsuario = "INSERT INTO users (name, password, email, id) VALUES ($1, $2, $3, $4)";
const obtenerPorEmail = "SELECT u FROM users u WHERE u.email = $1 AND u.password = $2";
const obtenerRol = "SELECT u FROM users u WHERE u.rol = $1 AND u.email = $2";
module.exports = {
    obtenerUsuarios,
    checkEmailExist,
    crearUsuario,
    obtenerPorEmail,
    obtenerRol,

};