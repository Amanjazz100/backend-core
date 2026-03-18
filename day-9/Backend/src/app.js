
const express = require('express');
const noteModel = require('./models/note.model')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

//api banayege yaha
// create new note and save data to mongo db
// req.body = {title, description}
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "note created successfully",
        note
    })
})


//fetch all the data from MONGO DB  and send them to the response
app.get('/api/notes', async(req,res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "notes fetched successfully",
        notes  
    })
})


// -DELETE :  note from the id from req.params
app.delete('/api/notes/:id',async(req,res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "note deleted successfull."
    })
})


// -PATCH /api/notes/:id
// - update the description of the notes by id
// - req.body = {description}

app.patch('/api/notes/:id', async(req,res) => {
    const id = req.params.id;
    const {description} = req.body;
    await noteModel.findByIdAndUpdate(id,{description});

    res.status(200).json({
        message: "notes updates successfully."
    })
})


module.exports = app;

