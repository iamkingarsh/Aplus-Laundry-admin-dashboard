import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    addressType: {
        type: String,
        default: 'home',
    },
    location: String,
    coordinates: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    pincode: {
        type: String,
        required: function () {
            return this.role === 'customer';
        },
    },
});

mongoose.model('Address', addressSchema);

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
        sparse: true,
    },
    address: {
        type: [addressSchema], // Reference the address schema here
        sparse: true,
    },
    profileImg: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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
    subscription_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: function () {
            return this.customerType === 'subscriber';
        },
    },customerId: {   
        type: String,
        required: function () {
            return this.role === 'customer';  
        },
    },
    deviceToken: String,
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
