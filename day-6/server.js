// database se connect karne ka kaam
const app = require('./src/app');
const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect("mongodb+srv://aman:mx3hongQ48selgC8@cluster0.lesl4ce.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to db")
    })
}
connectToDb();

app.listen(3000, () => {
    console.log("server running on port 3000")
})