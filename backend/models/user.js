import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required:true,
    },
    mobileNumber: {
        type: Number, 
        required: true,
        unique: true
    },
    address: {
        type: String, 
    },profileImg: {
        type: String, 
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },role:{
        type: String,
        required: true,

    }
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

export default User;