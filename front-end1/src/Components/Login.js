import { useFormik } from "formik";
import * as Yup from 'yup';
import { AuthContext } from "./Authentication/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Login=()=>{

    const navigate=useNavigate();
    const{login} = useContext(AuthContext);

    const formik=useFormik({
        enableReinitialize:true,
        initialValues:{
            username:'',
            password:'',
            role:'user'
        },
        validationSchema:Yup.object({
            username:Yup.string().required('Username is required'),
            password:Yup.string().required('Password is required'),
        }),
        onSubmit: (values,{setSubmitting, setStatus})=>{
            axios.post(`http://localhost:5000/users/login`,values)
            .then(response =>{
                if(!response.data){
                    alert("Enter valid credentials")
                }
                else{
                    setStatus('success');
                    login(response.data);
                    alert("Loggedin successfully")
                    navigate('/');
                }
            }
        )
        .catch(error=>{
            setStatus("error");
        })
        .finally(()=>{
            setSubmitting(true);
        })
    }
    });

    return(
        <div className="container" style={{"marginTop":100}}>
            <main className="form-signin w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
                <h1 className="h3 mb-3 fw-normal">Sign in</h1>
            
                <div className="form-floating">
                <input type="text" className="form-control" id="username" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} placeholder="User Name"/>
                <label for="username">User Name</label>
                {
                    formik.touched.username && formik.errors.username ? (<div className='text-danger'>{formik.errors.username}</div>): null
                }
                </div>
            
                <div className="form-floating">
                <input type="password" class="form-control" id="floatingPassword" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password"/>
                <label for="floatingPassword">Password</label>
                {
                    formik.touched.password && formik.errors.password ? (<div className='text-danger'>{formik.errors.password}</div>): null
                }
                </div>
            
                <button className="btn btn-primary w-100 py-2" type="submit" disabled={formik.isSubmitted} style={{"marginTop":50}}>Sign in</button>
                {formik.status === 'success' && <div className="alert alert-success mt-3">Login successful!</div>}
                {formik.status === 'error' && <div className="alert alert-danger mt-3">Invalid Credentials</div>}
                </form>
            </main>
        </div>
    )
}

export default Login;