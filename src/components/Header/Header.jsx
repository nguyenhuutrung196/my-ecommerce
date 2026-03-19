import { Link } from 'react-router-dom'
import './Header.scss'

function Header() {
    const menuList = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Cart', path: '/cart' },
        { name: 'Checkout', path: '/checkout' }
    ]

    return (
        <>
            <header className="header">
                <div className="logo">My-Ecommerce</div>
                <nav className="menu">
                    <ul>
                        {menuList.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header
