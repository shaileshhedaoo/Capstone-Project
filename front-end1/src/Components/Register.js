import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: '',
            password: '',
            role: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
            role: Yup.string().required("Select a role")
        }),
        onSubmit:async (values, { setSubmitting, resetForm, setStatus }) => {
            await axios.post(`http://localhost:5000/users/register`, values)
                .then(() => {
                    setStatus('success');
                    resetForm();
                    alert("Registered Successfully.........");
                    navigate("/login");
                })
                .catch(error => {
                    setStatus("error");
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    });

    return (
        <div className="container" style={{ marginTop: 100 }}>
            <main className="form-signin w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                    {/* <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
                    <h1 className="h3 mb-3 fw-normal">Register</h1>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            placeholder="User Name"
                        />
                        <label htmlFor="username">User Name</label>
                        {
                            formik.touched.username && formik.errors.username ? (
                                <div className='text-danger'>{formik.errors.username}</div>
                            ) : null
                        }
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                        {
                            formik.touched.password && formik.errors.password ? (
                                <div className='text-danger'>{formik.errors.password}</div>
                            ) : null
                        }
                    </div>

                    <div className="form-floating">
                        <select
                            className="form-select"
                            id="role"
                            {...formik.getFieldProps('role')}
                        >
                            <option value='' disabled>..Select a role..</option>
                            <option value='user'>user</option>
                            <option value='admin'>admin</option>
                        </select>
                        <label htmlFor="role">Role</label>
                        {
                            formik.touched.role && formik.errors.role ? (
                                <div className='text-danger'>{formik.errors.role}</div>
                            ) : null
                        }
                    </div>

                    {/* <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div> */}

                    <div style={{ marginBottom: 50 }}></div>
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitting}>Register</button>
                    {formik.status === 'success' && (
                        <div className="alert alert-success mt-3">Registration successful!</div>
                    )}
                    {formik.status === 'error' && (
                        <div className="alert alert-danger mt-3">Registration failed. Please try again.</div>
                    )}
                </form>
            </main>
        </div>
    );
};

export default Register;
