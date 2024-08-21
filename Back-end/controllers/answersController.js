const Answers=require('../models/answer.js');
const Questions=require('../models/question.js');

const getAnswerById=async (req,res)=>{
    try{
        const id= req.params.id;
        const answer=await Answers.findById(id);
        if(!answer){
            return res.status(404).send({message:'Answer not found'});
        }
        if(!answer.isapproved){
            return res.status(404).send({message:'Answer not approved'});
        }
        res.status(200).send(answer);
    }catch(error){
        res.status(500).send({message:error});
    }
};

const deleteAnswer=async(req,res)=>{
    try{
        const id=req.params.id;
        const answer=await Answers.findByIdAndDelete(id);
        if(!answer){
            return res.status(404).send({message:'Answer Not Found'});
        }
        res.status(200).send({message:'Answer Deleted Successfully...'});
    }catch(error){
        res.status(500).send({message:error});
    }
}

const createAnswer=async(req,res)=>{
    try{
        const answertext=req.body.answertext;
        const questionId=req.params.qid;
        const userId=req.user.id;
        const question=await Questions.findById(questionId);
        if(question.status==='pending'){
            return res.status(400).send('Cannot answer the question which is pending to approval');
        }
        if(question.status==='resolved'){
            return res.status(400).send('Cannot answer the question which is already resolved.');
        }
        const answer=new Answers({
            answertext:answertext,
            questionId:questionId,
            userId:userId
        });
        await answer.save();
        res.status(200).send({message:'Answer created..', answer});
    }
    catch(error){
        res.status(500).send({message:error});
    }
};

const approveAnswer= async (req, res) => {
    try {
        const id=req.params.id;
        const answer = await Answers.findByIdAndUpdate(id,{ isapproved: true },{ new: true });
        if (!answer) {
            return res.status(404).send({ message: 'Answer not found' });
        }
        res.send({ message: 'Answer approved', answer });
    } catch (error) {
        res.status(500).send({message:error});
    }
  };

const getApprovedAnswersForQuestion=async(req,res)=>{
    try{
        const questionId=req.params.qid;
        let answers=await Answers.find({
            questionId:questionId,
            isapproved:true
        });
        if(answers.length===0){
            return res.status(404).send({message:'No answers found'});
        }
        res.status(200).send(answers);
    }catch(error){
        res.status(500).send({message:error});
    }
};

const getUnApprovedAnswersForQuestion=async(req,res)=>{
    try{
        const questionId=req.params.qid;
        let answers=await Answers.find({
            questionId:questionId,
            isapproved:false
        });
        if(answers.length===0){
            return res.status(404).send({message:'No answers found'});
        }
        res.status(200).send(answers);
    }catch(error){
        res.status(500).send({message:error});
    }
};

const updateAnswer=async(req,res)=>{
    try{
        const answer=await Answers.findByIdAndUpdate(req.params.id,{answertext:req.body.answertext},{new:true});
        if(!answer){
            return res.status(404).send({message:'Answer not found'});
        }
        res.send(answer);
    }
    catch(error){
        res.status(500).send({message:error});
    }
};

const likeAnswer= async(req, res) => {
    try {
      const answer = await Answers.findById(req.params.id);
  
      if (!answer || !answer.isapproved) {
        return res.status(404).send({ message: 'Answer not found or not accessible' });
      }
  
      // Check if user has already liked
      if (answer.likes.includes(req.user.id)) {
        return res.status(400).send({ message: 'You have already liked this answer' });
      }
  
      answer.likes.push(req.user.id);
      await answer.save();
  
      res.send({ message: 'Answer liked', likes: answer.likes.length });
    } catch (error) {
        res.status(500).send({message:error});
    }
  };
  
const unlikeAnswer= async(req, res) => {
    try {
      const answer = await Answers.findById(req.params.id);
  
      if (!answer || !answer.isapproved ) {
        return res.status(404).send({ message: 'Answer not found or not accessible' });
      }
  
      // Check if user has liked
      if (!answer.likes.includes(req.user.id)) {
        return res.status(400).send({ message: 'You have not liked this answer' });
      }
  
      answer.likes = answer.likes.filter(
        (userId) => userId.toString() !== req.user.id
      );
      await answer.save();
  
      res.json({ message: 'Answer unliked', likes: answer.likes.length });
    } catch (error) {
        res.status(500).send({message:error});
    }
};

const getNumOfLikesForAnswer= async(req,res)=>{
    try{
        const answer = await Answers.findById(req.params.id);
        if (!answer || !answer.isapproved ) {
            return res.status(404).send({ message: 'Answer not found or not accessible' });
        }
        res.status(200).send({message:`No of likes: ${answer.likes.length}`});
    }catch(error){
        res.status(500).send({message:error});
    }
}
  

module.exports={getAnswerById,createAnswer,updateAnswer,
    deleteAnswer,approveAnswer,getApprovedAnswersForQuestion,
    getUnApprovedAnswersForQuestion,likeAnswer,unlikeAnswer,getNumOfLikesForAnswer};