const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../models/index");
const router = express.Router();

// Generate a password reset token
function generatePasswordResetToken(email) {
    const secret = process.env.PASSWORD_RESET_SECRET || "THISISTHESECRET";
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    return token;
}

// Send password reset email
function sendPasswordResetEmail(email, token) {
    // Configure your email service here
    // ... (same as before)
}

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = generatePasswordResetToken(email);
        sendPasswordResetEmail(email, token);

        return res
            .status(200)
            .json({ message: "Password reset email sent", token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
