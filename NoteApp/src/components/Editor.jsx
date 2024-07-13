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


function Editor() {
    const [value, setValue] = useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = useState("write");
    
    return (
        <div className="container">
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </div>
    )
}

export default Editor