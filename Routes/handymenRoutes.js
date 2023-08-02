const express = require('express');
const router = express.Router();
const { Handymen } = require('../models'); // Replace with your actual model imports

// Route to get all user posts
router.get('/user-posts', async (req, res) => {
  try {
    // Your logic to fetch all user posts from the database
    // Example:
    const userPosts = await Handymen.findAll();
    res.json(userPosts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all companies
router.get('/companies', async (req, res) => {
  try {
    // Your logic to fetch all companies from the database
    // Example:
    const companies = await Companies.findAll();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
