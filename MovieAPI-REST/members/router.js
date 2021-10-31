const router = require('express').Router();
const controller = require ('./controller');

//router.get('/:id', controller.getMember);
//router.get('/', controller.getMembers);
router.post('/', controller.createMember);
//router.post('/login', controller.loginMember);
//router.put('/:id', controller.updateMember);
//router.delete('/:id', controller.deleteMember);

module.exports = router;