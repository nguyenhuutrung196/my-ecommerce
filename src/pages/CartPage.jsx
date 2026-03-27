import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'

function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice } =
        useContext(CartContext)

    if (cart.length === 0) {
        return <h2 style={{ padding: '20px' }}>Giỏ hàng đang trống</h2>
    }

    return (
        <>
            <h1>Chi tiết giỏ hàng</h1>
            {cart.map(item => (
                <div
                    key={item.id}
                    style={{
                        display: 'flex',
                        gap: '20px',
                        borderBottom: '1px solid #eee'
                    }}
                >
                    <img
                        src={item.image}
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain'
                        }}
                    />
                    <div>
                        <h4>{item.title}</h4>
                        <p>
                            ${item.price} x {item.quantity}
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <button
                                style={{
                                    padding: '10px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: '#eea'
                                }}
                                onClick={() => {
                                    updateQuantity(item.id, 'increase')
                                }}
                            >
                                +
                            </button>
                            <button
                                style={{
                                    padding: '10px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    backgroundColor: '#eea'
                                }}
                                onClick={() => {
                                    updateQuantity(item.id, 'descrease')
                                }}
                            >
                                -
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                removeFromCart(item.id)
                            }}
                            style={{
                                background: '#ff4d4f',
                                color: '#fff',
                                border: 'none',
                                padding: '5px',
                                borderRadius: '8px'
                            }}
                        >
                            Xóa khỏi giỏ hàng
                        </button>
                    </div>
                </div>
            ))}
            <h3>Tổng tạm tính: {totalPrice.toFixed(2)}</h3>
        </>
    )
}

export default CartPage
