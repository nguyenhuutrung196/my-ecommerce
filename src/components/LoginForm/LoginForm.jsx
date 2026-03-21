import { UserContext } from '@/contexts/UserContext'
import axios from 'axios'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

function LoginForm() {
    const { setUserInfo } = useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            username: 'mor_2314',
            password: '83r5^_'
        },

        validationSchema: Yup.object({
            username: Yup.string('Invalid username').required('Required'),
            password: Yup.string('Invalid password')
                .min(6, 'Password character must be at least 6')
                .required('Required')
        }),

        // onSubmit: (values, { resetForm }) => {
        //     console.log('Dữ liệu gửi server', values)
        //     resetForm()
        //     toast.success('Login successfully')
        // }

        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(
                    'https://fakestoreapi.com/auth/login',
                    values
                )

                const token = response.data.token

                Cookies.set('access_token', token, { expires: 1 })

                toast.success('Login successfully')
                console.log('Dữ liệu gửi server', response)
                setUserInfo({
                    username: values.username
                })
                resetForm()
            } catch (error) {
                const errorMessage = error.response.message || 'Login failed'
                toast.error(errorMessage)
            }
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        autoComplete="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div style={{ color: 'red' }} className="error">
                            {formik.errors.username}
                        </div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: 'red' }} className="error">
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    style={{ opacity: formik.isSubmitting ? 0.5 : 1 }}
                >
                    {formik.isSubmitting ? 'Loading...' : 'Login'}
                </button>
            </form>
        </>
    )
}

export default LoginForm
