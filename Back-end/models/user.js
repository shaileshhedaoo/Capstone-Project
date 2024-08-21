const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        minLength:[6,'Username must be minimum of 6 characters']
    },
    password :{
        type: String,
        required: true,
        minLength:[6,'Password must be minimum of 6 characters']
    },
    role : {
        type: String,
        required:true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// Compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model('Users',userSchema);

module.exports=Users;