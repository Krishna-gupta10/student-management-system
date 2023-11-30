const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect("mongodb+srv://krishnagupta01:kgupta_chatbot_1010@cloudbook.9o7cpgx.mongodb.net/").then(() => {
        console.log("MongoDB Connected Successfully!")
    });
}

module.exports = connectToMongo;








