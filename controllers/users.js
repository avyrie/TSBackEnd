const db = require('../models');
const bcrypt = require('bcrypt');

// All Users
const index = (req, res) => {
    db.User.find({}, (err, allUsers) => {
      if (err) return res.status(500).json({
        status: 500,
        error: [{message: `Error in users index: ${err}`}],
      });
      
      res.json({
        status: 200,
        count: allUsers.length,
        data: allUsers,
        requestedAt: new Date().toLocaleString(),
      });
    });
  };

// One User
const show = (req, res) => {
    db.User.findById(req.params.id)
        .populate('hikes')
        .exec((err, foundUser) => {
            if (err) return res.status(500).json({
                status: 500,
                data: foundUser,
                error: [{ message: `Error in users show: ${err}`}]
            });
            console.log(`This is foundUser: `, foundUser)
            return res.status(200).json({
                status: 200,
                data: foundUser,
                requestedAt: new Date().toLocaleString(),
            })
        });
};

const update = (req, res) => {
    // req.body.free_plan = false
    db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    if (err) return res.status(500).json({
        status: 500,
        error: [{message: `'Error in users update: ${err}`}]
    });
    if (!updatedUser) {
        res.status(400).json({message: `Could not find User with id ${req.params.id}`});
    }
    res.json({
        status: 200, 
        count: 1,
        data: updatedUser,
        requestedAt: newDate().toLocaleString()
    });
    });
};

const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) return res.status(500).json({
        status: 500,
        error: [{message: `Error in user destroy: ${err}`}]
    });

    res.json({
        status: 200,
        count: 1,
        data: deletedUser,
        requestedAt: new Date().toLocaleString(),
    });
  });
};


module.exports = {
    show,
    update,
    destroy,
    index,
};
