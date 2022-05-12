const Campground = require('../models/campground');
const mongoose = require('mongoose');

const cities = require('./cities');
const { places, descriptors } = require('./seeedHelpers');

const sample = array => array[Math.floor(Math.random() * array.length)];

mongoose.connect('mongodb+srv://chrisBradwell:GkUoRYP9wBU2smxu@cluster0.2zyvo.mongodb.net/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Database Connected');
})

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const campground = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/21486576',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, iusto.',
            price

        });
        await campground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});