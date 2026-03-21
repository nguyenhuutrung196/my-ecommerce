import { useFormik } from 'formik'
import * as Yup from 'yup'

function LoginForm() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string()
                .min(6, 'Password character must be 6')
                .required('Required')
        }),

        onSubmit: (values, { resetForm }) => {
            console.log('Dữ liệu gửi server', values)
            resetForm()
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: 'red' }} className="error">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
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
                    disabled={!formik.isValid || !formik.dirty}
                >
                    Login
                </button>
            </form>
        </>
    )
}

export default LoginForm
