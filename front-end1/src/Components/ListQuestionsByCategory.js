import { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function ListQuestionsByCategory(){

  const navigate=useNavigate();
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchQuestionsByCategory();
  });

  const fetchQuestionsByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/questions/category/${category}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions by category', error);
    }
  };

    return(
        <div className="container">
            <div className="my-5 p-1 px-5 bg-body rounded shadow-sm">
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-primary" onClick={() => {handleGoBack()}} style={{"height":40}}>
                  Back
              </button>
              <h2 className="border-bottom pb-5 mb-0" style={{"fontWeight":600, "fontFamily":"monospace", "marginTop":10}}>Questions</h2><br/><br/>
            </div>
                {questions.map(question=>(
                    <div className="d-flex text-body-secondary pt-3" key={question}>  
                        <div className="pb-4 mb-3 small lh-sm border-bottom w-100">
                            <div className="d-flex justify-content-between">
                                <strong className="text-gray-dark" style={{"fontSize":18, "fontFamily":"monospace"}}>Question: {question.questiontext}</strong>
                                <button className="btn btn-secondary" onClick={()=>{navigate(`/readquestion/${question._id}`)}} style={{"float":"right", "width":200, "margin-left":20}}>Description</button>
                            </div><br/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListQuestionsByCategory;