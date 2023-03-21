const mongoose = require('mongoose');

const {
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const options = {
    useNewUrlParser: true,
    wtimeoutMS: 10000
};

const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
console.log(url);
mongoose.connect(url, options).then(function () {
    console.log('MongoDB is connected\n\n');
}).catch(function (error) {
    console.log(error);
});



