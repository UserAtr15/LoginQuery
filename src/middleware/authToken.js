const jtw = require("jsonwebtoken");


const verificarToken = (req, res , next) => {
    const token = req.headers['x-access-token'];
    console.log(token._id)
    
    if(!token) {
        return res.status(401).json({
            auth:false,
            message: 'No hay token'
        });
    }

    try{
        const decoded = jtw.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        //console.log(token.id)
        next()
    } catch (error) {
        res.status(400).json({
            auth: false,
            error: 'El token no es valido'
        })
    }
}


module.exports = verificarToken;