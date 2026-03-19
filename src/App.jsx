import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import HomePage from '@pages/HomePage'
import CartPage from '@pages/CartPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
