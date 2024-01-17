import mongoose from "mongoose";

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
        required: function () {
            return ['customer', 'deliveryagent'].includes(this.role);
        },
        unique: true
    },
    address: {
        type: String, 
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
    },
    pincode: {
        type: String,
        required: function () {
            return this.role === 'customer';
        },
    },
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);

export default User;
