

function Sidebar() {
    return (
        
        <div className="sidebar">
            <div className="sidebar--header">
                <h1 className="header--title">Notes</h1>
                <button className="header--button">+</button>
            </div>
            <h1 className="sidebar--notecard light"> # Note 1</h1>
            <h1 className="sidebar--notecard dark"># Note 2</h1>
        </div>
    )
}

export default Sidebar;