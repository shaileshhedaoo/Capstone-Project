const express = require('express');
const router = express.Router();
const Comments = require('../models/comment.js');
const Answers = require('../models/answer.js');

// Post a comment to an answer (User)
const createComment=async (req, res) => {
    try {
      const answer = await Answers.findById(req.params.ansid);

      if (!answer || !answer.isapproved) {
        return res.status(404).send({ message: 'Answer not found or not accessible' });
      }

      const comment = new Comments({
        comment:req.body.comment,
        answerId: req.params.ansid,
        userId: req.user.id,
      });

      await comment.save();

      res.send({ message: 'Comment added', comment });
    } catch (error) {
      res.status(500).send('Server error',error);
    }
  };

// Get all comments for an answer (Everyone)
const getAllCommentsForAnswer= async (req, res) => {
  try {
    const comments = await Comments.find({
      answerId: req.params.ansid,
    })

    res.send(comments);
  } catch (error) {
    res.status(500).send('Server error',error);
  }
};

const deleteComment=async(req,res)=>{
  try{
    const comment=await Comments.findByIdAndDelete(req.params.id);
    if(!comment){
      return res.status(404).send({message:'Comment not found'});
    }
    res.status(200).send({message:'Comment deleted successfully'});
  }catch(error){
    res.status(500).send('Server error',error);
  }
}

module.exports = {createComment,getAllCommentsForAnswer,deleteComment};