const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String},
    director: { type: String},
    genero: { type: String},
    duracion: { type: Number}
})
module.exports = mongoose.model('Movie', MovieSchema);

module.exports = MovieSchema;