const router = require('express').Router();
const ctrl = require('../controllers');
const authReq = require('../middleware/authReq');

// Routes
router.get('/', ctrl.hikes.index);
router.put('/:id', ctrl.hikes.update);
router.get('/:id', ctrl.hikes.show);
router.post('/', ctrl.hikes.create);
router.delete('/:id', ctrl.hikes.destroy);

// exports
module.exports = router;
