import { Router } from "express";
import {
    sendOtp,
    verifyOtp,
    onboardUser,
    getCurrentUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

/**
 * @route   POST /api/v1/users/send-otp
 * @desc    Send OTP to phone number
 * @access  Public
 * @body    { phoneNumber: string }
 * @return  { statusCode: 200, data: { phoneNumber }, message: "OTP sent successfully", success: true }
 */
router.route("/send-otp").post(sendOtp);

/**
 * @route   POST /api/v1/users/verify-otp
 * @desc    Verify OTP and login/register user
 * @access  Public
 * @body    { phoneNumber: string, otp: string }
 * @return  { statusCode: 200, data: { user, accessToken, isNewUser }, message: "OTP Verified successfully", success: true }
 */
router.route("/verify-otp").post(verifyOtp);

// Secured routes

/**
 * @route   POST /api/v1/users/onboard
 * @desc    Complete user profile (onboarding)
 * @access  Private (Bearer Token)
 * @body    { userName: string, avatar: string, mood: string }
 * @return  { statusCode: 200, data: user, message: "Onboarding completed successfully", success: true }
 */
router.route("/onboard").post(verifyJWT, onboardUser);

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current logged in user details
 * @access  Private (Bearer Token)
 * @return  { statusCode: 200, data: user, message: "Current user fetched successfully", success: true }
 */
router.route("/me").get(verifyJWT, getCurrentUser);

export default router;
