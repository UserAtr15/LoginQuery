const pool = require("../../db");
const queries = require("../user/query");
const jtw = require("jsonwebtoken");

const obtenerUsuarios = (req,res) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).json({
            auth:false,
            message: 'No token provide'
        });
    }
    const decoded = jtw.verify(token, process.env.SECRET);
    console.log(decoded);
    pool.query(queries.obtenerUsuarios, (error,result) => {
        if(error) throw error;
        res.status(200).json(result.rows);
    });
};

const crearUsuario = (req, res) => {
    const {name, password, email, id} = req.body;
    pool.query(queries.checkEmailExist, [email], (error, results) => {
        if(results.rows.length){
            res.status(400).json("Email Existente");
        }else{
            pool.query(queries.crearUsuario, [name, password, email, id], (error, results) => {
                if(error) throw error;
                 res.status(201).json("Usuario creado");
               });
        }

        const token = jtw.sign({id: req.body.id},process.env.SECRET, {
            expiresIn: 60*5
        })
        console.log(token)

        res.json({auth: true, token});

    });
};

const login = (req, res) => {
    const {email, password} = req.body;
    pool.query(queries.obtenerPorEmail, [email, password], (error, results) => {
        if(results.rows.length){
            const token = jtw.sign({id: req.body.id},process.env.SECRET, {
                expiresIn: 60*5
            })
            console.log(token)
    
            res.json({auth: true, token});
        }else{
                 res.status(401).json({
                    auth: false,
                    token:null,
                    message: 'No encontro usuario'
                 });
        }
    })

}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    login,
}