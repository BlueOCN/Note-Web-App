import Split from 'react-split'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import './App.css'

function App() {

  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "")
  // console.log(notes)

  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "# New Note"
    };
    setCurrentNoteId(newNote.id)
    setNotes(notes => [newNote, ...notes])
  }

  function updateNote(text) {
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === currentNoteId
            ? {...note, body: text}
            : note
    }))
  }

  function deleteNote(event, noteId){
    event.stopPropagation()
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
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
        sizes={[35, 65]}
        direction="horizontal"
        className='split'
      >
        <Sidebar 
          notes={notes}
          newNote={createNote}
          currentNoteId={currentNoteId}
          setCurrentNoteId={setCurrentNoteId}
          deleteNote={deleteNote}
        />
        <Editor 
          notes={notes}
          currentNoteId={currentNoteId}
          updateNote={updateNote}
        />
      </Split>
      }
    </main>
  )
}

export default App