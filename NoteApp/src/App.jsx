import Split from 'react-split'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'

import { addDoc, onSnapshot, doc, deleteDoc, setDoc} from 'firebase/firestore'
import { notesCollection, db} from './firebase'

import './App.css'

function App() {

  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState("")

  const currentNote = notes.find((note) => note.id === currentNoteId) || notes[0]
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

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

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id)
    }
  }, [notes])

  async function createNote() {
    const newNote = {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      body: "# New Note"
    };
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(docRef, { updatedAt: Date.now(), body: text }, { merge: true })
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
          notes={sortedNotes}
          newNote={createNote}
          currentNoteId={currentNote.id}
          setCurrentNoteId={setCurrentNoteId}
          deleteNote={deleteNote}
        />
        <Editor 
          notes={notes}
          currentNote={currentNote}
          updateNote={updateNote}
        />
      </Split>
      }
    </main>
  )
}

export default App