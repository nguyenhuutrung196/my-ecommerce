import './Header.scss'

function Header() {
    return (
        <header>
            <div className="logo">My E-commerce</div>
            <nav className="menu">
                <ul>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Products</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
