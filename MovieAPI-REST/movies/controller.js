const express = require('express');
const MovieSchema = require('./model');
const router = express.Router();
const movies = require('./model')


router.get('/', (req, res) => {
   
    const getMovie = valor => {
        const callback = pelicula => {
            return pelicula.name.includes(valor);
        };
        return movies.filter(callback);
    };
    
    let resultado = getMovie(req.query.name);
    let result = getMovie(req.query.genre)

    if(result.length > 0){
        res.json({ pelicula : resultado})
    } else {
        res.status(400).send('query not found');
    };
});

router.get('/:id', (req, res) => {
    res.json({
       data : movies[req.params.id]
    });
});

module.exports.createMovie = async (req, res) => {
    const newMovie = new MovieSchema(req.body);
    await newMovie.save();
    res.json(newMovie);
};

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const found = movies.some(movie => movie.id === parseInt(req.params.id));
    if(found){
        let num = req.params.id;
        movies.splice(num, 1)
        res.json({ msg: 'Movie deleted', movies});
    }
});