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

    const data = await Movie.find({ title: { $regex: new RegExp(req.query.title, 'i') } });
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

module.exports.changeMovie = (req, res) => {
    const found = movies.find(movie => movie.id === parseInt(req.params.id));

    if(found){
        const updateMovie = req.body;
        Movie.forEach(Movie =>{
            if(Movie.id === parseInt(req.params.id)){
                Movie.name = updateMovie.title ? updateMovie.title : Movie.title;
                Movie.genero = updateMovie.genero ? updateMovie.genero : Movie.genero;
                res.json({ msg : 'Pelicula Corregida', Movie})
            }
        });
    }
};

module.exports.deleteMovie = (req, res) => {
    const found = Movie.some(Movie => Movie.id === parseInt(req.params.id));
    if(found){
        let num = req.params.id;
        Movie.splice(num, 1)
        res.json({ msg: 'Movie deleted', Movie});
    }
};