const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authReq');

// Routes
router.get('/', ctrl.hikes.index);
router.put('/:id', authRequired, ctrl.hikes.update);
router.get('/:id', ctrl.hikes.show);
router.post('/', authRequired, ctrl.hikes.create);
router.delete('/:id', authRequired, ctrl.hikes.destroy);

// exports
module.exports = router;
