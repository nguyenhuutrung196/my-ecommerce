import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import HomePage from '@pages/HomePage'
import CartPage from '@pages/CartPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './contexts/UserContext'
import ShopPage from '@pages/ShopPage'
import { FilterProvider } from '@/contexts/FilterContext'

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                        path="/shop"
                        element={
                            <FilterProvider>
                                <ShopPage />
                            </FilterProvider>
                        }
                    />
                </Routes>
                <Footer />
                <ToastContainer position="bottom-right" autoClose={3000} />
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
