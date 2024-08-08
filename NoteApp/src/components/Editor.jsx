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

    const [selectedTab, setSelectedTab] = useState("write");

    return (
        <section className="pane">
            <ReactMde
                value={props.tempNoteText}
                onChange={props.setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={40}
                heightUnits="vh"
            />
        </section>
    )
}

Editor.propTypes = {
    tempNoteText: PropTypes.string,
    setTempNoteText: PropTypes.func
};

export default Editor