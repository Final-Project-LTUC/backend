// routes/company-routes.js/company.js
const express = require("express");
const router = express.Router();
const { Post, Handyman } = require("../models"); // Assuming you have "Post" and "Handyman" models defined

// Route: /company/users/posts
router.get("/users/posts", async (req, res) => {
    try {
        // Fetch all posts created by users (assuming users have a "role" property set to "user")
        const allUserPosts = await Post.findAll({
            where: { role: "user" },
        });

        res.json(allUserPosts);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Route: /company/job-applications
router.get("/job-applications", async (req, res) => {
    try {
        // Fetch all job applications submitted by freelancers (assuming freelancers have a "role" property set to "handyman")
        const allJobApplications = await JobApplication.findAll({
            where: { role: "handyman" },
        });

        res.json(allJobApplications);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Route: /company/handymen
router.get("/handymen", async (req, res) => {
    try {
        // Fetch all handymen
        const allHandymen = await Handyman.findAll();
        res.json(allHandymen);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Additional routes for getting specific company posts, hiring handymen, etc. can be added as needed.

module.exports = router;
