import './Sidebar.scss'

function Sidebar({ isOpen, toggleSidebar, children }) {
    return (
        <>
            <div
                onClick={toggleSidebar}
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
            >
                <div
                    className={`sidebar-content ${isOpen ? 'slide-in' : ''}`}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={toggleSidebar}>
                        X
                    </button>

                    <div className="sidebar-body">{children}</div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
