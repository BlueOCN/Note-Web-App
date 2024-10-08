import PropTypes from 'prop-types'

function Sidebar(props) {

    // eslint-disable-next-line react/prop-types
    const noteElements = props.notes.map((note) => (
        <div 
            className={`sidebar--notecard 
                ${note.id === props.currentNoteId 
                ? "dark" : "light"}`}
            key={note.id}
            onClick={() => props.setCurrentNoteId(note.id)}
        >
            <h1 className="notecard--title">{note.body.split("\n")[0]}</h1>
            <button 
                className="notecard--button"
                onClick={() => props.deleteNote(note.id)}
            >
                <span 
                    className={`material-symbols-outlined 
                        ${note.id === props.currentNoteId 
                        ? "dark" : "light"}`}
                    >delete
                </span>
            </button>
        </div>
    ))

    return (
        
        <div className="sidebar">
            <div className="sidebar--header">
                <h1 className="header--title">Notes</h1>
                <button 
                    className="header--button"
                    onClick={props.newNote}
                    >+
                </button>
            </div>
            {noteElements}
        </div>
    )
}

Sidebar.propTypes = {
    notes: PropTypes.arrayOf(  
        PropTypes.shape({
            id: PropTypes.string,
            body: PropTypes.string
        })
    ),
    newNote: PropTypes.func,
    currentNoteId: PropTypes.string,
    setCurrentNoteId: PropTypes.func,
    deleteNote: PropTypes.func
}

export default Sidebar;