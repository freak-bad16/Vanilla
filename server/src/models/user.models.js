import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
        trim: true,
        default: null
    },
    phoneNumber: {
        type: String, 
        required: true,
        unique: true,
        index: true
    },
    avatar: {
        type: String,
        default: ""
    },
    mood: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            phoneNumber: this.phoneNumber,
            userName: this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
        }
    )
}

export const User = mongoose.model("User", userSchema);