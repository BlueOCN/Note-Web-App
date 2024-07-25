import Split from 'react-split'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import './App.css'

function App() {

  // localStorage.setItem("notes",[])
  console.log(JSON.parse(localStorage.getItem("notes")))

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])
  const [currentNoteId, setCurrentNoteId] = useState(notes[0] && notes[0].id || "")
  // console.log(notes)

  useEffect(() =>{
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "# New Note"
    };
    setNotes(notes => [newNote, ...notes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes(prevNotes => {

      const updatedNotes = prevNotes.map(note => {
        return note.id === currentNoteId
              ? {...note, body: text}
              : note
      })
      const focusedNote = updatedNotes.filter(note => note.id === currentNoteId)
      const otherNotes = updatedNotes.filter(note => note.id !== currentNoteId)
      return focusedNote.concat(otherNotes)
    })
  }

  function deleteNote(event, noteId){
    event.stopPropagation()
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
  }

  function findCurrentNote() {
    return notes.find(note => note.id === currentNoteId) || notes[0]
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
          currentNoteId={findCurrentNote().id}
          setCurrentNoteId={setCurrentNoteId}
          deleteNote={deleteNote}
        />
        { 
        currentNoteId &&
        notes.length > 0 &&
          <Editor 
            notes={notes}
            currentNoteId={currentNoteId}
            updateNote={updateNote}
          />
        }
      </Split>
      }
    </main>
  )
}

export default App