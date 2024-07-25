import Split from 'react-split'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import './App.css'

import { addDoc, onSnapshot, doc, deleteDoc} from 'firebase/firestore'
import { notesCollection, db} from './firebase'

function App() {

  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "")

  const currentNote = notes.find((note) => note.id === currentNoteId) || notes[0]

  useEffect(() =>{
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      // Sync up local notes
      const notesArray = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setNotes(notesArray)
    })
    return unsubscribe
  }, [])

  async function createNote() {
    const newNote = {
      body: "# New Note"
    };
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
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

  async function deleteNote(noteId){
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
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
        >Create one Now
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
          currentNoteId={currentNote.id}
          setCurrentNoteId={setCurrentNoteId}
          deleteNote={deleteNote}
        />
        { 
        currentNoteId &&
        notes.length > 0 &&
          <Editor 
            notes={notes}
            currentNote={currentNote}
            updateNote={updateNote}
          />
        }
      </Split>
      }
    </main>
  )
}

export default App