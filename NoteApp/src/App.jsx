import Split from 'react-split'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {

  const [notes, setNotes] = useState([])
  // console.log(notes)

  function createNote() {
    const newNote = {
      body: "Some text"
    };
     return setNotes(notes => (
      [...notes, newNote]
     ))
  }

  return (
    <main>
      {notes.length <= 0
      ?
      <div className='main'>
        <h1 className='landing--title'>You have no notes yet</h1>
        <button 
          className='landing--button'
          onClick={createNote}
        >Create one Note
        </button>
      </div>
      :
      <Split 
        sizes={[30, 70]}
        direction="horizontal"
        className='split'
      >
        <Sidebar />
        <h1>Editor</h1>
      </Split>
      }
    </main>
  )
}

export default App