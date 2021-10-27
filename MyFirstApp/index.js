const express = require('express');
const app = express();
const routesMovies = require('./routes/controller');

app.use(express.json());
app.listen(3000,() => console.log('La API esta levantada en el puerto 3000'));


app.use('/movie', routesMovies)
