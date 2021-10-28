const router = require('express').Router();
const controller = require ('./controller');

//router.get('/', controller.getMovies);
//router.get('/', controller.getMovie);
router.post('/', controller.createMovie);

module.exports = router;