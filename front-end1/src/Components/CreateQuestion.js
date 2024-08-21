import './CreateQuestion.css'
import { useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Authentication/AuthContext';

function CreateQuestion(){

    const {user}=useContext(AuthContext);
    const navigate =useNavigate();
    const formik = useFormik(
        {
            initialValues: {
                questiontext:'',
                description:'',
                image:'',
                category:''
            },
            validationSchema: Yup.object({
                questiontext: Yup.string().required('Question Text is required'),
                // options: Yup.array().of(Yup.string()).required('Option is required'),
                // correctanswer: Yup.string().required('Correct answer is required'),
                description: Yup.string().required('Description is required'),
                image: Yup.string()
                .url('Invalid URL format')
                // .matches(/\.(jpeg|jpg|gif|png)$/, 'URL must point to an image file')
                .required('Image URL is required'),
                category: Yup.string().required('Category is required'),
            })
            ,
            onSubmit:(values , {setSubmitting, resetForm , setStatus})=> {
                axios.post('http://localhost:5000/questions',values,{
                    headers: {
                      Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
                    },
                  })
                    .then(response => {
                        setStatus('success');
                        resetForm();
                        navigate('/');
                        alert('Question added successfully.....')
                    })
                    .catch(error => {
                        setStatus('error');
                    })
                    .finally(()=>{
                        setSubmitting(false);
                    });
            },
        });


        return (
            <div className='container mt-5' style={{"alignText":"center"}}>
                <h3>Add New Question</h3><br/><br/>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='questiontext' className='form-label'>QuestionText</label>
                        <input
                            id="questiontext"
                            name="questiontext"
                            type="text"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.questiontext}
                            data-testid="questiontext"
                        />

                        {
                            formik.touched.questiontext && formik.errors.questiontext  ? <div className='text-danger'>{formik.errors.questiontext}</div>
                            : null
                        }  
                    </div>

                    {/* <div className='mb-3'>
                        <label htmlFor='options' className='form-label'>Options</label>
                        {formik.values.options.map((option, index) => (
                        <div key={index} className="mb-2">
                            <input
                            id={`option${index}`}
                            name={`options[${index}]`}
                            type="text"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={option}
                            placeholder={`option${index+1}`}
                             data-testid="options"
                            />
                        {
                            formik.touched.options && formik.errors.options ? <div className='text-danger'>{formik.errors.options}</div>
                            : null
                        } 
                        </div>
                        ))}
                    </div>
    
                    <div className='mb-3'>
                        <label htmlFor='correctanswer' className='form-label'>CorrectAnswer</label>
                        <input
                            id="correctanswer"
                            name="correctanswer"
                            type="text"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.correctanswer}
                            data-testid="correctanswer"
                        />
    
    
                        {
                            formik.touched.correctanswer && formik.errors.correctanswer ? <div className='text-danger'>{formik.errors.correctanswer}</div>
                            : null
                        }  
                    </div> */}

                    <div className='mb-3'>
                        <label htmlFor='image' className='form-label'>Image URL</label>
                        <input
                        id="image"
                        name="image"
                        type="text"  
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.image}
                        data-testid="image"
                        />

                        {formik.touched.image && formik.errors.image ? (
                        <div className='text-danger'>{formik.errors.image}</div>
                        ) : null}
                        {formik.values.image && (
                        <div className='mt-3'>
                            <img src={formik.values.image} alt="Preview" style={{ maxWidth: '50%', maxHeight: '200px' }} />
                        </div>
                        )}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            data-testid="description"
                        />

                        {
                            formik.touched.description && formik.errors.description ? <div className='text-danger'>{formik.errors.description}</div>
                            : null
                        }  
                    </div>
    
                    <div className='mb-3'>
                        <label htmlFor='category' className='form-label'> Category</label>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            className='form-control'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                            data-testid="category"
                        />
                        {
                            formik.touched.category && formik.errors.category ? <div className='text-danger'>{formik.errors.category}</div>
                            : null
                        }  
                    </div>
    
                    <button  type='submit' className='btn btn-success' disabled={formik.isSubmitting} style={{"width":400}}>
                        Add
                    </button>

                    {
                        formik.status && formik.status ===  'success' && (
                            <span data-testid='response' className='text-success' >Success</span>
                        )
                    }
    
    
                    {
                        formik.status && formik.status ===  'error' && (
                            <span data-testid='response' className='text-danger' >Error</span>
                        )
                    }
    
                </form>
            </div>
        )
}

export default CreateQuestion;