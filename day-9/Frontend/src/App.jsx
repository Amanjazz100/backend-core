import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);

  console.log("Hello integration");

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value); 

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value,
    })
    .then((res) =>{
      console.log(res.data);
      fetchNotes();
    });
  }
  function handleDeleteNote(id) {
    axios.delete(`http://localhost:3000/api/notes/${id}`)
    .then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }
  function handleEditNote(id) {
      const newTitle = prompt("Enter new title");
      const newDescription = prompt("Enter new description");
      axios.patch(`http://localhost:3000/api/notes/${id}`, {
        title: newTitle,
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
    }
  


  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>  

      <div className="notes">
        {notes.map((notes) => {
          return (
            <div className="note">
              <h1>{notes.title}</h1>
              <p>{notes.description}</p>
              <button onClick={() => handleDeleteNote(notes._id)}>Delete</button>
              <button onClick={() => handleEditNote(notes._id)}>Edit</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
