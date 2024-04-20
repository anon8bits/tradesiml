import { connect } from 'mongoose';

const mongoURI = "mongodb://0.0.0.0:27017/tradesiml";

const connectToMongo = () => {
  connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

export default connectToMongo;