const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seed-helpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '60310aee2236d14c38bdecc2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum velit temporibus ipsam. Error sunt voluptas',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dup6wqfzv/image/upload/v1613923979/YelpCamp/fkzqlld9jtwvxm2dqpoz.jpg',
                  filename: 'YelpCamp/fkzqlld9jtwvxm2dqpoz'
                },
                {
                  url: 'https://res.cloudinary.com/dup6wqfzv/image/upload/v1613923980/YelpCamp/qhn4qzxgtjj0gad6buye.jpg',
                  filename: 'YelpCamp/qhn4qzxgtjj0gad6buye'
                }
              ]
              
        })
        await camp.save();
    }
} 

seedDB().then(() => {
    mongoose.connection.close();
});