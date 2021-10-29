const mongoose = require('mongoose');


const Members = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
})
module.exports = mongoose.model('Members', Members);
