const router = require('express').Router();
const controller = require ('./controller');

//router.get('/', controller.getMovies);
//router.get('/:id', controller.getMovie);
router.post('/', controller.createMember);
//router.put('/:id', controller.changeMovie);
//router.delete('/:id', controller.deleteMovie);

module.exports = router;