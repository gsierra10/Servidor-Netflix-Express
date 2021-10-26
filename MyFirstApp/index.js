const express = require('express');
const app = express();
const movies = require('../collection/movies')

app.use(express.json());
app.listen(3000,() => console.log('La API esta levantada en el puerto 3000'));

app.get('/movie', (req, res) => {
   
    const getMovie = (valor) => {
        const callback = pelicula => pelicula.includes(valor);
        return movies.filter(callback)
    };

    let resultado = getMovie(req.query.name);

    console.log('result of getMovie -> ',resultado)

    if(resultado.length > 0){
        res.json({ pelicula : resultado})
    } else {
        res.status(400).send('query not found');
    }
});

app.get('/movie/:id', (req, res) => {
    res.json({
       data : movies[req.params.id]
    });
});

app.post('/movie', (req, res) => {
    const newMovie = {
        name: req.body.name,
        genre: req.body.genre
    }
    movies.push(newMovie);
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

app.delete('/movie/:id', (req, res) => {
    const found = movies.some(movie => movie.id === parseInt(req.params.id));
    console.log(found)
    if(found){
        res.json({ msg: 'Movie deleted', movies: movies.filter(movie => movie.id !== parseInt(req.params.id))});
    }
});