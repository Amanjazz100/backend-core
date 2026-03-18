import { useState } from 'react'
import './index.css'
import axios from 'axios'

function App() {

  const [notes, setnotes] = useState([
    {
      title: "test title",
      description: "test description"
    },
    {
      title: "test title 2",
      description: "test description 2"
    },
    {
      title: "test title 3",
      description: "test description 3"
    },
    {
      title: "test title 4",
      description: "test description 4"
    },
  ])

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setnotes(res.data.notes) 
  })

  return (
   <>
    <div className="notes">
      {
        notes.map(notes => {
          return (
            <div className="note">
              <h1>{notes.title}</h1>
              <p>{notes.description}</p>
            </div>
          )
        })
      }
    </div>
   </> 
  ) 
}

export default App
