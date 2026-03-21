import { Link } from 'react-router-dom'
import './Header.scss'
import { useState } from 'react'
import Sidebar from '@components/Sidebar/Sidebar'
import LoginForm from '@components/LoginForm/LoginForm'

function Header() {
    const menuList = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'About', path: '/about' }
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [currentForm, setCurrentForm] = useState('login')

    const openLogin = () => {
        setIsOpen(true)
        setCurrentForm('login')
    }

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
                        <li>
                            <button onClick={openLogin}>Login</button>

                            <Sidebar
                                isOpen={isOpen}
                                toggleSidebar={() => setIsOpen(false)}
                            >
                                <div>
                                    {currentForm === 'login' ? (
                                        <div>
                                            <h2>Đăng nhập</h2>
                                            <LoginForm />
                                            <p>
                                                Chưa có tài khoản{' '}
                                                <span
                                                    className="link"
                                                    onClick={() => {
                                                        setCurrentForm('signup')
                                                    }}
                                                >
                                                    Đăng ký ngay
                                                </span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h2>Đăng ký</h2>
                                            <p>
                                                Có tài khoản{' '}
                                                <span
                                                    className="link"
                                                    onClick={() => {
                                                        setCurrentForm('login')
                                                    }}
                                                >
                                                    Đăng nhập ngay
                                                </span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Sidebar>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header
