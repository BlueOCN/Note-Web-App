import { useState } from "react";
import ReactMde from "react-mde";
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

    const currentNote = props.notes.find((note) => note.id === props.currentNoteId) || props.notes[0]
    // console.log(currentNote)
    
    return (
        <div className="pane">
            <ReactMde
                value={currentNote.body}
                onChange={props.updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </div>
    )
}

export default Editor