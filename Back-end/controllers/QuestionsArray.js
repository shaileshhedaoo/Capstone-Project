const express = require('express');
const uuid=require('uuid');
// const { customAlphabet } = require('nanoid');

const alphabet = '0123456789';

// const nanoid = customAlphabet(alphabet, 10);

// console.log(nanoid()); // Outputs something like: ''suNNDWtPTC"

const router = express.Router();

let questions = [
    {
        id: "1",
        questiontext: "What is the full form of CSS?",
        image:"https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:"I am using express 4.0 and I'm aware that body parser has been taken out of the express core, I am using the recommended replacement, however I am getting",
        category: "CSS"
      },
      {
        id: "2",
        questiontext: "Who is making the Web standards?",
        image:"https://images.pexels.com/photos/4913769/pexels-photo-4913769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:"Online resources are the top choice for developers to learn code according to 82% of responses. Respondents 18 - 24 years old are most likely to learn code at traditional schools of all the age groups, and consistently so for the last three years.",
        category: "Web Standards"
      },
      {
        id: "3",
        questiontext: "What is the correct HTML element for inserting a line break?",
        image:"https://images.pexels.com/photos/4913769/pexels-photo-4913769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:"JavaScript, Python and SQL are all highly-desired and admired programming languages, but Rust continues to be the most-admired programming language with an 83% score this year.",
        category: "HTML"
      },
      {
        id: "4",
        questiontext: "Choose the correct HTML element for the largest heading:",
        image:"https://images.pexels.com/photos/221164/pexels-photo-221164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        description:"APIs are pretty cool, but did you know that 75% of developers are more likely to endorse your technology if you provide access to APIs? Make sure to let back-end developers and engineering managers know about the API integrations you offer: they are even more likely to endorse your tech than the average coder.",
        category: "HTML"
      },
      {
        id: "5",
        questiontext: "Test Question 3",
        image:"https://media.istockphoto.com/id/2148145721/photo/portrait-of-young-businesswoman-with-curly-hairstyle-wear-trendy-smart-casual-outfit-isolated.jpg?s=1024x1024&w=is&k=20&c=7YdcwMtyUGd1_wbx2Xk7jP1btxhROLnNmC6s2COEoEE=",
        description:"PostgreSQL debuted in the developer survey in 2018 when 33% of developers reported using it, compared with the most popular option that year: MySQL, in use by 59% of developers. Six years later, PostgreSQL is used by 49% of developers and is the most popular database for the second year in a row.",
        category: "Test"
      }
]

router.get('/',(request,response)=>{
    response.send(questions);
})

router.get('/id/:id',(request,response)=>{
    let id=request.params.id;
    let filteredQuestions=questions.filter((question)=>question.id==id)
    response.send(filteredQuestions);
})

router.get('/category/:category',(request,reponse)=>{
    let category=request.params.category;
    let filteredQuestions=questions.filter(question=>question.category===category);
    reponse.send(filteredQuestions);
})
router.delete('/:id',(request,response)=>{
    let id=request.params.id;
    questions=questions.filter(question=>question.id!=id);
    response.send(`Question with id ${id} deleted...`)
})
router.post('/',(request,response)=>{
    questions.push(
        {
        "id": uuid.v1(),
        "questiontext": request.body.questiontext,
        "image": request.body.image,
        "description": request.body.description,
        "category":request.body.category
        }
    )
    response.send('Question added successfully...')
})
router.put('/:id',(request,response)=>{
    let id=request.params.id;
    let filteredQuestions=questions.filter(question=>question.id == id);
    if(filteredQuestions.length>0){
        let filteredQuestion=filteredQuestions[0];
        let questiontext=request.body.questiontext;
        let image=request.body.image;
        let description=request.body.description;
        let category=request.body.category;
        if(questiontext){
            filteredQuestion.questiontext=questiontext;
        }
        if(image){
            filteredQuestion.image=image;
        }
        if(description){
            filteredQuestion.description=description;
        }
        if(category){   
            filteredQuestion.category=category;
        }
        questions = questions.filter(question => question.id!=id);
        questions.push(filteredQuestion);
        response.send("Question updated successfully...");
    }
})

module.exports = router;