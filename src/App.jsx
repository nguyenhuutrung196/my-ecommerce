import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import HomePage from '@pages/HomePage'
import CartPage from '@pages/CartPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './contexts/UserContext'

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
                <Footer />
                <ToastContainer position="bottom-right" autoClose={3000} />
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
