const express = require('express');
const usersRoutes = require("../src/user/routes");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("hola");
});

app.use(express.json());

app.use('/users', usersRoutes);

app.listen(port, () => console.log('Server on port: '+ port));
