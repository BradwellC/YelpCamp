const express = require('express');
const path = require('path');
const Campground = require('./models/campground');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://chrisBradwell:GkUoRYP9wBU2smxu@cluster0.2zyvo.mongodb.net/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Database Connected');
})

// GkUoRYP9wBU2smxu

const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home.ejs');
})

app.get('/campground', async (req, res) => {
    const campground = new Campground({ title: 'My Garden' });
    await campground.save();
    res.send(campground);
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})