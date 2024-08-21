import './CreateQuestion.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from './Authentication/AuthContext';

function UpdateQuestion(){

    const {user} = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:5000/questions/id/${id}`)
          .then((response) => {
            setQuestion(response.data);
          })
          .catch((error) => {
            console.log("There was an error fetching the questions data!", error);
          });
          
      }, [id]);
    
    const formik = useFormik({
        enableReinitialize: true,
    
        initialValues: {
          questiontext: question?.questiontext || "",
          description: question?.description || "",
          image:question?.image ||'',
        //   options: question?.options || ["", "", "", ""],
        //   correctanswer: question?.correctanswer || "",
          category: question?.category || "",
        },

        validationSchema: Yup.object({
            questiontext: Yup.string().required("question text is required"),
            description: Yup.string().required('Description is required'),
            image: Yup.string()
            .url('Invalid URL format'),
            // .matches(/\.(jpeg|jpg|gif|png)$/, 'URL must point to an image file'),
            // .required('Image URL is required'),
            // options: Yup.array()
            //   .of(Yup.string().required("Each option is required"))
            //   .length(4, "You must provide exactly 4 options"),
            // correctanswer: Yup.string().required("correctoption is required"),
            category: Yup.string().required("category is required"),
          }),

        onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
            axios.put(`http://localhost:5000/questions/updatequestion/${id}`, values,{
                headers: {
                  Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
                },
              })
              .then(() => {
                setStatus("success");
                resetForm();
                navigate(`/readquestion/${id}`);
              })
              .catch((error) => {
                setStatus("error");
              })
              .finally(() => {
                setSubmitting(false);
              });
            }
        });
    return (
        <div className='container mt-4'>
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginRight":1200}}
                onClick={() => window.history.back()}>
                Back
            </button>
            <h2>Update Question</h2><br/><br/>
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
                    type="text"  // Changed from type="url" to type="text"
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
                        <img src={formik.values.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    </div>
                    )}
                </div>

                <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>description</label>
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




                <button  type='submit' className='btn btn-primary' disabled={formik.isSubmitting}  style={{"width":400}}>
                    Update
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

export default UpdateQuestion;