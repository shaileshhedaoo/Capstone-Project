import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom';
import './ReadQuestion.css'; // Import the CSS file

function ReadQuestion() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    // const navigate=useNavigate();
    // const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        fetchQuestion();
    });

    function fetchQuestion() {
        axios.get(`http://localhost:5000/questions/id/${id}`)
            .then(response => {
                setQuestion(response.data);
            })
            .catch(error => {
                console.log('There was an error fetching the Questions data!', error);
            });
    }

    return (
        <div className="container2">
            {/* <h2>Question</h2> */}
            <button
                type="button"
                className="btn btn-primary"
                style={{"marginRight":1200}}
                onClick={() => window.history.back()}>
                Back
            </button><br/><br/>
            <div className="question-details" >
                {question ? (
                    <div key={question._id}>
                        
                        <div className="question-header">
                            <h5>Question No: {question._id}</h5>
                        </div>
                        <h1 className="question-text">Question: {question.questiontext}</h1><br/>
                        <p className="card-text">
                            {question.image && (
                                <img
                                src={question.image}
                                alt="Screenshot of doubt"
                                style={{ maxWidth: '25rem', height: 'auto' }}
                                />
                            )}
                        </p><br/>
                        <p className="card-text"><b>Description:</b> {question.description}</p><br/>
                        
                        <p className="card-text"><b>Status:</b> {question.status}</p>
                        
                    </div>
                ) : (
                    <p className="loading">Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ReadQuestion;
