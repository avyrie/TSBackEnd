// const mongoose = require('mongoose');
const db = require('./models');

const hikeList = [
    {
        name: 'Hike A',
        city: 'City A',
        state: 'State A',
        // latitude: '#',
        // longitude: '#',
        difficulty: 'Beginner',
    },
    {
        name: 'Hike B',
        city: 'City B',
        state: 'State B',
        // latitude: '#',
        // longitude: '#',
        difficulty: 'Intermediate',
    },
    {
        name: 'Hike C',
        city: 'City C',
        state: 'State C',
        // latitude: '#',
        // longitude: '#'
        difficulty: 'Advanced',
    },
];

db.Hike.deleteMany({}, (err, deletedHikes) => {
    if(err) console.log(err);
    
    db.Hike.create(hikeList, (err, createdHikes) => {
        if(err) console.log(err);
    
        console.log(createdHikes);
        process.exit();
    })
})    