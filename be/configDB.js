const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
const URI = process.env.MONGODB_URI

module.exports = connectDB = async() => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("CONNECTING TO DB SUCCESSFULLY!!!");
    }
    catch(error) {
        console.error(error);
    }
};