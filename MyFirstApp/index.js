const express = require('express');
const app = express();
const movies = ['Joker', 'The Father', 'Hogar', 'Quien a hierro mata', 'Once Upon a Time in Hollywood', 'El hoyo'];

app.use(express.json());
app.listen(3000,() => console.log('La API esta levantada en el puerto 3000'));

app.get('/movie', (req, res) => {
    const getMovie = (valor) => {
        const callback = pelicula => pelicula.includes(valor);
        let result = movies.filter(callback)
        return result
    };
    
    if(req.query.name){
        res.json({ pelicula : getMovie(req.query.name)})
    }
    else res.json({
       data : movies
    });
});

app.get('/movie/:id', (req, res) => {
    res.json({
       data : movies[req.params.id]
    });
});

app.post('/movie', (req, res) => {
    const newMovie = {name: req.body.name}
    movies.push(newMovie.name);
    res.json(movies);
});

app.put('/movie/:id', (req, res) => {
    const found = movies.some(movie => movie.id === parseInt(req.params.id));

    if(found){
        const updateMovie = req.body;
        movies.forEach(movie =>{
            if(movie.id === parseInt(req.params.id)){
                movie.name = updateMovie.name ? updateMovie.name : movie.name;

                res.json({ msg : 'Pelicula Corregida', movie})
            }
        });
    }
});