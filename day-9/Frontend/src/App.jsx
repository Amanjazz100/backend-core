import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);

  function fetchNotes() {
    axios.get("https://cohort-2-0-udvz.onrender.com/api/notes")
      .then((res) => {
        setnotes(res.data.notes);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios.post("https://cohort-2-0-udvz.onrender.com/api/notes", {
      title: title.value,
      description: description.value,
    })
    .then(() => {
      fetchNotes();
      e.target.reset();
    });
  }

  function handleDeleteNote(id) {
    axios.delete(`https://cohort-2-0-udvz.onrender.com/api/notes/${id}`)
    .then(() => {
      fetchNotes();
    });
  }

  function handleEditNote(id) {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new description");

    if (!newTitle || !newDescription) return;

    axios.patch(`https://cohort-2-0-udvz.onrender.com/api/notes/${id}`, {
      title: newTitle,
      description: newDescription,
    })
    .then(() => {
      fetchNotes();
    });
  }

  return (
    <>
      <div className="app">

        <form className="note-create-form" onSubmit={handleSubmit}>
          <input name="title" type="text" placeholder="Enter Title" />
          <input name="description" type="text" placeholder="Enter Description" />
          <button>Create</button>
        </form>

        <div className="notes">
          {notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                <h1>{note.title}</h1>
                <p>{note.description}</p>

                <div className="btns">
                  <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
                  <button onClick={() => handleEditNote(note._id)}>Edit</button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}

export default App;