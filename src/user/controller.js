const pool = require("../../db");
const queries = require("../user/query");
const jtw = require("jsonwebtoken");


const obtenerUsuarios =  (req, res, next) => {
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

        const token = jtw.sign({id: email},process.env.SECRET, {
            expiresIn: 60*5
        })
        console.log(token.id)

        res.json({auth: true, token});

    });
};

const login = (req, res, next) => {
    const {email, password} = req.body;
    pool.query(queries.obtenerPorEmail, [email, password], (error, results) => {
        if(results.rows.length){
            
            const token = jtw.sign({id: email},process.env.SECRET, {
                expiresIn: 60*60
            })
    
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