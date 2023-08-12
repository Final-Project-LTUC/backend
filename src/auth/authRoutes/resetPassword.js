const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../models/index"); // Update the path
const router = express.Router();

router.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const secret = process.env.PASSWORD_RESET_SECRET || "THISISTHESECRET"; // Note the single quotes around the string

        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res
                    .status(400)
                    .json({ message: "Invalid or expired token" });
            }

            const { email } = decoded;
            const user = await userModel.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // const hashedPassword = bcrypt.hash(newPassword, salt , (err, hash) => {
            // if(err) throw new Error(err)
            //  })

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({ password: hashedPassword });

            return res
                .status(200)
                .json({ message: "Password updated successfully" });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
