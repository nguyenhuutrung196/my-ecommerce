import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'
import HomePage from '@pages/HomePage'
import CartPage from '@pages/CartPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from '@/contexts/UserContext'
import ShopPage from '@pages/ShopPage'
import { FilterProvider } from '@/contexts/FilterContext'
import { CartProvider } from '@/contexts/CartContext'
import CheckoutPage from '@pages/CheckoutPage'
import PaymentPage from '@pages/PaymentPage'
import SuccessPage from '@pages/SuccessPage'

function App() {
    return (
        <UserProvider>
            <CartProvider>
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
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/success" element={<SuccessPage />} />
                    </Routes>
                    <Footer />
                    <ToastContainer position="bottom-right" autoClose={3000} />
                </BrowserRouter>
            </CartProvider>
        </UserProvider>
    )
}

export default App
