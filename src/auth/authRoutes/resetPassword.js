const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel, handymenModel } = require("../../models/index");
const router = express.Router();

// Token validation function
async function validateToken(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject("Invalid or expired token");
            } else {
                resolve(decoded);
            }
        });
    });
}

router.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const secret = process.env.PASSWORD_RESET_SECRET || "THISISTHESECRET";

        // Validate the token
        const decoded = await validateToken(token, secret);
        const { email } = decoded;

        let user = await userModel.findOne({ where: { email } });
        let handymen = await handymenModel.findOne({ where: { email } });

        if (!user && !handymen) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if (user) {
            await user.update({ password: hashedPassword });
        }
        if (handymen) {
            await handymen.update({ password: hashedPassword });
        }

        return res
            .status(200)
            .json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
