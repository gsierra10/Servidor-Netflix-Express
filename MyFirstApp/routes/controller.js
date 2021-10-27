const express = require('express');
const router = express.Router();
const movies = require('../collection/movies')


router.get('/movie', (req, res) => {
   
    const getMovie = valor => {
        const callback = pelicula => {
            return pelicula.name.includes(valor);
        };
        return movies.filter(callback);
    };
    
    let resultado = getMovie(req.query.name);

    if(resultado.length > 0){
        res.json({ pelicula : resultado})
    } else {
        res.status(400).send('query not found');
    };
});

router.get('/movie/:id', (req, res) => {
    res.json({
       data : movies[req.params.id]
    });
});

router.post('/movie', (req, res) => {
    const newMovie = {
        name: req.body.name,
        genre: req.body.genre
    }
    movies.push(newMovie);
    res.json(movies);
});

router.put('/movie/:id', (req, res) => {
    const found = movies.find(movie => movie.id === parseInt(req.params.id));

    if(found){
        const updateMovie = req.body;
        movies.forEach(movie =>{
            if(movie.id === parseInt(req.params.id)){
                movie.name = updateMovie.name ? updateMovie.name : movie.name;
                movie.genre = updateMovie.genre ? updateMovie.genre : movie.genre;
                res.json({ msg : 'Pelicula Corregida', movie})
            }
        });
    }
});

router.delete('/movie/:id', (req, res) => {
    const found = movies.some(movie => movie.id === parseInt(req.params.id));
    if(found){
        let num = req.params.id;
        movies.splice(num, 1)
        res.json({ msg: 'Movie deleted', movies});
    }
});

module.exports = router;