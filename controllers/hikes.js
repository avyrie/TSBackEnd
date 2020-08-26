const db = require('../models');

const index = (req, res) => {
  db.Hike.find({}, (err, foundHikes) => {
    if (err) console.log('Error in hikes index:', err);

    res.status(200).json(foundHikes);
  });
};

const show = (req, res) => {
  db.Hike.findById(req.params.id, (err, foundHike) => {
    if (err) console.log('Error in hikes show', err);

    res.status(200).send(foundHike);
  });
};

const create = (req, res) => {
  db.Hike.create(req.body, (err, savedHike) => {
      console.log(`This is a saved hike: `, savedHike)
    if (err) console.log('Error in hikes create:', err);

    res.status(200).json(savedHike);
  });
};

const update = (req, res) => {
  db.Hike.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedHike) => {
    if (err) console.log('Error in hikes update:', err);

    if (!updatedHike) {
      res.status(400).json({message: `Could not find Hike with id ${req.params.id}`});
    }

    res.json(updatedHike);
  });
};

const destroy = (req, res) => {
  db.Hike.findByIdAndDelete(req.params.id, (err, deletedHike) => {
    if (err) console.log('Error in hike destroy:', err);

    res.status(200).json(deletedHike);
  });
};


module.exports = {
    index,
    show,
    create,
    update,
    destroy,
};
