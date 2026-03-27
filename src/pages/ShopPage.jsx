import FilterBar from '@/components/FilterBar/FilterBar'
import { CartContext } from '@/contexts/CartContext'
import { FilterContext } from '@/contexts/FilterContext'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

function ShopPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    'https://fakestoreapi.com/products'
                )

                setProducts(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const { filters } = useContext(FilterContext)
    const { addToCart } = useContext(CartContext)

    const filteredProducts = products.filter(item => {
        if (filters.category === 'all') return true
        return item.category === filters.category
    })

    return (
        <>
            <div style={{ padding: '20px' }}>
                <h2>Trang cửa hàng</h2>
                {loading ? (
                    <p>Đang tải sản phẩm...</p>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            gap: '30px',
                            padding: '20px'
                        }}
                    >
                        <div style={{ width: '250px' }}>
                            <FilterBar />
                        </div>
                        <ul
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3,1fr)',
                                gap: '20px'
                            }}
                        >
                            {filteredProducts.map(item => (
                                <li key={item.id}>
                                    <img
                                        width={200}
                                        height={200}
                                        style={{
                                            border: '1px solid black',
                                            padding: '15px'
                                        }}
                                        src={item.image}
                                        alt={item.title}
                                    />
                                    <h6>Danh mục: {item.category}</h6>
                                    <p>Tên: {item.title}</p>
                                    <p>Giá: ${item.price}</p>
                                    <button onClick={() => addToCart(item)}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default ShopPage
