import { useState } from "react";
import ReactMde from "react-mde";
import PropTypes from "prop-types";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });


function Editor(props) {
    // const [value, setValue] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState("write");

    // eslint-disable-next-line react/prop-types
    const currentNote = props.notes.find((note) => note.id === props.currentNoteId) || props.notes[0]
        
    return (
        <section className="pane">
            <ReactMde
                value={currentNote.body}
                onChange={props.updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={100}
                heightUnits="vh"
            />
        </section>
    )
}

/* Editor.propTypes = {
    notes: PropTypes.shape({
        id: PropTypes.string,
        body: PropTypes.string
    }),
    currentNoteId: PropTypes.string,
    updateNote: PropTypes.func
} */

Editor.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            body: PropTypes.string
        })
    ),
    currentNoteId: PropTypes.string,
    updateNote: PropTypes.func
};

export default Editor