const express = require("express");

const app = express();// server yaha start ho gya

app.use(express.json())
const notes = [];

//POST  /notes
app.post("/notes", (req, res) =>{
    console.log(req.body);
    notes.push(req.body)

    console.log(notes)
    res.send("notes created ");
})



// GET  /notes
app.get("/notes", (req, res)=> {
    res.send(notes)
}) 

// DELETE /notes karne wali api create
// params use karna hoga yaha
app.delete("/notes/:index", (req, res)=>{

    delete notes[req.params.index]
    
    res.send("note deleted successfully")
})

//PATCH /notes/:index
// discription update karna hai bas 

app.patch("/notes/:index", (req,res) => {
    console.log()
    notes[req.params.index].description = req.body.description;
    res.send("discription updated successfully")
})




module.exports = app; 