// Nhúng mongoose để có thể kết nối MongooseDB
const mongoose = require("mongoose");

module.exports.connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("SUCCESS");
    }catch(error){
        console.log("Error");

    }
}