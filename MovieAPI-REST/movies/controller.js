const express = require('express');
const Movie = require('./model');
const router = express.Router();


module.exports.getMovies = async (req, res) => {
    const query = {};
    if (req.query.title) {
        query.title = req.query.title;
    }
    if (req.query.duration) {
        query.duration = req.query.duration;
    }
    if (req.query.genero) {
        query.genero = req.query.genero;
    }

    const data = await Movie.find(query);
    res.json(data);
};

module.exports.getMovie = async (req, res) => {
    const data = await Movie.find({_id: req.params.id});
    res.json(data);
};

module.exports.createMovie = async (req, res) => {
    const newMovie = new Movie(req.body);
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