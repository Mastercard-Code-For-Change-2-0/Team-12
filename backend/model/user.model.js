import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String, 
        required: true
    },
    username :{
        type:String,
        required: true,
        unique: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isStudent:{
        type: Boolean,
        default: false
    },
    isCompany:{
        type: Boolean,
        default: false
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

export default User;
