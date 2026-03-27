import { CartContext } from '@/contexts/CartContext'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useContext(CartContext)
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isSubmitting }
    } = useForm()
    const [cities, setCities] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        try {
            fetch('https://provinces.open-api.vn/api/v1/')
                .then(res => res.json())
                .then(data => {
                    setCities(data)
                })
        } catch (error) {
            console.error(error)
        }
    }, [])

    const onSubmit = data => {
        const newOrder = {
            customerInfo: data,
            products: cart,
            totalAmount: totalPrice.toFixed(2),
            createAt: new Date().toISOString()
        }

        const fakeOrderId = 'DH' + Math.floor(Math.random() * 10000) //Giả lập mã đơn hàng

        try {
            // await axios.post('API_URL/orders', newOrder)
            console.log('Đang gửi API tạo đơn hàng...', newOrder)
            clearCart()
            reset(getValues())
            toast.success('Lên đơn hàng thành công')
            navigate('/payment', {
                state: { totalPrice, orderId: fakeOrderId }
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <button>
                <Link to={'/cart'}>Quay lại trang giỏ hàng</Link>
            </button>
            <h1>Thanh toán</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    maxWidth: '400px'
                }}
            >
                <input
                    {...register('fullname', {
                        required: 'Vui lòng nhập họ tên'
                    })}
                    placeholder="Họ và tên"
                    required
                    style={{ padding: '8px' }}
                />
                {errors.fullname && (
                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}
                    >
                        {errors.fullname.message}
                    </span>
                )}
                <input
                    {...register('phone', {
                        required: 'Vui lòng nhập số điện thoại',
                        maxLength: {
                            value: 13,
                            message: 'Số điện thoại không quá 13 ký tự'
                        },
                        minLength: {
                            value: 10,
                            message: 'Số điện thoại phải có ít nhất 10 số'
                        }
                    })}
                    placeholder="Số điện thoại"
                    required
                    style={{ padding: '8px' }}
                />
                {errors.phone && (
                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}
                    >
                        {errors.phone.message}
                    </span>
                )}
                <input
                    {...register('email', {
                        required: 'Bắt buộc nhập thông tin email',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email không đúng định dạng'
                        }
                    })}
                    placeholder="Email"
                    required
                    style={{ padding: '8px' }}
                />
                {errors.email && (
                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}
                    >
                        {errors.email.message}
                    </span>
                )}
                <input
                    {...register('address')}
                    placeholder="Địa chỉ chi tiết"
                    required
                    style={{ padding: '8px' }}
                />
                {errors.address && (
                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}
                    >
                        {errors.address.message}
                    </span>
                )}

                <select
                    {...register('city', {
                        required: 'Vui lòng chọn Tỉnh/Thành phố'
                    })}
                    style={{ padding: '8px' }}
                >
                    <option value="">--Chọn Tỉnh/Thành phố--</option>

                    {cities.map(city => (
                        <option key={city.code} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
                {errors.city && (
                    <span
                        style={{
                            color: 'red',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}
                    >
                        {errors.city.message}
                    </span>
                )}

                <h3>Tổng thành tiền: {totalPrice.toFixed(2)}</h3>

                <button
                    type="submit"
                    style={{
                        background: 'blue',
                        color: 'white',
                        padding: '10px',
                        cursor: 'pointer'
                    }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                </button>
            </form>
        </>
    )
}

export default CheckoutPage
