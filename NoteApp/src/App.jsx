// import Split from 'react-split'
import { useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])

  return (
    <main>
      {notes.length <= 0 
      ?
      <div className='main landing'>
        <h1 className='landing--title'>You have no notes yet</h1>
        <button className='landing--button'>Create one Note</button>
      </div>
      :
      <div>
        <h1>Saved Notes</h1>
      </div>
      }
    </main>
  )
}

export default App
