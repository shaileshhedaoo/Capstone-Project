import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "./Authentication/AuthContext";

function AdminQuestions(){

    const [questions,setQuestions] = useState([]);
    const navigate=useNavigate();
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        fetchQuestions();
    },[])

    function fetchQuestions(){
        axios.get(`http://localhost:5000/questions/approved`)
        .then(response=>{
            setQuestions(response.data);
        })
        .catch(error=>{
            console.log("Error occured when fetching the questions",error);
        })
    }

    async function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this question?");
        if (confirmed) {
            await axios.delete(`http://localhost:5000/questions/${id}`)
                .then((response) => {
                    fetchQuestions();
                    alert("Question Deleted Successfully....")
                })
                .catch(error => {
                    console.log('There was an error deleting the question data!', error);
                });
        }
    }

    return(
        <div className="container">
            <h2 className="border-bottom pb-2 mb-0" style={{"fontWeight":600, "fontFamily":"monospace", "marginTop":40}}>Questions</h2>
            <div className="my-5 p-3 bg-body rounded shadow-sm">
                {questions.map(question=>(
                    <div className="d-flex text-body-secondary pt-3" key={question}>  
                        <div className="pb-4 mb-0 small lh-sm border-bottom w-100">
                            <div className="d-flex justify-content-between">
                                <strong className="text-gray-dark" style={{"fontSize":18, "fontFamily":"monospace"}}>Question: {question.questiontext}</strong>
                            </div><br/>
                            <div className="d-flex justify-content-between">
                                {user ?(
                                    <div>
                                        <button className="btn btn-secondary" onClick={()=>{navigate(`/readquestion/${question._id}`)}} style={{'float':"inline-end", "width":350}}>Description</button>
                                    </div>
                                ):null}
                                {user && user.role === 'admin' ?(
                                    <button className="btn btn-danger" onClick={()=>{handleDelete(question._id)}}style={{'float':"inline-end", "width":350}}>Delete</button>
                                ):null}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminQuestions;