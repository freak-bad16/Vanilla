import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendOtp = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        throw new ApiError(400, "Phone number is required");
    }

    // Generate 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    // Upsert user (create if not exists, update if exists)
    // We convert phoneNumber to String to ensure matching
    const phoneStr = String(phoneNumber);

    const user = await User.findOneAndUpdate(
        { phoneNumber: phoneStr },
        {
            otp,
            otpExpiry
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // console.log for "sending"
    console.log(`OTP for ${phoneStr}: ${otp}`);

    return res
        .status(200)
        .json(new ApiResponse(200, { phoneNumber: phoneStr }, "OTP sent successfully"));
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
        throw new ApiError(400, "Phone number and OTP are required");
    }

    const user = await User.findOne({ phoneNumber: String(phoneNumber) });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (user.otpExpiry < Date.now()) {
        throw new ApiError(400, "OTP expired");
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate Token
    const accessToken = user.generateAccessToken();

    // Determine if user is new (onboarding needed)
    // We consider it "new" (needs onboarding) if userName is explicitly null or empty string, or if previous onboarding wasn't completed
    const isNewUser = !user.userName || !user.avatar || !user.mood;

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user,
                    accessToken,
                    isNewUser
                },
                "OTP Verified successfully"
            )
        );
});

const onboardUser = asyncHandler(async (req, res) => {
    const { userName, avatar, mood } = req.body;

    // req.currentUser is set by authMiddleware
    const userId = req.currentUser._id;

    if (!userName || !avatar || !mood) {
        throw new ApiError(400, "All fields (userName, avatar, mood) are required");
    }

    // Check availability of userName if changed?
    // The model has `unique: true` for userName. 
    // If user picks a taken username, save() will throw.
    // We can try-catch or check beforehand.
    const existingUser = await User.findOne({ userName: userName.toLowerCase() });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
        throw new ApiError(409, "Username already taken");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            userName: userName.toLowerCase(),
            avatar,
            mood
        },
        { new: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Onboarding completed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.currentUser, "Current user fetched successfully"));
});

export {
    sendOtp,
    verifyOtp,
    onboardUser,
    getCurrentUser
};
