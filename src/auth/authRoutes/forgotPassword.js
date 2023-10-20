const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel, handymenModel } = require("../../models/index");
const router = express.Router();
const transporter = require("../../nodemailerConfig");

// Generate a password reset token
function generatePasswordResetToken(email) {
    const secret = process.env.PASSWORD_RESET_SECRET || "THISISTHESECRET";
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    return token;
}

// Send password reset email
function sendPasswordResetEmail(email, token) {
    const mailOptions = {
        from: "skillifymen@gmail.com", // Sender's email address
        to: email, // Recipient's email address
        subject: "Password Reset",
        text: `You have requested a password reset. Click the link below to reset your password:\n\n${process.env.APP_URL}/reset-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        console.log("email:", email); // Log the email to check if it's received correctly

        const user = await userModel.findOne({ where: { email } });
        console.log("user:", user); // Log the user object

        const handymen = await handymenModel.findOne({ where: { email } });
        console.log("handymen:", handymen); // Log the handymen object

        if (!user && !handymen) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = generatePasswordResetToken(email);
        sendPasswordResetEmail(email, token);

        return res
            .status(200)
            .json({ message: "Password reset email sent", token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
    sendPasswordResetEmail(email, token);
});

module.exports = router;
