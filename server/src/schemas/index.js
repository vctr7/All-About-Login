import mongoose from 'mongoose';

const {PORT, MONGO_URI} = process.env;

// Connect to MongoDB
// mongoose
// .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology: true})
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(e => console.error(e));

// module.exports = connect;

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology: true}, (error) => {
        if (error) {
            console.log("mongodb connection error!");
        }
        else {
            console.log("connected to MongoDB");
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.log('mongodb connenction error', error);
});
mongoose.connection.on('disconnected', () => {
    console.log('mongodb lost. reconnect to mongodb');
    connect();
})

module.exports = connect;