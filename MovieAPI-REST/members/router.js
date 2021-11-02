const router = require('express').Router();
const controller = require ('./controller');

router.get('/:id', controller.getMember);
router.get('/', controller.getMembers);
router.post('/', controller.createMember);
router.post('/login', controller.loginMembers);
router.put('/:id', controller.changeMember);
router.delete('/:id', controller.deleteMember);

module.exports = router;