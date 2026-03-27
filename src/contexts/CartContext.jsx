import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    // hàm thêm sản phẩm
    const addToCart = product => {
        const existingItemIndex = cart.findIndex(item => item.id === product.id)

        if (existingItemIndex !== -1) {
            const newCart = [...cart]
            newCart[existingItemIndex].quantity += 1
            setCart(newCart)
        } else {
            setCart([...cart, { ...product, quantity: 1 }])
        }

        toast.success('Add to cart successfully')
    }

    // hàm xóa sản phẩm
    const removeFromCart = productId => {
        const newCart = cart.filter(item => item.id !== productId)
        setCart(newCart)
    }

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    const updateQuantity = (productId, action) => {
        const newCart = cart.map(item => {
            if (item.id === productId) {
                if (action === 'increase')
                    return { ...item, quantity: item.quantity + 1 }
                if (action === 'descrease' && item.quantity > 1)
                    return { ...item, quantity: item.quantity - 1 }
            }
            return item
        })
        setCart(newCart)
    }

    const clearCart = () => setCart([])

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                totalQuantity,
                totalPrice,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
