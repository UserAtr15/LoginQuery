/*const pool = require("../../db");
const verificarToken = require("./authToken");
const queries = require("../user/query");
const jtw = require("jsonwebtoken");



const verificarRol = (roles) => (req, res , next) => {
    try {
        const token = req.headers['x-access-token'];
        

        //const tokenData = verificarToken(token)
        //console.log(tokenData)
        

      

        //const userData = tokenData._id

        //console.log("user"+userData)
        


        if([].concat(roles).includes()) {
            next()
        } else {
            res.status(409).json({
                message: 'No tienes permiso '
            })
        }


    }catch(e) {
        console.log(e)
    }
}

module.exports = verificarRol;*/