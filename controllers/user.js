const db = require('../models');
const bcrypt = require('bcryptjs');


const show = (req, res) => {
    db.User.findById(req.params.id)
        .populate('my_movies')
        .exec((err, foundUser)) => {
            if (err) return res.status(500).json({
                status: 500,
                data: foundUser,
                error: [{ message: `Error in users show: ${err}`}]
            });
            return res.status(200).json({
                status 200,
                data: foundUser,
                requestedAt: new Date().toLocaleString(),
            })
        }
};


const update = (req, res) => {
    // req.body.free_plan = false
    // db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    // if (err) console.log('Error in hikes update:', err);

    // if (!updatedHike) {
    //     res.status(400).json({message: `Could not find Hike with id ${req.params.id}`});
    // }

    // res.json(updatedHike);
    // });
};

const destroy = (req, res) => {
  db.Hike.findByIdAndDelete(req.params.id, (err, deletedHike) => {
    if (err) console.log('Error in hike destroy:', err);

    res.status(200).json(deletedHike);
  });
};


module.exports = {
    show,
    update,
    destroy,
};
