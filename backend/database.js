const mongoose = require('mongoose');

const mongoURI = "mongodb://0.0.0.0:27017/tradesiml";

const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    // .then(() => {
    //   console.log('Connected to MongoDB');
    // })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connectToMongo;