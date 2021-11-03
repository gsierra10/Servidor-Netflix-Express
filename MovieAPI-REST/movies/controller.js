const Movie = require('./model');

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

module.exports.changeMovie = async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            const movieUpdate = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(movieUpdate);
        } else {
            res.json({
                msg: 'pelicula no encontrada'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        if (error.name == "error de validacion") {
            res.json({
                menssage: error.message
            }, 400);
        } else {
            res.json({
                message: error.message
            }, 500);
        }
    }
};

module.exports.deleteMovie = async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            const movie = await Movie.findByIdAndDelete(req.params.id);
            res.json({
                message: 'pelicula borrada'
            });
        } else {
            res.json({
                message: 'pelicula no encontrada'
            }, 404);
        }
    } catch (error) {
        res.json({
            message: error.message
        }, 500);
    }
};