const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlparser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random100 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '631dbad6d9b0ae412d5a5e1b',
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quam perspiciatis deleniti reprehenderit iusto, similique consequuntur suscipit nemo. Provident eos culpa magni suscipit laborum magnam iure delectus quisquam, incidunt rem!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random100].longitude,
                    cities[random100].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmzmflhum/image/upload/v1663348286/YelpCamp/jq7iozf4lvfzpbfqr6ih.jpg',
                    filename: 'YelpCamp/jq7iozf4lvfzpbfqr6ih',
                },
                {
                    url: 'https://res.cloudinary.com/dmzmflhum/image/upload/v1663348290/YelpCamp/p3us5mvug500rwcctemq.jpg',
                    filename: 'YelpCamp/p3us5mvug500rwcctemq',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})