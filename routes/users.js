const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authReq');

// Current: api/users

// Routes
router.get('/', ctrl.users.index);
router.get('/:id', ctrl.users.show);
router.put('/:id', authRequired, ctrl.users.update);
router.delete('/:id', authRequired, ctrl.users.destroy);

// exports
module.exports = router;