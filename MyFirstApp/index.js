const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.listen(3000,() => console.log('La API esta levantada en el puerto 3000'));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/controller.js', require('./routes/controller.js'))
