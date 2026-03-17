const mongoose = require("mongoose");


function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err)=>{d
        console.log("error connecting to DB", err);
    })
}


module.exports = connectDB;