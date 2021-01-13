import mongoose from 'mongoose';
require("dotenv").config();

const { MONGO_URI } = process.env;
// Connect to MongoDB
export const connect = () => mongoose
  .connect(MONGO_URI, {
    dbName: "nodejs",
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

// connect();

mongoose.connection.on('error', (error) => {
  console.error("MongoDB connection error", error);
})

mongoose.connection.on('disconnected', () => {
    console.error("reconnect to MongoDB");
    connect();
})

// module.exports = connect;