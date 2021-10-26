const express = require('express');
const app = express();
const movies = ['Joker', 'The Father', 'Hogar', 'Quien a hierro mata', 'Once Upon a Time in Hollywood', 'El hoyo'];
app.use(express.json());
app.listen(3000,() => console.log('La API esta levantada en el puerto 3000'));

app.get('/movie', (req, res) => {
    const movieName = (valor) => {
        const callback = pelicula => pelicula.includes(valor);
        let result = movies.filter(callback)
        return result
    }

    if(req.query.name){
        res.json({ pelicula : movieName(req.query.name)})
    }
    else res.json({
       data : movies
    });
});
(movies) =>
app.get('/movie/:id', (req, res) => {
    res.json({
       data : movies[req.params.id]
    });
});