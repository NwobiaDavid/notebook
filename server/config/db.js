const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async() =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`database connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;