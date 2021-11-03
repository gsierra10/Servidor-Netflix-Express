const express = require('express');
const app = express();
const routesMovies = require('./movies/router');
const routesMembers = require ('./members/router');
const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');

//const token = jwt.sign({ usuario: 'gustavo'}, '1234');
//console.log(token);

//try {
//    const decoded = jwt.verify(token, '1234');
//    console.log(decoded);    
//} catch (error) {
//    res.json({ msg: 'token invalido'})
//}

mongoose.connect('mongodb://localhost:27017/Localhost',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=> console.log('conectado a la base de datos'))
    .catch( e => console.error('no estoy conectado', e))

app.use(express.json());
app.listen(3000,() => console.log('La API esta levantada en el puerto 3000'));


app.use('/movie', routesMovies);
app.use('/members', routesMembers);

