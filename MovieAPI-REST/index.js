const express = require('express');
const app = express();
const routesMovies = require('./movies/router');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Localhost',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=> console.log('conectado a la base de datos'))
    .catch( e => console.error('no estoy conectado', e))

app.use(express.json());
app.listen(3000,() => console.log('La API esta levantada en el puerto 3000'));


app.use('/movie', routesMovies)
