const express = require('express');
const router = express.Router();
const { Companies } = require('../models'); // Replace with your actual model imports

// Route to get all user posts
router.get('/user-posts', async (req, res) => {
  try {
    // Your logic to fetch all user posts from the database
    // Example:
    const userPosts = await Companies.findAll();
    res.json(userPosts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all job applications by freelancers (for later)
router.get('/job-applications', async (req, res) => {
  try {
    // Your logic to fetch all job applications by freelancers from the database
    // Example:
    const jobApplications = await JobApplications.findAll();
    res.json(jobApplications);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
