const mongoose = require("mongoose");

const connectDb = async () => {
    mongoose.connect("mongodb+srv://future-talk:GhcXFfhlaaB30OQ8@generic-cluster.etzyizs.mongodb.net/future_talk?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('MongoDB Connected...',mongoose.connection.host,mongoose.connection.name))
    .catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // Exit process with failure
        process.exit();
    });
};

module.exports = connectDb;
