import axios from 'axios'
import { useEffect, useState } from 'react'

function HomePage() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    'https://fakestoreapi.com/products'
                )

                setProducts(response.data)

                console.log('Fetching products:', response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchProducts()
    }, [])

    return (
        <>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                {products.map(item => {
                    return (
                        <li key={item.id} data-id={item.id}>
                            <img
                                src={item.image}
                                alt=""
                                srcset=""
                                width={50}
                                height={50}
                            />
                            {item.title}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default HomePage
