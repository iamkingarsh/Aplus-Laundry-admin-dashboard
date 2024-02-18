import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    addressType: {
        type: String,
        sparse: true,
    },
    location: {
        type: String,
    },
    coordinates: {
        type: {
            type: String,
            default: "Point",
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
        required: false,
    },
    address: {
        type: [addressSchema],
        sparse: true,
        required: false,

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
    // subscriptionStartDate: {
    //     type: Date,
    //     required: function () {
    //         return this.customerType === 'subscriber';
    //     },
    // },
    // subscriptionEndDate: {
    //     type: Date,
    // required: function () {
    //     return this.customerType === 'subscriber';
    // },
    // },
    subscription_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription', // Reference to the Subscription collection
        required: function () {
            return this.customerType === 'subscriber';
        },
    },
    deviceToken: {
        type: String,
        default: undefined
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
