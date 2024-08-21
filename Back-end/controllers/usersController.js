//Users.js using mongo bd

const Users=require('../models/user.js')

const jwt=require('jsonwebtoken');

 const generateToken = (id, role) => {
    return jwt.sign({ id, role },process.env.SECRET_KEY, {
        expiresIn:'1h'
    });
};

const loginUser=async (req,res)=>{
    try{
        const {username,password}=req.body
        const user=await Users.findOne({username});
        if(user && await user.matchPassword(password)){
            if(user.status!=='active'){
                return res.status(404).send('User has been deactivated by admin...');
            }
            res.status(200).send({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        }
        else{
            return res.status(400).send({message:'Invalid Credentials..'});
        }
    }catch(error){
        res.status(500).send({message:error});
    }

};

const registerUser=async(req,res)=>{
    try{
        const {username,password,role}=req.body;
        const userExist=await Users.findOne({username});
        if(userExist){
            return res.status(200).send('User already exists');
        }
        const user=new Users({
            username:username,
            password:password,
            role:role
        });
        await user.save();
        res.status(200).send({message:'User registered successfully...',user});
    }catch(error){
        res.status(500).send({message:error});
    }
};

const getUserProfile = async (req, res) => {
    try{
        const user = await Users.findById(req.user.id);
        if (user) {
            res.status(200).send({
                _id: user._id,
                username: user.username,
                role: user.role,
                Status: user.status
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    }catch(error){
        res.status(500).send({message:error});
    }
};

const getAllUsers= async (req,res)=>{
    try{
        const users = await Users.find();
        res.status(200).send(users);
    }catch(error){
        res.status(500).send({message:error});
    }
};

const getUserById= async (req,res)=>{
    try{
        const user = await Users.findById(req.params.id);
        if(!user){
            return res.status(404).send({message:'User not found'});
        }
        res.status(200).send(user);
    }catch(error){
        res.status(500).send({message:error});
    }
};

const deleteUserById= async (req,res)=>{
    try{
        const user = await Users.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send({message:'User not found'});
        }
        res.status(200).send(user);
    }catch(error){
        res.status(500).send({message:error});
    }
};

const deactivateUser= async (req,res)=>{
    try{
        const user = await Users.findByIdAndUpdate(req.params.id , { status:'inactive' }, {new:true});
        if(!user){
            return res.status(404).send({message:'User not found'});
        }
        res.send({message:"User Deactivated",user});
    }catch(error){
        res.status(500).send({message:error});
    }
};

const activateUser= async (req,res)=>{
    try{
        const user = await Users.findByIdAndUpdate(req.params.id , { status:'active' }, {new:true});
        if(!user){
            return res.status(404).send({message:'User not found'});
        }
        res.send({message:"User Activated",user});
    }catch(error){
        res.status(500).send({message:error});
    }
};

module.exports={loginUser,registerUser,getUserProfile,getAllUsers,getUserById,deleteUserById,deactivateUser,activateUser};