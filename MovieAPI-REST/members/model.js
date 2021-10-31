const mongoose = require('mongoose');


const Members = new mongoose.Schema({
    name: { type: String, required: true, ref: 'Movie' },
    role: { type: String, required: true },
})
module.exports = mongoose.model('Members', Members);
