import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function PaymentPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { totalPrice, orderId } = location.state || {
        totalPrice: 0,
        orderId: ''
    }
    const qrUrl = `https://qr.sepay.vn/img?bank=MBBank&acc=0987654321&amount=${totalPrice}&des=${orderId}`

    useEffect(() => {
        if (!orderId) return

        const checkPaymentInterval = setInterval(async () => {
            try {
                // const response = await axios.get(`API_URL/orders/status/${orderId}`)
                // const isPaid = response.data.isPaid;

                const isPaid = false //state ban đầu, chưa thanh toán = false
                const isFailed = false //API lỗi hoặc hủy đơn

                if (isPaid) {
                    clearInterval(checkPaymentInterval)
                    toast.success('Thanh toán thành công!')
                    navigate('/success')
                } else if (isFailed) {
                    clearInterval(checkPaymentInterval) // Dừng kiểm tra
                    toast.error('Thanh toán thất bại hoặc quá thời gian chờ!')
                    navigate('/checkout') // Quay lại thanh toán
                }
            } catch (error) {
                console.error(error)
            }
        }, 3000)

        return () => clearInterval(checkPaymentInterval)
    }, [orderId, navigate])

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Quét QR để thanh toán</h1>
            <p>
                Mã đơn hàng: <strong>{orderId}</strong>
            </p>
            <p>
                Số tiền: <strong>{totalPrice}</strong>
            </p>
            <img src={qrUrl} alt="" />
        </div>
    )
}

export default PaymentPage
