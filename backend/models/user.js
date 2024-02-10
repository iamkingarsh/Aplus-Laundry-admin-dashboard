import e from "express";
import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    addressType: {
        type: String,
        unique: true

    },
    location: {
        type: String,
        required: true,
    },
    coordinates: {
        type: {
            type: String,
            default: "Point", 
        },
        coordinates: {
            type: [Number],
            required: true,
        },},
      pincode: {
        type: String,
        required: function () {
            return this.role === 'customer'; 
        },
    },
});


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: function () {
            return ['owner', 'admin'].includes(this.role);
        },
    },
    mobileNumber: {
        type: Number, 
    },
    address: {
        type: [addressSchema], 
        required: function () {
            return this.role === 'customer';
        },
    },
    profileImg: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    role: {
        type: String,
        required: true,
        enum: ['owner', 'admin', 'deliveryagent', 'customer'],
    },
    customerType: {
        type: String,
        required: function () {
            return this.role === 'customer';
        },
        enum: ['subscriber', 'nonsubscriber'],
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;

 


 
